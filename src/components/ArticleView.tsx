import React, { useState } from 'react';
import { 
  ArrowLeft, Bookmark, Share2, MessageSquare, Volume2, VolumeX, 
  Play, Pause, Type, Check, ChevronDown, ChevronUp 
} from 'lucide-react';
import { Article } from '../data/newsData';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onOpenComments: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ 
  article, 
  onBack, 
  onOpenComments 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'huge'>('normal');
  const [showShareToast, setShowShareToast] = useState(false);
  const [audioProgress, setAudioProgress] = useState(25);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'large': return 'text-[18px] leading-[1.8]';
      case 'huge': return 'text-[21px] leading-[1.9]';
      default: return 'text-[16px] leading-[1.75]';
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#121212]">
      {/* Toast Notification */}
      {showShareToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#121212] text-white text-xs font-bold px-4 py-2 rounded shadow-lg flex items-center gap-1.5 animate-fadeIn">
          <Check className="w-3.5 h-3.5 text-[#6aaa64]" /> Link copied to clipboard
        </div>
      )}

      {/* Sticky Reader Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#e2e2e2] px-4 h-12 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-xs font-semibold hover:opacity-75 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Front Page
        </button>

        <div className="masthead-title text-[20px] select-none text-[#121212]">
          The New York Times
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => {
              setFontSizeLevel(prev => prev === 'normal' ? 'large' : prev === 'large' ? 'huge' : 'normal');
            }}
            className="p-1.5 hover:bg-neutral-100 rounded text-xs font-bold flex items-center"
            title="Adjust text size"
          >
            <Type className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 hover:bg-neutral-100 rounded transition-colors ${isBookmarked ? 'text-[#326891]' : 'text-[#121212]'}`}
            title={isBookmarked ? 'Saved' : 'Save article'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleShare}
            className="p-1.5 hover:bg-neutral-100 rounded text-[#121212]"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Article Content Container */}
      <main className="max-w-[680px] mx-auto px-4 pt-6 pb-20">
        {/* Category & Topic */}
        <div className="text-xs uppercase font-bold tracking-widest text-[#326891] mb-2 flex items-center gap-2">
          <span>{article.category || 'News'}</span>
          {article.topic && (
            <>
              <span>•</span>
              <span>{article.topic}</span>
            </>
          )}
        </div>

        {/* Headline */}
        <h1 className="headline-font text-[28px] sm:text-[36px] font-bold leading-[1.12] text-[#121212] tracking-tight mb-3">
          {article.title}
        </h1>

        {/* Standfirst / Summary */}
        <p className="headline-font text-[16px] sm:text-[19px] leading-[1.4] text-[#444] mb-4">
          {article.summary}
        </p>

        {/* Byline & Date */}
        <div className="border-t border-b border-[#e2e2e2] py-2.5 my-4 flex flex-wrap items-center justify-between text-xs text-[#555]">
          <div className="font-semibold text-[#121212]">{article.author}</div>
          <div className="meta-font text-[#727272] uppercase">{article.date} · {article.readTime}</div>
        </div>

        {/* Audio Narration Bar */}
        <div className="bg-[#f7f7f7] border border-[#e2e2e2] rounded-md p-3 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-9 h-9 rounded-full bg-[#121212] text-white flex items-center justify-center hover:bg-black transition-transform active:scale-95"
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div>
              <div className="text-xs font-bold text-[#121212]">
                {isPlayingAudio ? 'Playing article audio...' : 'Listen to this article'}
              </div>
              <div className="text-[11px] text-[#727272]">
                Duration: {article.audioDuration || '5:12'} · Narrated by NYT Audio
              </div>
            </div>
          </div>
          {isPlayingAudio && (
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[#727272]">
              <span className="w-2 h-2 rounded-full bg-[#6aaa64] animate-pulse"></span>
              <span>1.0x</span>
            </div>
          )}
        </div>

        {/* Hero Image */}
        {article.imageUrl && (
          <figure className="mb-6 -mx-4 sm:mx-0">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-auto object-cover max-h-[500px]"
            />
            {article.imageCaption && (
              <figcaption className="px-4 sm:px-0 text-[12px] text-[#666] font-serif italic mt-2 border-b border-[#e2e2e2] pb-2">
                {article.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Key Takeaways / Bullets if provided */}
        {article.bulletPoints && (
          <div className="bg-[#fcfcfc] border-l-2 border-[#121212] pl-4 py-2 my-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#121212] mb-2">Key Developments</h4>
            <ul className="space-y-2 text-sm text-[#333]">
              {article.bulletPoints.map((bp, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212] mt-1.5 mr-2.5 flex-shrink-0"></span>
                  <span><strong className="font-bold">{bp.bold}</strong> {bp.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body */}
        <div className={`headline-font text-[#222] space-y-5 ${getFontSizeClass()}`}>
          {article.content.map((paragraph, index) => {
            // First paragraph drop cap
            if (index === 0) {
              return (
                <p 
                  key={index}
                  className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none first-letter:text-[#121212]"
                >
                  {paragraph}
                </p>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        {/* Reader Comments Section Callout */}
        <div className="mt-10 pt-6 border-t border-[#121212] flex items-center justify-between">
          <div>
            <h4 className="font-serif font-bold text-lg text-[#121212]">Reader Discussion</h4>
            <p className="text-xs text-[#727272]">Join verified NYT subscribers discussing this report.</p>
          </div>
          <button 
            onClick={onOpenComments}
            className="px-4 py-2 bg-[#121212] text-white rounded text-xs font-bold hover:bg-black flex items-center transition-transform active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            {article.commentCount || 519} Comments
          </button>
        </div>
      </main>

      {/* Floating Bottom Reader Bar on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e2e2] px-4 py-2 flex items-center justify-between max-w-[680px] mx-auto z-40">
        <button 
          onClick={onBack} 
          className="text-xs font-semibold text-[#121212] hover:underline"
        >
          ← Front Page
        </button>
        <button 
          onClick={onOpenComments}
          className="flex items-center text-xs font-semibold text-[#326891] hover:underline"
        >
          <MessageSquare className="w-3.5 h-3.5 mr-1" />
          {article.commentCount || 519} Comments
        </button>
      </div>
    </div>
  );
};
