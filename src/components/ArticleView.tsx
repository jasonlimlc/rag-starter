import React, { useState } from 'react';
import { 
  ArrowLeft, Bookmark, Share2, MessageSquare, Volume2, 
  Play, Pause, Type, Check, Clock, Eye, Sparkles
} from 'lucide-react';
import { Article, SECONDARY_ARTICLES, OPINION_ARTICLES } from '../data/newsData';

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

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'large': return 'text-[19px] leading-[1.85]';
      case 'huge': return 'text-[22px] leading-[1.95]';
      default: return 'text-[17px] leading-[1.8]';
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#121212]">
      {/* Toast Notification */}
      {showShareToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#121212] text-white text-xs font-bold px-4 py-2 rounded shadow-lg flex items-center gap-1.5 animate-fadeIn">
          <Check className="w-3.5 h-3.5 text-[#6aaa64]" /> Article link copied to clipboard
        </div>
      )}

      {/* Sticky Reader Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#e2e2e2] px-4 lg:px-8 h-12 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-xs font-semibold hover:text-[#326891] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Broadsheet
        </button>

        <div className="masthead-title text-[24px] select-none text-[#121212]">
          The New York Times
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => {
              setFontSizeLevel(prev => prev === 'normal' ? 'large' : prev === 'large' ? 'huge' : 'normal');
            }}
            className="p-1.5 hover:bg-neutral-100 rounded text-xs font-bold flex items-center gap-1 text-[#555] hover:text-[#121212]"
            title="Adjust text size"
          >
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px] uppercase">{fontSizeLevel}</span>
          </button>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 hover:bg-neutral-100 rounded transition-colors ${isBookmarked ? 'text-[#326891]' : 'text-[#555] hover:text-[#121212]'}`}
            title={isBookmarked ? 'Saved' : 'Save article'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleShare}
            className="p-1.5 hover:bg-neutral-100 rounded text-[#555] hover:text-[#121212]"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Article Container (Desktop Multi-Column Layout) */}
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 pt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Sticky Utility Rail on Desktop (1.5 cols) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 flex flex-col items-center space-y-4 text-[#727272]">
              <button 
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                  isPlayingAudio ? 'bg-[#121212] text-white border-[#121212]' : 'border-[#e2e2e2] hover:border-[#121212] text-[#121212]'
                }`}
                title="Listen to audio narration"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button 
                onClick={onOpenComments}
                className="w-10 h-10 rounded-full flex flex-col items-center justify-center border border-[#e2e2e2] hover:border-[#121212] text-[#121212] transition-colors"
                title="View comments"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-[9px] font-bold mt-0.5">{article.commentCount || 519}</span>
              </button>

              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                  isBookmarked ? 'border-[#326891] text-[#326891]' : 'border-[#e2e2e2] hover:border-[#121212] text-[#121212]'
                }`}
                title="Save article"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button 
                onClick={handleShare}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#e2e2e2] hover:border-[#121212] text-[#121212] transition-colors"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </aside>

          {/* Main Reading Column (Center, 8 cols) */}
          <main className="lg:col-span-8 lg:pr-6">
            {/* Category / Desk */}
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
            <h1 className="headline-font text-[32px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.08] text-[#121212] tracking-tight mb-4">
              {article.title}
            </h1>

            {/* Subhead / Deck */}
            <p className="headline-font text-[18px] sm:text-[21px] leading-[1.4] text-[#444] mb-5">
              {article.summary}
            </p>

            {/* Byline Strip */}
            <div className="border-t border-b border-[#e2e2e2] py-3 my-5 flex flex-wrap items-center justify-between text-xs text-[#555]">
              <div className="font-semibold text-[#121212] text-sm">{article.author}</div>
              <div className="meta-font text-[#727272] uppercase flex items-center gap-2">
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Audio Narration Bar */}
            <div className="bg-[#f7f7f7] border border-[#e2e2e2] rounded-xs p-3.5 mb-8 flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <button 
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-10 h-10 rounded-full bg-[#121212] text-white flex items-center justify-center hover:bg-neutral-800 transition-transform active:scale-95 shrink-0"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div>
                  <div className="text-xs font-bold text-[#121212]">
                    {isPlayingAudio ? 'Playing article audio narration...' : 'Listen to this article'}
                  </div>
                  <div className="text-[11px] text-[#727272]">
                    Duration: {article.audioDuration || '5:12'} · Narrated by NYT Audio Voice
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
              <figure className="mb-8">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-auto object-cover max-h-[580px] border border-[#e2e2e2]"
                />
                {article.imageCaption && (
                  <figcaption className="text-[12px] text-[#666] font-serif italic mt-2.5 pb-2 border-b border-[#e2e2e2] flex justify-between items-center">
                    <span>{article.imageCaption}</span>
                    <span className="text-[10px] text-[#888] font-sans">Kenny Holston / The New York Times</span>
                  </figcaption>
                )}
              </figure>
            )}

            {/* Bullet Points / Key Takeaways */}
            {article.bulletPoints && (
              <div className="bg-[#fcfcfc] border-l-2 border-[#121212] pl-5 py-3 my-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#121212] mb-2.5">
                  Key Takeaways
                </h4>
                <ul className="space-y-2.5 text-sm text-[#333]">
                  {article.bulletPoints.map((bp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212] mt-1.5 mr-2.5 flex-shrink-0"></span>
                      <span><strong className="font-bold">{bp.bold}</strong> {bp.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Prose */}
            <div className={`headline-font text-[#222] space-y-6 ${getFontSizeClass()}`}>
              {article.content.map((paragraph, index) => {
                if (index === 0) {
                  return (
                    <p 
                      key={index}
                      className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#121212]"
                    >
                      {paragraph}
                    </p>
                  );
                }
                return <p key={index}>{paragraph}</p>;
              })}
            </div>

            {/* Pull Quote Box */}
            <blockquote className="my-8 py-5 border-t border-b border-[#121212] text-center">
              <p className="headline-font italic text-[22px] sm:text-[26px] text-[#121212] leading-snug max-w-xl mx-auto">
                “What we are witnessing is not just typical burnout. There is an unmistakable narrowing of the room where the final choices are hammered out.”
              </p>
              <cite className="meta-font text-[#727272] uppercase tracking-wider block mt-3 font-semibold not-italic">
                — Former Deputy Administration Official
              </cite>
            </blockquote>

            {/* Comments Prompt */}
            <div className="mt-12 pt-6 border-t-2 border-[#121212] flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-xl text-[#121212]">Reader Discussion</h4>
                <p className="text-xs text-[#727272] mt-0.5">
                  Join verified New York Times subscribers discussing this reporting.
                </p>
              </div>
              <button 
                onClick={onOpenComments}
                className="px-5 py-2.5 bg-[#121212] text-white rounded text-xs font-bold hover:bg-neutral-800 flex items-center transition-transform active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-2" />
                {article.commentCount || 519} Comments
              </button>
            </div>
          </main>

          {/* Right Sidebar on Desktop (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pl-4 border-l border-[#e2e2e2]">
            {/* Related Coverage */}
            <div>
              <h4 className="meta-font text-[#121212] font-bold uppercase tracking-wider pb-1.5 border-b border-[#121212] mb-3">
                Related Reporting
              </h4>
              <div className="space-y-4">
                {SECONDARY_ARTICLES.slice(0, 2).map(sec => (
                  <div key={sec.id} className="pb-3 border-b border-[#f0f0f0]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#326891]">
                      {sec.category}
                    </span>
                    <h5 className="font-serif font-bold text-sm text-[#121212] hover:text-[#326891] leading-snug mt-1 cursor-pointer">
                      {sec.title}
                    </h5>
                    <p className="text-xs text-[#666] line-clamp-2 mt-1 font-serif">
                      {sec.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Read Strip */}
            <div>
              <h4 className="meta-font text-[#121212] font-bold uppercase tracking-wider pb-1.5 border-b border-[#121212] mb-3">
                Most Popular Today
              </h4>
              <ol className="space-y-3 text-xs">
                <li className="flex items-start gap-2.5">
                  <span className="font-serif font-bold text-lg text-[#326891]">1</span>
                  <span className="font-semibold text-[#121212] leading-snug">
                    High-Ranking Women Are Leaving the Trump Administration
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-serif font-bold text-lg text-[#326891]">2</span>
                  <span className="font-semibold text-[#121212] leading-snug">
                    The Steep Rise and Sudden Fall of Kimberly Guilfoyle
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-serif font-bold text-lg text-[#326891]">3</span>
                  <span className="font-semibold text-[#121212] leading-snug">
                    Global Chip Consortium Negotiates New Advanced Export Thresholds
                  </span>
                </li>
              </ol>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};
