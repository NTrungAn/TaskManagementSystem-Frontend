import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Search,
  Plus,
  Download,
} from 'lucide-react';

// ─── Avatar Stack ─────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  'bg-gray-300',
  'bg-gray-500',
  'bg-indigo-500',
];

function AvatarStack({ members = [], maxVisible = 3 }) {
  const visible = members.slice(0, maxVisible);

  return (
    <div className="flex items-center">
      {visible.map((member, i) => (
        <div
          key={i}
          className={`
            w-8 h-8 rounded-full border-2 border-white flex items-center justify-center
            text-white text-xs font-semibold shrink-0
            ${AVATAR_COLORS[i % AVATAR_COLORS.length]}
            ${i > 0 ? '-ml-2' : ''}
          `}
          title={member.name || `Member ${i + 1}`}
        >
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            member.initials || '?'
          )}
        </div>
      ))}
      {/* Add member button */}
      <button
        className="-ml-1 w-8 h-8 rounded-full border-2 border-indigo-500 bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors cursor-pointer shrink-0"
        title="Add member"
      >
        <Plus className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────
function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" strokeWidth={1.75} />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search for..."
        className="
          pl-9 pr-4 py-2 h-10 w-[220px]
          bg-white border border-gray-200 rounded-full
          text-sm text-gray-700 placeholder-gray-400
          focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
          transition-all duration-150
        "
      />
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb({ project, page }) {
  return (
    <h1 className="flex items-baseline gap-1 m-0">
      <span className="text-[16px] font-normal text-gray-400">
        {project}&nbsp;/
      </span>
      <span className="text-[22px] font-bold text-gray-900 leading-tight">
        &nbsp;{page}
      </span>
    </h1>
  );
}

// ─── Tab Navigation ───────────────────────────────────────────────────────────
const TABS = [
  { id: 'summary', label: 'Summary', icon: '◔' },
  { id: 'backlog', label: 'Backlog', icon: '⊟' },
  { id: 'board', label: 'Board', icon: '⧉' },
  { id: 'list', label: 'List', icon: '≡' },
];

function TabNav({ activeTab, onTabChange }) {
  return (
    <nav className="flex items-center gap-1 px-4 border-b border-gray-100">
      {TABS.map(({ id, label, icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange?.(id)}
            className={`
              relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium
              transition-colors duration-150 cursor-pointer
              ${active ? 'text-indigo-700' : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            <span className="text-[13px]">{icon}</span>
            <span>{label}</span>
            {active && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600 rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

// ─── PROJECT HEADER ───────────────────────────────────────────────────────────
/**
 * Header component matching the Figma design for "Th.Vũ-Board"
 * 
 * Props:
 * - projectName: string  (e.g., "Project")
 * - pageName: string     (e.g., "Website bán laptop")
 * - members: Array<{ name: string, initials?: string, avatar?: string }>
 * - activeTab: string
 * - onTabChange: (tab: string) => void
 * - onSearch: (query: string) => void
 * - onExport: () => void
 */
export default function ProjectHeader({
  projectName = 'Project',
  pageName = 'Website bán laptop',
  members = [
    { name: 'Member 1', initials: '' },
    { name: 'Member 2', initials: '' },
    { name: 'Member 3', initials: '' },
  ],
  activeTab = 'board',
  onTabChange,
  onSearch,
  onExport,
}) {
  return (
    <header className="flex flex-col bg-white border-b border-gray-100 w-full">
      {/* Top row */}
      <div className="flex items-center justify-between px-6 py-3 gap-4">
        {/* Left: Breadcrumb */}
        <div className="flex-1 min-w-0">
          <Breadcrumb project={projectName} page={pageName} />
        </div>

        {/* Center: Avatar Stack (separator on right) */}
        <div className="flex items-center border-r border-gray-200 pr-6 mr-2">
          <AvatarStack members={members} />
        </div>

        {/* Right: Search + Export */}
        <div className="flex items-center gap-3">
          <SearchBar onSearch={onSearch} />

          {/* Export / Minimize button */}
          <button
            onClick={onExport}
            className="
              w-10 h-10 flex items-center justify-center
              border border-gray-200 rounded-xl text-gray-500
              hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50
              transition-all duration-150 cursor-pointer
            "
            title="Export"
          >
            <Download className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Bottom row: Tab Navigation */}
      <TabNav activeTab={activeTab} onTabChange={onTabChange} />
    </header>
  );
}

// Re-export sub-components for flexible usage
export { AvatarStack, SearchBar, Breadcrumb, TabNav };
