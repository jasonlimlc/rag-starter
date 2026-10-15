import React, { useState } from 'react';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { Article, LEAD_ARTICLE, SECONDARY_ARTICLES } from '../data/newsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

const ALL_ARTICLES = [LEAD_ARTICLE, ...SECONDARY_ARTICLES];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim() 
    ? ALL_ARTICLES.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.summary.toLowerCase().includes(query.toLowerCase()) ||
        a.category?.toLowerCase().includes(query.toLowerCase()) ||
        a.topic?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-4 relative shadow-2xl animate-scaleUp text-[#121212]">
        <div className="flex items-center border-b border-[#e2e2e2] pb-3">
          <Search className="w-5 h-5 text-[#727272] mr-2 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search news, topics, opinions..."
            className="w-full text-sm font-sans focus:outline-none placeholder-gray-400"
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="text-xs font-semibold text-gray-500 hover:text-black"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Results or Suggested Topics */}
        <div className="mt-4 max-h-80 overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#727272] mb-2">
                Trending Topics
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Trump Administration', 'Kimberly Guilfoyle', 'Russia-Ukraine War', 'Wordle', 'Supreme Court', 'Artificial Intelligence'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 bg-[#f4f4f4] hover:bg-[#e8e8e8] rounded-full text-[#333]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#727272] mb-2">
                Recent Searches
              </div>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex items-center gap-2 py-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>White House press secretary credentials</span>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>Satellite reconnaissance Eastern Europe</span>
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">
              No results found for “{query}”. Try searching for “Trump”, “Guilfoyle”, or “Ukraine”.
            </div>
          ) : (
            <div className="divide-y divide-[#f0f0f0]">
              {results.map(article => (
                <button
                  key={article.id}
                  onClick={() => {
                    onClose();
                    onSelectArticle(article);
                  }}
                  className="w-full text-left py-3 group flex items-start justify-between"
                >
                  <div className="pr-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#326891]">
                      {article.category || 'News'}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#121212] group-hover:text-[#326891] leading-snug">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                      {article.summary}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#326891] shrink-0 mt-1" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
