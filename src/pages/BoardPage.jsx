import React, { useState, useEffect } from 'react';
import { Plus, X as CloseIcon, Layout, Box } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useParams } from 'react-router-dom';

/**
 * Kanban Board view with Drag & Drop integration
 */
const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-orange-100 text-orange-600',
  low: 'bg-gray-100 text-gray-500',
};

const DEFAULT_COLUMNS = [
  { id: 'todo', label: 'TO DO', count: 0, color: 'bg-gray-200 text-gray-600' },
  { id: 'inprogress', label: 'IN PROGRESS', count: 0, color: 'bg-blue-100 text-blue-600' },
  { id: 'testing', label: 'TESTING', count: 0, color: 'bg-yellow-100 text-yellow-700' },
  { id: 'done', label: 'DONE', count: 0, color: 'bg-green-100 text-green-700' },
];

function TaskCard({ task, index }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.8 : 1,
          }}
          className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all duration-150 cursor-grab active:cursor-grabbing group ${
            snapshot.isDragging ? 'shadow-lg ring-2 ring-indigo-500/20' : ''
          }`}
        >
          <p className="text-sm font-medium text-gray-800 mb-3 group-hover:text-indigo-700 transition-colors">
            {task.title}
          </p>
          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
              }`}
            >
              {task.priority || 'medium'}
            </span>
            <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
              {task.assignee || '?'}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default function BoardPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingTaskTo, setAddingTaskTo] = useState(null); // columnId
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const fetchBoardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // 1. Fetch current project info to display name
      const projRes = await fetch(`http://localhost:5000/api/projects`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const projData = await projRes.json();
      const currentProj = projData.projects?.find(p => p.id.toString() === projectId);
      if (currentProj) setProject(currentProj);

      // 2. Fetch boards for this specific project
      const boardsRes = await fetch(`http://localhost:5000/api/projects/${projectId}/boards`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const boardsData = await boardsRes.json();

      if (boardsRes.ok && boardsData.boards && boardsData.boards.length > 0) {
        const firstBoardId = boardsData.boards[0].id;
        const boardDetailRes = await fetch(`http://localhost:5000/api/boards/${firstBoardId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const boardDetailData = await boardDetailRes.json();
        if (boardDetailRes.ok) {
          setBoard(boardDetailData);
        }
      } else if (boardsRes.ok) {
        // TỰ ĐỘNG TẠO BOARD NẾU PROJECT CHƯA CÓ
        const createBoardRes = await fetch('http://localhost:5000/api/boards', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ name: 'Kanban Board', projectId: projectId })
        });
        if (createBoardRes.ok) {
           const newBoardData = await createBoardRes.json();
           setBoard(newBoardData.board);
        }
      }
    } catch (err) {
      console.error('Fetch board error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) fetchBoardData();
  }, [projectId]);

  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Local state update for immediate feedback
    const sourceColIndex = board.columns.findIndex(c => c.id.toString() === source.droppableId);
    const destColIndex = board.columns.findIndex(c => c.id.toString() === destination.droppableId);
    
    const newColumns = Array.from(board.columns);
    const sourceCol = newColumns[sourceColIndex];
    const destCol = newColumns[destColIndex];

    const sourceTasks = Array.from(sourceCol.tasks);
    const [movedTask] = sourceTasks.splice(source.index, 1);
    
    // Update task's column_id locally
    movedTask.column_id = parseInt(destination.droppableId);

    if (sourceColIndex === destColIndex) {
      // Reorder in same column
      sourceTasks.splice(destination.index, 0, movedTask);
      newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
    } else {
      // Move to different column
      const destTasks = Array.from(destCol.tasks);
      destTasks.splice(destination.index, 0, movedTask);
      newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
      newColumns[destColIndex] = { ...destCol, tasks: destTasks };
    }

    setBoard({ ...board, columns: newColumns });

    // Sync with backend
    try {
      const token = localStorage.getItem('token');
      // For cross-column or reorder, we use the reorder API which handles positional updates
      const targetTaskIds = newColumns[destColIndex].tasks.map(t => t.id);
      
      await fetch('http://localhost:5000/api/tasks/reorder', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ columnId: parseInt(destination.droppableId), taskIds: targetTaskIds })
      });
    } catch (err) {
      console.error('Failed to sync drag drop:', err);
      fetchBoardData(); // Rollback on error
    }
  };

  const handleAddTask = async (columnId) => {
    if (!newTaskTitle.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTaskTitle, columnId })
      });
      if (response.ok) {
        setNewTaskTitle('');
        setAddingTaskTo(null);
        fetchBoardData(); // Refresh board
      }
    } catch (err) {
      console.error('Add task error:', err);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading board...</div>;

  const columnsToRender = (board?.columns || []).map(col => ({
    id: col.id,
    label: col.name.toUpperCase(),
    count: col.tasks?.length || 0,
    color: 'bg-indigo-50 text-indigo-600',
    tasks: col.tasks || []
  }));

  const displayColumns = columnsToRender.length > 0 ? columnsToRender : DEFAULT_COLUMNS.map(c => ({...c, tasks: []}));

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Project visibility header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <Layout className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Current Project</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            {project?.name || 'My Tasks'}
            <span className="text-gray-300 font-light mx-1">/</span>
            <span className="text-gray-400 font-medium text-2xl">{board?.name || 'Kanban'}</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 px-4 rounded-2xl border border-gray-100 shadow-sm">
            <Box className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">
               {board?.columns?.reduce((acc, col) => acc + (col.tasks?.length || 0), 0) || 0} Tasks Total
            </span>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 h-full overflow-x-auto pb-6 custom-scrollbar">
          {displayColumns.map((col) => (
            <div
              key={col.id}
              className="flex flex-col min-w-[320px] max-w-[340px] bg-gray-50/50 border border-gray-100 rounded-[24px] p-4 h-fit max-h-full transition-all"
            >
              <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-bold text-gray-800 tracking-tight">{col.label}</h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm">
                    {col.count}
                  </span>
                </div>
                <button 
                  onClick={() => setAddingTaskTo(col.id)}
                  className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-400 hover:text-indigo-600 cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <Droppable droppableId={col.id.toString()}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex flex-col gap-3 flex-1 overflow-y-auto pr-1 min-h-[50px] transition-colors rounded-xl ${
                      snapshot.isDraggingOver ? 'bg-indigo-50/30' : ''
                    }`}
                  >
                    {col.tasks.map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                    
                    {addingTaskTo === col.id ? (
                      <div className="bg-white rounded-xl p-3 shadow-md border border-indigo-200 animate-in slide-in-from-top-2 duration-200">
                        <input
                          autoFocus
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddTask(col.id)}
                          placeholder="Tên công việc..."
                          className="w-full text-sm font-medium text-gray-800 focus:outline-none mb-3"
                        />
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => {setAddingTaskTo(null); setNewTaskTitle('');}}
                            className="p-1 px-3 text-[11px] font-bold text-gray-500 hover:bg-gray-100 rounded-md transition-all cursor-pointer"
                          >
                            Bỏ qua
                          </button>
                          <button 
                            onClick={() => handleAddTask(col.id)}
                            className="p-1 px-3 text-[11px] font-bold bg-[#7A8CE8] text-white rounded-md shadow-sm hover:bg-[#687BDD] transition-all cursor-pointer"
                          >
                            Thêm
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setAddingTaskTo(col.id)}
                        className="flex items-center gap-2 w-full p-3 rounded-xl border border-dashed border-gray-300 text-gray-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all cursor-pointer group shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-xs font-bold">Thêm công việc mới</span>
                      </button>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
          {displayColumns.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center p-12 bg-white border border-dashed border-gray-200 rounded-[32px]">
              <p className="text-gray-400 font-medium">Không có dữ liệu bảng công việc.</p>
            </div>
          )}
        </div>
      </DragDropContext>
    </div>
  );
}
