import React, { useState } from 'react';
import { X, Layout, AlignLeft } from 'lucide-react';

export default function CreateProjectModal({ isOpen, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Tạo dự án mới thành công!');
        setName('');
        setDescription('');
        onCreated && onCreated(data.project);
        onClose();
      } else {
        alert(data.message || 'Lỗi khi tạo dự án.');
      }
    } catch (error) {
      alert('Không thể kết nối tới máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[500px] rounded-[24px] shadow-2xl p-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">Tạo dự án mới</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 ml-1">
              <Layout className="w-4 h-4 text-[#7A8CE8]" />
              Tên dự án
            </label>
            <input 
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Website bán laptop"
              className="w-full h-[54px] px-4 bg-gray-50 border border-gray-200 rounded-[16px] focus:outline-none focus:border-[#7A8CE8] focus:ring-4 focus:ring-[#7A8CE8]/10 transition-all font-medium text-gray-800"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 ml-1">
              <AlignLeft className="w-4 h-4 text-[#7A8CE8]" />
              Mô tả ngắn
            </label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả mục tiêu của dự án này..."
              className="w-full h-[120px] p-4 bg-gray-50 border border-gray-200 rounded-[16px] focus:outline-none focus:border-[#7A8CE8] focus:ring-4 focus:ring-[#7A8CE8]/10 transition-all font-medium text-gray-800 resize-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-[54px] bg-white border border-gray-200 text-gray-600 font-bold rounded-[16px] hover:bg-gray-50 transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-2 h-[54px] bg-[#7A8CE8] hover:bg-[#687BDD] text-white font-bold rounded-[16px] shadow-lg shadow-[#7A8CE8]/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Đang tạo...' : 'Tạo ngay'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
