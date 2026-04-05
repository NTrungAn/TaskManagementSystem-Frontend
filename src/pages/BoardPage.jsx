import { useLayout } from '../components/layout/AppLayout';

/**
 * Demo page for Kanban Board view
 * Renders the project board with task columns
 */
const COLUMNS = [
  { id: 'todo', label: 'TO DO', count: 2, color: 'bg-gray-200 text-gray-600' },
  { id: 'inprogress', label: 'IN PROGRESS', count: 3, color: 'bg-blue-100 text-blue-600' },
  { id: 'testing', label: 'TESTING', count: 1, color: 'bg-yellow-100 text-yellow-700' },
  { id: 'done', label: 'DONE', count: 2, color: 'bg-green-100 text-green-700' },
];

const TASKS = {
  todo: [
    { id: 1, title: 'Design landing page', priority: 'high', assignee: 'A' },
    { id: 2, title: 'Setup API routes', priority: 'medium', assignee: 'B' },
  ],
  inprogress: [
    { id: 3, title: 'Implement auth module', priority: 'high', assignee: 'C' },
    { id: 4, title: 'Write unit tests', priority: 'low', assignee: 'A' },
    { id: 5, title: 'Database migration', priority: 'medium', assignee: 'B' },
  ],
  testing: [
    { id: 6, title: 'E2E test login flow', priority: 'medium', assignee: 'C' },
  ],
  done: [
    { id: 7, title: 'Project setup & scaffolding', priority: 'low', assignee: 'A' },
    { id: 8, title: 'Define data models', priority: 'medium', assignee: 'B' },
  ],
};

const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-orange-100 text-orange-600',
  low: 'bg-gray-100 text-gray-500',
};

function TaskCard({ task }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all duration-150 cursor-pointer">
      <p className="text-sm font-medium text-gray-800 mb-3">{task.title}</p>
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[task.priority]}`}
        >
          {task.priority}
        </span>
        <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
          {task.assignee}
        </div>
      </div>
    </div>
  );
}

export default function BoardPage() {
  return (
    <div className="p-6 h-full">
      {/* Board columns grid */}
      <div className="flex gap-4 h-full overflow-x-auto pb-4">
        {COLUMNS.map(({ id, label, count, color }) => (
          <div
            key={id}
            className="flex flex-col min-w-[260px] max-w-[280px] bg-gray-50 rounded-2xl p-4"
          >
            {/* Column header */}
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-gray-700 tracking-wide">{label}</h3>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${color}`}
              >
                {count}
              </span>
            </div>

            {/* Task cards */}
            <div className="flex flex-col gap-3 flex-1">
              {(TASKS[id] || []).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
