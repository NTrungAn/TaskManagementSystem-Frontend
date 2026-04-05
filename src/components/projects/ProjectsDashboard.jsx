import React, { useEffect, useState } from 'react';
import { Filter, LayoutGrid } from 'lucide-react';
import ProjectCard from './ProjectCard';

// Dummy data matching the Figma card repetitions for fallback
const MOCK_PROJECTS = Array(6).fill(null).map((_, i) => ({
  id: `mock-${i}`,
  status: "ACTIVE",
  title: "Website bán laptop",
  dateRange: "Mar 01 - Mar 31",
  progress: 77
}));

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setProjects(MOCK_PROJECTS);
          return;
        }
        const response = await fetch('https://taskmanagementsystem-backend-v1-0.onrender.com/api/projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && data.projects) {
          const mappedProjects = data.projects.map(p => ({
            id: p.id,
            status: "ACTIVE",
            title: p.name,
            dateRange: p.created_at ? new Date(p.created_at).toLocaleDateString() : "Present",
            progress: 0
          }));
          setProjects(mappedProjects.length > 0 ? mappedProjects : MOCK_PROJECTS);
        } else {
          setProjects(MOCK_PROJECTS);
        }
      } catch (err) {
        setProjects(MOCK_PROJECTS);
      }
    };
    fetchProjects();
  }, []);
  return (
    <div className="w-full h-full p-8 overflow-y-auto">
      
      {/* Dashboard Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12">
        
        {/* Title & Subtitle */}
        <div>
          <h1 className="text-[40px] md:text-[55px] font-bold text-black leading-tight tracking-tight mb-2">
            All My Projects
          </h1>
          <p className="text-[20px] md:text-[24px] text-gray-500 font-normal">
            Manage your active workspaces and collaborative efforts
          </p>
        </div>

        {/* Filter & Layout Controls */}
        <div className="flex items-center gap-4 mt-4 xl:mt-0">
          <button className="flex items-center justify-center gap-2 px-5 h-[57px] bg-white border border-gray-200 rounded-[12px] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
            <Filter className="w-6 h-6 text-black" strokeWidth={1.5} />
            <span className="text-[18px] text-black font-medium">Filter</span>
          </button>
          
          <button className="flex items-center justify-center gap-2 px-5 h-[57px] bg-white border border-gray-200 rounded-[12px] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
            <LayoutGrid className="w-6 h-6 text-black" strokeWidth={1.5} />
            <span className="text-[18px] text-black font-medium">Layout</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 xl:gap-8 pb-12">
        {projects.map((project) => (
          <div key={project.id} className="flex justify-center md:justify-start">
             <ProjectCard 
               id={project.id}
               status={project.status}
               title={project.title}
               dateRange={project.dateRange}
               progress={project.progress}
             />
          </div>
        ))}
      </div>

    </div>
  );
}
