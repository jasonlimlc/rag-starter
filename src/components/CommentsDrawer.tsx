import React, { useState } from 'react';
import { X, ThumbsUp, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { INITIAL_COMMENTS, Comment } from '../data/newsData';

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle?: string;
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({ 
  isOpen, 
  onClose,
  articleTitle = 'The Steep Rise and Sudden Fall of Kimberly Guilfoyle'
}) => {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [activeTab, setActiveTab] = useState<'all' | 'picks'>('all');
  const [newCommentText, setNewCommentText] = useState('');
  const [authorName, setAuthorName] = useState('Subscriber');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleLike = (id: string) => {
    setLikedMap(prev => {
      const isAlready = !!prev[id];
      const next = { ...prev, [id]: !isAlready };
      setComments(cList => cList.map(c => {
        if (c.id === id) {
          return { ...c, likes: c.likes + (isAlready ? -1 : 1) };
        }
        return c;
      }));
      return next;
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: 'user-' + Date.now(),
      author: authorName || 'Anonymous Reader',
      location: 'New York, NY',
      timeAgo: 'Just now',
      text: newCommentText.trim(),
      likes: 1,
      isNYTPick: false,
      replies: []
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const filteredComments = activeTab === 'picks' 
    ? comments.filter(c => c.isNYTPick) 
    : comments;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 flex justify-end">
      <div className="w-full max-w-lg bg-white h-full flex flex-col shadow-2xl animate-slideLeft">
        {/* Header */}
        <div className="p-4 border-b border-[#e2e2e2] flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#121212]">
              Comments ({comments.length + 515})
            </h3>
            <p className="text-[11px] text-[#727272] line-clamp-1 max-w-[320px]">
              {articleTitle}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-neutral-100 text-[#121212]"
            aria-label="Close comments"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex border-b border-[#e2e2e2] px-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2.5 mr-6 border-b-2 transition-colors ${
              activeTab === 'all' 
                ? 'border-[#121212] text-[#121212]' 
                : 'border-transparent text-[#727272] hover:text-[#121212]'
            }`}
          >
            All Comments ({comments.length + 515})
          </button>
          <button
            onClick={() => setActiveTab('picks')}
            className={`py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'picks' 
                ? 'border-[#121212] text-[#121212]' 
                : 'border-transparent text-[#727272] hover:text-[#121212]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#326891]" />
            NYT Picks
          </button>
        </div>

        {/* Comments Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-[#e2e2e2]">
          {filteredComments.map(comment => (
            <div key={comment.id} className="pt-4 first:pt-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#121212]">{comment.author}</span>
                  <span className="text-[11px] text-[#727272]">{comment.location}</span>
                </div>
                <span className="text-[11px] text-[#888]">{comment.timeAgo}</span>
              </div>

              {comment.isNYTPick && (
                <div className="inline-flex items-center text-[10px] font-bold text-[#326891] mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#326891] mr-1.5"></span>
                  NYT PICK
                </div>
              )}

              <p className="headline-font text-[14px] leading-relaxed text-[#333] mb-3">
                {comment.text}
              </p>

              {/* Action row */}
              <div className="flex items-center justify-between text-xs text-[#727272]">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-1.5 hover:text-[#121212] transition-colors ${
                    likedMap[comment.id] ? 'text-[#326891] font-bold' : ''
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${likedMap[comment.id] ? 'fill-current' : ''}`} />
                  <span>Recommend ({comment.likes})</span>
                </button>
                <button className="hover:text-[#121212]">Reply</button>
              </div>

              {/* Nested replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-4 mt-3 pl-3 border-l-2 border-[#e2e2e2] space-y-2">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="text-xs">
                      <div className="flex items-center justify-between font-semibold text-[#121212] mb-0.5">
                        <span>{reply.author}</span>
                        <span className="text-[10px] font-normal text-[#888]">{reply.timeAgo}</span>
                      </div>
                      <p className="text-[#444] leading-normal">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Comment Input */}
        <form onSubmit={handleAddComment} className="p-3 border-t border-[#e2e2e2] bg-[#f9f9f9]">
          <div className="flex items-center gap-2 mb-2">
            <input 
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="Your Name"
              className="text-xs px-2.5 py-1 border border-[#ccc] rounded bg-white w-36"
            />
            <span className="text-[11px] text-[#727272]">Commenting as Verified Subscriber</span>
          </div>
          <div className="flex gap-2">
            <textarea
              rows={2}
              value={newCommentText}
              onChange={e => setNewCommentText(e.target.value)}
              placeholder="Share your thoughts on this story..."
              className="flex-1 text-xs p-2 border border-[#ccc] rounded bg-white focus:outline-none focus:border-[#121212] resize-none"
            />
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className={`px-4 rounded text-xs font-bold flex items-center justify-center ${
                newCommentText.trim() 
                  ? 'bg-[#121212] text-white hover:bg-black cursor-pointer' 
                  : 'bg-[#e2e2e2] text-[#888] cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
