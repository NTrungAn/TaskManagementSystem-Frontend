import { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  CirclePlus, 
  ChevronDown 
} from 'lucide-react';

/**
 * ProjectHeader Component
 * 
 * High-fidelity header based on Figma design (Node ID 363:354).
 * Features:
 * - Dynamic Greeting & Date
 * - Premium Search Bar
 * - Notification & Profile Controls
 * - Primary 'Create' Action
 */
export default function ProjectHeader({ 
  userName = "Thanh Vu",
  onCreateClick
}) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Format date similar to Figma design: "Sunday, 25 January, 2026"
    const options = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    setCurrentDate(new Date().toLocaleDateString('en-GB', options));
  }, []);

  return (
    <header className="flex flex-col md:flex-row items-center justify-between w-full px-8 py-6 bg-white border-b border-gray-100 gap-6">
      
      {/* Left Section: Greeting & Date */}
      <div className="flex flex-col gap-1 items-start w-full md:w-auto">
        <h1 className="text-[32px] md:text-[36px] font-semibold text-gray-900 tracking-tight leading-tight">
          Hello, {userName}!
        </h1>
        <p className="text-[18px] md:text-[20px] text-gray-400 font-normal">
          {currentDate}
        </p>
      </div>

      {/* Middle/Right Section: Controls */}
      <div className="flex flex-wrap items-center gap-4 md:gap-5 w-full md:w-auto justify-end">
        
        {/* Search Bar */}
        <div className="relative group flex-1 md:flex-none">
          <Search 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#7A8CE8] transition-colors" 
            strokeWidth={2}
          />
          <input 
            type="text" 
            placeholder="Search projects, tasks..."
            className="w-full md:w-[320px] lg:w-[442px] h-[51px] pl-12 pr-4 bg-white border border-[#9B8989]/30 rounded-[20px] text-[18px] placeholder-gray-400 focus:outline-none focus:border-[#7A8CE8] focus:ring-4 focus:ring-[#7A8CE8]/10 transition-all"
          />
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-3">
          
          {/* Notifications */}
          <button className="flex items-center justify-center w-[46px] h-[49px] bg-white border border-[#9B8989]/30 rounded-[12px] text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
            <div className="relative">
              <Bell className="w-6 h-6" strokeWidth={2} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </div>
          </button>

          {/* Profile */}
          <button className="flex items-center justify-center gap-2 px-3 h-[49px] bg-white border border-[#9B8989]/30 rounded-[16px] text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
            <User className="w-6 h-6" strokeWidth={2} />
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* Create Button */}
          <button 
            onClick={onCreateClick}
            className="flex items-center gap-2 px-5 h-[51px] bg-[#7A8CE8] hover:bg-[#687BDD] text-white rounded-[16px] shadow-lg shadow-[#7A8CE8]/20 transition-all active:scale-95 cursor-pointer"
          >
            <CirclePlus className="w-6 h-6" />
            <span className="text-[20px] font-medium">Create</span>
          </button>

        </div>
      </div>

    </header>
  );
}

