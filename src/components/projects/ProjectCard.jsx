import { MoreHorizontal, Calendar, ChevronRight } from 'lucide-react';
import React from 'react';

export default function ProjectCard({ 
  status = "ACTIVE", 
  title = "Website bán laptop", 
  dateRange = "Mar 01 - Mar 31", 
  progress = 77 
}) {
  return (
    <div className="w-[300px] h-[310px] bg-white rounded-[20px] shadow-sm hover:shadow-md transition-shadow relative p-7 flex flex-col border border-gray-100">
      
      {/* Options Menu Icon */}
      <button className="absolute top-4 right-4 text-black hover:bg-gray-100 rounded-full p-1 transition-colors">
        <MoreHorizontal className="w-6 h-6" />
      </button>

      {/* Status Badge */}
      <div className="w-[70px] h-[20px] bg-[#41F6BD] rounded-[20px] flex items-center justify-center mb-6">
        <span className="text-[12px] font-medium text-[#00BC32] tracking-wide">
          {status}
        </span>
      </div>

      {/* Project Title */}
      <h3 className="text-[24px] font-bold text-[#b1aaaa] leading-tight mb-4 line-clamp-2 min-h-[58px]">
        {title}
      </h3>

      {/* Date Range */}
      <div className="flex items-center gap-2 mb-8">
        <Calendar className="w-[20px] h-[20px] text-gray-800" strokeWidth={1.5} />
        <span className="text-[15px] text-black font-normal">
          {dateRange}
        </span>
      </div>

      {/* Progress Section */}
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[15px] text-black font-normal">Progress</span>
          <span className="text-[15px] text-[#53C237] font-medium">{progress}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-[8px] bg-[#d9d9d9] rounded-[20px] overflow-hidden">
          <div 
            className="h-full bg-[#53C237] rounded-[20px]" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Right Arrow */}
      <div className="absolute bottom-5 right-5">
        <button className="text-[#868181] hover:text-black transition-colors cursor-pointer flex items-center justify-center hover:bg-gray-50 rounded-full p-1">
          <ChevronRight className="w-8 h-8" strokeWidth={1.5} />
        </button>
      </div>

    </div>
  );
}
