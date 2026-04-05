import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans text-gray-800">
      <div className="max-w-3xl px-6 py-12 bg-white shadow-xl rounded-2xl text-center">
        <h1 className="text-5xl font-extrabold text-[#5D3FDB] mb-6">Task Management System</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Chào mừng bạn đến với hệ thống quản lý công việc. Nền tảng chuyên nghiệp giúp đội ngũ của bạn tối ưu hóa hiệu suất, cộng tác và nắm bắt mục tiêu một cách rõ ràng.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-8 py-3 bg-[#0084FF] text-white font-bold rounded-md hover:bg-blue-600 transition"
          >
            Đăng nhập
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-md hover:border-gray-400 hover:bg-gray-50 transition"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}
