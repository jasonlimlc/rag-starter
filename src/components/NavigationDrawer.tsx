import React from 'react';
import { X, Search, ChevronRight, Grid, Bookmark, BookOpen, Sun, Coffee, Newspaper } from 'lucide-react';
import { SECTIONS_LIST } from '../data/newsData';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (section: string) => void;
  onOpenWordle: () => void;
  onOpenConnections: () => void;
  onOpenSearch: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  onOpenWordle,
  onOpenConnections,
  onOpenSearch
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 flex">
      <div className="w-full max-w-[340px] bg-white h-full flex flex-col shadow-2xl animate-slideRight">
        {/* Header */}
        <div className="p-4 border-b border-[#e2e2e2] flex items-center justify-between">
          <div className="masthead-title text-[22px] text-[#121212]">
            The New York Times
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-neutral-100 text-[#121212]"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Bar */}
        <div className="p-3 border-b border-[#e2e2e2] bg-[#f9f9f9]">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 bg-white border border-[#ccc] rounded text-xs text-[#727272] hover:border-[#121212] transition-colors"
          >
            <Search className="w-4 h-4 text-[#727272]" />
            <span>Search articles, topics, journalists...</span>
          </button>
        </div>

        {/* Weather / Date mini-ticker */}
        <div className="px-4 py-2 bg-[#f4f4f4] border-b border-[#e2e2e2] flex items-center justify-between text-[11px] text-[#555]">
          <div className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Washington, D.C. 68°F</span>
          </div>
          <span className="font-medium text-[#121212]">Wednesday, Oct. 14, 2026</span>
        </div>

        {/* Quick Interactive Games Row */}
        <div className="p-3 border-b border-[#e2e2e2]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#727272] mb-2">
            Featured Puzzles
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenWordle();
              }}
              className="flex items-center p-2 rounded border border-[#e2e2e2] hover:bg-[#f7f7f7] text-left"
            >
              <div className="flex gap-0.5 mr-2">
                <span className="w-2.5 h-2.5 bg-[#6aaa64] rounded-xs"></span>
                <span className="w-2.5 h-2.5 bg-[#c9b458] rounded-xs"></span>
              </div>
              <div>
                <div className="font-bold text-xs text-[#121212]">Wordle</div>
                <div className="text-[10px] text-[#727272]">Daily 5-letter word</div>
              </div>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenConnections();
              }}
              className="flex items-center p-2 rounded border border-[#e2e2e2] hover:bg-[#f7f7f7] text-left"
            >
              <div className="flex gap-0.5 mr-2">
                <span className="w-2.5 h-2.5 bg-[#ba81c5] rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-[#4a72b2] rounded-full"></span>
              </div>
              <div>
                <div className="font-bold text-xs text-[#121212]">Connections</div>
                <div className="text-[10px] text-[#727272]">Group 4 topics</div>
              </div>
            </button>
          </div>
        </div>

        {/* Section List */}
        <div className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-[#f0f0f0]">
          <div className="py-2 text-[10px] font-bold uppercase tracking-wider text-[#727272]">
            Sections & Desks
          </div>
          {SECTIONS_LIST.map(section => (
            <button
              key={section.name}
              onClick={() => {
                onSelectSection(section.name);
                onClose();
              }}
              className="w-full py-2.5 flex items-center justify-between text-left hover:text-[#326891] transition-colors group"
            >
              <div>
                <span className="font-serif font-semibold text-sm text-[#121212] group-hover:text-[#326891]">
                  {section.name}
                </span>
                <p className="text-[10px] text-[#888]">{section.count}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#ccc] group-hover:text-[#326891]" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e2e2e2] bg-[#fafafa] text-[11px] text-[#727272] flex justify-between items-center">
          <span>Subscriber Edition</span>
          <span className="font-medium text-[#121212]">Manage Account</span>
        </div>
      </div>
    </div>
  );
};
