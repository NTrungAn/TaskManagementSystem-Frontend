import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  FolderKanban, 
  TrendingUp, 
  Users,
  ArrowUpRight,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeTasks: 0,
    completedTasks: 0,
    teamMembers: 1 // For now
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Fetch projects to count
        const projRes = await fetch('https://taskmanagementsystem-backend-v1-0.onrender.com/api/projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const projData = await projRes.json();
        const projects = projData.projects || [];
        
        let taskCount = 0;
        let doneCount = 0;

        // Fetch tasks for each project to get counts (Optimization: backend should provide this)
        for (const p of projects) {
            const boardRes = await fetch(`https://taskmanagementsystem-backend-v1-0.onrender.com/api/projects/${p.id}/boards`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const boardData = await boardRes.json();
            if (boardData.boards && boardData.boards.length > 0) {
                const boardDetail = await fetch(`https://taskmanagementsystem-backend-v1-0.onrender.com/api/boards/${boardData.boards[0].id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const detailData = await boardDetail.json();
                detailData.columns?.forEach(col => {
                    taskCount += col.tasks?.length || 0;
                    if (col.name.toLowerCase().includes('done')) {
                        doneCount += col.tasks?.length || 0;
                    }
                });
            }
        }

        setStats({
          totalProjects: projects.length,
          activeTasks: taskCount - doneCount,
          completedTasks: doneCount,
          teamMembers: 1
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-gray-500 mb-1">{title}</span>
        <span className="text-3xl font-black text-gray-900">{value}</span>
      </div>
    </div>
  );

  if (loading) return <div className="p-8 text-center text-gray-500 font-medium">Crunching your data...</div>;

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-[40px] font-black text-gray-900 tracking-tight leading-tight mb-2 flex items-center gap-3">
            Giao diện tổng quan <Zap className="w-8 h-8 text-amber-400 fill-amber-400" />
          </h1>
          <p className="text-lg text-gray-500 font-medium tracking-tight">Chào mừng bạn quay trở lại. Hãy cùng hoàn thành các mục tiêu hôm nay!</p>
        </div>
        <button className="flex items-center gap-2 px-6 h-[54px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-[18px] shadow-lg shadow-indigo-200 transition-all active:scale-95">
          <BarChart3 className="w-5 h-5" />
          Xem báo cáo chi tiết
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Tổng dự án" 
          value={stats.totalProjects} 
          icon={FolderKanban} 
          color="bg-indigo-600" 
          trend="+12%"
        />
        <StatCard 
          title="Đang thực hiện" 
          value={stats.activeTasks} 
          icon={Clock} 
          color="bg-amber-500" 
          trend="+5%"
        />
        <StatCard 
          title="Đã hoàn thành" 
          value={stats.completedTasks} 
          icon={CheckCircle2} 
          color="bg-emerald-500" 
          trend="+8%"
        />
        <StatCard 
          title="Thành viên" 
          value={stats.teamMembers} 
          icon={Users} 
          color="bg-blue-500" 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Activity Feed Placeholder */}
        <div className="xl:col-span-2 bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[22px] font-black text-gray-800 tracking-tight">Hoạt động gần đây</h3>
            <button className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-1">
              Xem tất cả <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">Bạn đã cập nhật trạng thái "Done" cho Task {i}</p>
                  <p className="text-xs text-gray-500 font-medium">10 phút trước • Website bán laptop</p>
                </div>
                <div className="text-[10px] font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">UPDATE</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips / Info Sidebar */}
        <div className="bg-indigo-600 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
            <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4 leading-tight">Mẹo tăng năng suất</h3>
                <p className="text-indigo-100 font-medium mb-8 leading-relaxed">
                    Sử dụng phím tắt "N" để tạo nhanh thẻ công việc mới trong bảng Kanban.
                </p>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <p className="text-xs font-bold text-indigo-100 uppercase tracking-widest mb-2">Tiến độ tuần</p>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xl font-black">74%</span>
                        <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-lg italic">Great work!</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full w-[74%]"></div>
                    </div>
                </div>
            </div>
            {/* Background shape */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute top-10 right-10 w-20 h-20 bg-indigo-400/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
}
