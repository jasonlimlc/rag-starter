import React, { useState } from 'react';
import { X, User, Bookmark, Bell, Award, CheckCircle, Sliders, LogOut } from 'lucide-react';
import { Article } from '../data/newsData';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubscribed: boolean;
  onOpenSubscribe: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  isSubscribed,
  onOpenSubscribe,
  savedArticles,
  onSelectArticle
}) => {
  const [activeTab, setActiveTab] = useState<'account' | 'saved'>('account');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [breakingNews, setBreakingNews] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-2xl animate-scaleUp text-[#121212]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 text-xl font-bold"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-[#f0f0f0] flex items-center justify-center text-[#121212] font-bold text-lg">
            JL
          </div>
          <div>
            <h3 className="font-bold text-base text-[#121212]">Jason Lim</h3>
            <p className="text-xs text-gray-500">jasonlimlc@gmail.com</p>
          </div>
        </div>

        {/* Subscription Badge */}
        <div className={`p-3 rounded-md mb-4 flex items-center justify-between text-xs ${
          isSubscribed 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : 'bg-neutral-100 text-gray-800'
        }`}>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#326891]" />
            <div>
              <div className="font-bold">
                {isSubscribed ? 'All-Access Digital Subscriber' : 'Standard Free Reader'}
              </div>
              <div className="text-[10px] text-gray-600">
                {isSubscribed ? 'Active through October 2027' : 'Limited monthly free articles'}
              </div>
            </div>
          </div>
          {!isSubscribed && (
            <button
              onClick={() => {
                onClose();
                onOpenSubscribe();
              }}
              className="px-2.5 py-1 bg-[#121212] text-white rounded text-[10px] font-bold hover:bg-black"
            >
              Upgrade
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#e2e2e2] mb-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('account')}
            className={`py-2 px-3 border-b-2 transition-colors ${
              activeTab === 'account' 
                ? 'border-[#121212] text-[#121212]' 
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'saved' 
                ? 'border-[#121212] text-[#121212]' 
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            Saved Stories ({savedArticles.length})
          </button>
        </div>

        {activeTab === 'account' ? (
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-[#121212] mb-2">Editorial Newsletters</h4>
              <label className="flex items-center justify-between py-1.5 cursor-pointer">
                <span>The Morning (David Leonhardt)</span>
                <input 
                  type="checkbox" 
                  checked={emailAlerts} 
                  onChange={e => setEmailAlerts(e.target.checked)}
                  className="rounded text-[#121212]" 
                />
              </label>
              <label className="flex items-center justify-between py-1.5 cursor-pointer">
                <span>Breaking News Push Alerts</span>
                <input 
                  type="checkbox" 
                  checked={breakingNews} 
                  onChange={e => setBreakingNews(e.target.checked)}
                  className="rounded text-[#121212]" 
                />
              </label>
            </div>

            <div className="border-t border-[#e2e2e2] pt-3">
              <h4 className="font-bold text-[#121212] mb-1">Edition</h4>
              <p className="text-[11px] text-gray-500">United States (English)</p>
            </div>

            <div className="border-t border-[#e2e2e2] pt-3 flex justify-between items-center text-gray-500">
              <span>App Version: 2026.10.14</span>
              <button 
                onClick={onClose}
                className="text-xs font-bold text-[#121212] hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {savedArticles.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-500">
                You haven’t saved any articles yet. Tap the bookmark icon on any story to save it for later.
              </div>
            ) : (
              savedArticles.map(art => (
                <button
                  key={art.id}
                  onClick={() => {
                    onClose();
                    onSelectArticle(art);
                  }}
                  className="w-full text-left p-2.5 rounded hover:bg-neutral-50 border border-[#e2e2e2] flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-serif font-bold text-xs text-[#121212] group-hover:text-[#326891] line-clamp-1">
                      {art.title}
                    </h5>
                    <span className="text-[10px] text-gray-400">{art.readTime}</span>
                  </div>
                  <span className="text-xs text-[#326891]">Read →</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
