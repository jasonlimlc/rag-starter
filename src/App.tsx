/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LEAD_ARTICLE, 
  SECONDARY_ARTICLES, 
  OPINION_ARTICLES,
  BUSINESS_ARTICLES,
  MARKET_DATA,
  Article 
} from './data/newsData';
import { ArticleView } from './components/ArticleView';
import { WordleGame } from './components/WordleGame';
import { ConnectionsGame } from './components/ConnectionsGame';
import { CommentsDrawer } from './components/CommentsDrawer';
import { NavigationDrawer } from './components/NavigationDrawer';
import { SubscribeModal } from './components/SubscribeModal';
import { UserAccountModal } from './components/UserAccountModal';
import { SearchModal } from './components/SearchModal';
import { 
  Smartphone, 
  Monitor, 
  Image as ImageIcon, 
  Search, 
  Bookmark, 
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Sun,
  Newspaper,
  Volume2,
  ChevronRight,
  User,
  Share2
} from 'lucide-react';

type Screen = 'HOME' | 'ARTICLE' | 'WORDLE' | 'CONNECTIONS';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [selectedArticle, setSelectedArticle] = useState<Article>(LEAD_ARTICLE);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [savedArticles, setSavedArticles] = useState<Article[]>([LEAD_ARTICLE]);
  const [imageMode, setImageMode] = useState<'generated' | 'placeholder'>('generated');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedSection, setSelectedSection] = useState<string>('Front Page');

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentScreen('ARTICLE');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getHeroImageSrc = () => {
    if (imageMode === 'placeholder') {
      return 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg';
    }
    return LEAD_ARTICLE.imageUrl || 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg';
  };

  const toggleBookmark = (article: Article) => {
    if (savedArticles.some(a => a.id === article.id)) {
      setSavedArticles(savedArticles.filter(a => a.id !== article.id));
    } else {
      setSavedArticles([...savedArticles, article]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] flex flex-col items-center antialiased">
      {/* Top Utility Bar (Viewport mode & pro controls) */}
      <aside aria-label="Edition and view settings" className="w-full bg-[#121212] text-white text-[11px] py-1.5 px-4 sm:px-8 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-semibold tracking-wide text-neutral-300 uppercase text-[10px]">
            The New York Times Broadsheet Edition
          </span>
          {isSubscribed ? (
            <span className="flex items-center gap-1 text-[#6aaa64] font-bold">
              <CheckCircle2 className="w-3 h-3" /> All-Access Subscriber
            </span>
          ) : (
            <span className="hidden md:inline text-neutral-400">
              International Digital Circulation · Established 1851
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Viewport switch */}
          <div className="flex items-center bg-neutral-800 rounded p-0.5 border border-neutral-700">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`px-2.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors ${
                viewportMode === 'desktop' ? 'bg-[#326891] text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Full Desktop Broadsheet View"
            >
              <Monitor className="w-3 h-3" /> Desktop Pro
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`px-2.5 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 transition-colors ${
                viewportMode === 'mobile' ? 'bg-neutral-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Mobile Device Mockup View (480px)"
            >
              <Smartphone className="w-3 h-3" /> Mobile
            </button>
          </div>

          {/* Image source switch */}
          <button
            onClick={() => setImageMode(m => m === 'generated' ? 'placeholder' : 'generated')}
            className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded text-[10px] text-neutral-300 flex items-center gap-1"
            title="Toggle between Photojournalism and Stitch Placeholder"
          >
            <ImageIcon className="w-3 h-3" />
            <span className="hidden sm:inline">{imageMode === 'generated' ? 'Editorial Photography' : 'Stitch SVG'}</span>
          </button>
        </div>
      </aside>

      {/* Screen Router */}
      {currentScreen === 'WORDLE' ? (
        <div className="w-full bg-white flex-1 flex justify-center">
          <WordleGame onBack={() => setCurrentScreen('HOME')} />
        </div>
      ) : currentScreen === 'CONNECTIONS' ? (
        <div className="w-full bg-white flex-1 flex justify-center">
          <ConnectionsGame onBack={() => setCurrentScreen('HOME')} />
        </div>
      ) : currentScreen === 'ARTICLE' ? (
        <div className="w-full bg-white flex-1">
          <ArticleView
            article={selectedArticle}
            onBack={() => setCurrentScreen('HOME')}
            onOpenComments={() => setIsCommentsOpen(true)}
          />
        </div>
      ) : viewportMode === 'mobile' ? (
        /* Mobile Centered Layout (exact matching screenshot) */
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-xl my-0 sm:my-3 sm:border sm:border-[#e2e2e2]">
          {/* Mobile Navigation Header */}
          <header className="sticky top-0 z-40 bg-white border-b border-[#e2e2e2]">
            <div className="px-4 h-[48px] flex items-center justify-between">
              <button 
                onClick={() => setIsNavOpen(true)}
                aria-label="Open navigation menu" 
                className="p-1 -ml-1 text-black hover:opacity-70 focus:outline-none"
              >
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>

              <button 
                onClick={() => {
                  setSelectedSection('Front Page');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-center pt-0.5 focus:outline-none"
              >
                <span className="masthead-title text-[28px] sm:text-[32px] font-normal leading-none text-[#121212] select-none">
                  The New York Times
                </span>
              </button>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search"
                  className="p-1 text-black hover:opacity-70 focus:outline-none"
                >
                  <Search className="w-[18px] h-[18px]" />
                </button>
                <button 
                  onClick={() => setIsAccountOpen(true)}
                  aria-label="User account" 
                  className="p-1 -mr-1 text-black hover:opacity-70 focus:outline-none"
                >
                  <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* SubBar */}
          <section className="border-b border-[#e2e2e2] bg-white px-4 py-2 flex items-center justify-between">
            <time className="text-[12px] sm:text-[13px] font-bold text-[#121212] tracking-tight">
              Wednesday, October 14, 2026
            </time>
            {isSubscribed ? (
              <span className="text-[11px] font-bold text-[#326891]">Subscriber Edition</span>
            ) : (
              <button 
                onClick={() => setIsSubscribeOpen(true)}
                className="px-3 py-1.5 border border-[#121212] rounded-sm text-[11px] font-bold tracking-tight text-[#121212] hover:bg-neutral-50 transition-colors"
              >
                Subscribe for $1/week
              </button>
            )}
          </section>

          {/* Mobile Main */}
          <main className="max-w-[480px] mx-auto pb-12">
            {/* Lead Boxed Container */}
            <div className="m-3 border border-[#121212]/80 pb-3">
              <div className="pt-4 pb-2 text-center">
                <p className="text-[14px] leading-tight text-[#121212]">
                  These top stories are <span className="font-bold">free to read.</span>
                </p>
                <div className="w-16 h-[2px] bg-[#326891] mx-auto mt-2"></div>
              </div>

              <article className="px-4 pt-3">
                <h1 
                  onClick={() => openArticle(LEAD_ARTICLE)}
                  className="headline-font text-[28px] leading-[1.12] font-bold text-[#121212] tracking-tight cursor-pointer hover:text-[#326891] transition-colors"
                >
                  High-Ranking Women Are Leaving the Trump Administration
                </h1>
                <p 
                  onClick={() => openArticle(LEAD_ARTICLE)}
                  className="headline-font text-[15px] leading-[1.35] text-[#333333] mt-2 font-normal cursor-pointer"
                >
                  In the president’s second term, those heading for the exits are female officials.
                </p>
                <div className="meta-font text-[#727272] mt-2 mb-3.5 uppercase font-medium">
                  5 MIN READ
                </div>
                <figure 
                  onClick={() => openArticle(LEAD_ARTICLE)}
                  className="w-full m-0 p-0 cursor-pointer overflow-hidden" 
                >
                  <img 
                    alt="High-ranking administration official in pink jacket" 
                    className="w-full object-cover aspect-[4/5] object-center block" 
                    src={getHeroImageSrc()}
                  />
                </figure>
              </article>
            </div>

            {/* Secondary Stories */}
            <section className="px-4 mt-6">
              <article className="py-4 hairline-b">
                <h2 className="headline-font text-[21px] font-bold leading-snug text-[#121212]">
                  <button onClick={() => openArticle(SECONDARY_ARTICLES[0])} className="text-left hover:underline">
                    The Steep Rise and Sudden Fall of Kimberly Guilfoyle
                  </button>
                </h2>
                <p onClick={() => openArticle(SECONDARY_ARTICLES[0])} className="headline-font text-[14px] text-[#555] leading-normal mt-1.5 cursor-pointer">
                  Her quick ascent in Republican circles culminated in an ambassador post, but scrutiny followed quickly.
                </p>
                <div className="flex items-center space-x-3 mt-2 text-[11px] text-[#727272]">
                  <span className="meta-font">7 MIN READ</span>
                  <button onClick={() => setIsCommentsOpen(true)} className="inline-flex items-center text-xs hover:text-[#121212]">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    519
                  </button>
                </div>
              </article>

              <article className="py-4 hairline-b">
                <h2 className="headline-font text-[20px] font-bold leading-snug text-[#121212]">
                  <button onClick={() => openArticle(SECONDARY_ARTICLES[1])} className="text-left hover:underline">
                    Trump’s New Press Secretary: Not-Quite Attorney at Law
                  </button>
                </h2>
                <p onClick={() => openArticle(SECONDARY_ARTICLES[1])} className="headline-font text-[14px] text-[#555] leading-normal mt-1.5 cursor-pointer">
                  Questions linger over credentials and legal background in a fiercely combative briefing room.
                </p>
                <div className="meta-font text-[#727272] mt-2">
                  4 MIN READ
                </div>
              </article>

              <div className="mt-6 pt-2 pb-4 hairline-b">
                <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-[#326891] mb-2">
                  <span>World News</span>
                  <span>•</span>
                  <span>Russia-Ukraine War</span>
                </div>
                <h3 className="headline-font text-[19px] font-bold leading-snug text-[#121212]">
                  <button onClick={() => openArticle(SECONDARY_ARTICLES[2])} className="text-left hover:underline">
                    Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates
                  </button>
                </h3>
                <ul className="mt-3 space-y-2 text-[13px] font-sans text-[#333]">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212] mt-1.5 mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-bold">Wins for Putin:</strong> Moscow secures new diplomatic backchannels across central Asia.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212] mt-1.5 mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-bold">Escalating Assaults:</strong> Drone strikes target power grids along the eastern frontlines.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212] mt-1.5 mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-bold">Russian Oil Deal:</strong> Price caps face renewed pushback under shadow maritime fleets.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Daily Games Section */}
            <section className="mt-8 px-4 py-4 bg-[#f7f7f7] border-t border-b border-[#e2e2e2]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#121212]">Play Daily Games</h3>
                <button onClick={() => setCurrentScreen('WORDLE')} className="text-[12px] font-semibold text-[#326891]">All Games ›</button>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div onClick={() => setCurrentScreen('WORDLE')} className="bg-white p-3 border border-[#e2e2e2] rounded flex flex-col justify-between hover:shadow-sm cursor-pointer">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 bg-[#6aaa64] inline-block rounded-xs"></span>
                      <span className="w-3 h-3 bg-[#c9b458] inline-block rounded-xs"></span>
                      <span className="w-3 h-3 bg-[#787c7e] inline-block rounded-xs"></span>
                    </div>
                    <div className="font-bold text-[14px] mt-2 text-[#121212]">Wordle</div>
                    <div className="text-[11px] text-[#727272]">Guess the 5-letter word</div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#121212] mt-3 underline">Play</span>
                </div>

                <div onClick={() => setCurrentScreen('CONNECTIONS')} className="bg-white p-3 border border-[#e2e2e2] rounded flex flex-col justify-between hover:shadow-sm cursor-pointer">
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 bg-[#f9df6d] rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-[#a0c35a] rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-[#b0c4ef] rounded-full"></span>
                      <span className="w-2.5 h-2.5 bg-[#ba81c5] rounded-full"></span>
                    </div>
                    <div className="font-bold text-[14px] mt-2 text-[#121212]">Connections</div>
                    <div className="text-[11px] text-[#727272]">Group words by topic</div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#121212] mt-3 underline">Play</span>
                </div>
              </div>
            </section>

            {/* Mobile Footer */}
            <footer className="mt-10 px-4 pt-6 border-t-2 border-[#121212] text-center">
              <div className="masthead-title text-[24px] text-[#121212] mb-3">
                The New York Times
              </div>
              <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-[#555] mb-5 font-sans">
                {['NEWS', 'OPINION', 'ARTS', 'LIVING', 'GAMES', 'COOKING', 'WIRECUTTER'].map(item => (
                  <button 
                    key={item} 
                    onClick={() => item === 'GAMES' ? setCurrentScreen('WORDLE') : setSelectedSection(item)}
                    className="hover:underline font-semibold"
                  >
                    {item}
                  </button>
                ))}
              </nav>
              <div className="text-[10px] text-[#727272] space-y-1">
                <p>© 2026 The New York Times Company</p>
                <p>NYTCo • Contact Us • Terms of Sale • Privacy Policy</p>
              </div>
            </footer>
          </main>
        </div>
      ) : (
        /* DESKTOP PRO BROADSHEET VERSION */
        <div className="w-full max-w-[1360px] px-4 lg:px-8 pb-16">
          {/* Top Desktop Utility Row */}
          <div className="pt-3 pb-2 border-b border-[#e2e2e2] flex items-center justify-between text-xs text-[#555]">
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-[#121212]">Wednesday, October 14, 2026</span>
              <span className="text-[#ccc]">|</span>
              <button 
                onClick={() => setSelectedSection("Today's Paper")}
                className="flex items-center hover:text-[#121212]"
              >
                <Newspaper className="w-3.5 h-3.5 mr-1 text-[#121212]" /> Today’s Paper
              </button>
              <span className="text-[#ccc]">|</span>
              <div className="flex items-center space-x-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Washington, D.C. 68°F Partly Cloudy</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden xl:flex items-center space-x-3 text-[11px] pr-4 border-r border-[#e2e2e2]">
                {MARKET_DATA.slice(0, 3).map(m => (
                  <span key={m.symbol} className="font-mono">
                    <strong className="font-sans font-semibold text-[#121212]">{m.symbol}</strong> {m.value}{' '}
                    <span className={m.positive ? 'text-[#008000]' : 'text-[#d0021b]'}>
                      {m.change}
                    </span>
                  </span>
                ))}
              </div>

              {isSubscribed ? (
                <div className="flex items-center gap-1.5 text-[#326891] font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#6aaa64]" />
                  <span>All-Access Member</span>
                </div>
              ) : (
                <button
                  onClick={() => setIsSubscribeOpen(true)}
                  className="px-3.5 py-1 bg-[#121212] text-white hover:bg-neutral-800 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Subscribe for $1/week
                </button>
              )}

              <button
                onClick={() => setIsAccountOpen(true)}
                className="px-3 py-1 border border-[#121212] hover:bg-neutral-50 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                <span>{isSubscribed ? 'Account' : 'Log In'}</span>
              </button>
            </div>
          </div>

          {/* Grand Masthead */}
          <div className="text-center py-5 relative">
            <button 
              onClick={() => {
                setSelectedSection('Front Page');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block focus:outline-none"
            >
              <h1 className="masthead-title text-[44px] md:text-[58px] lg:text-[70px] leading-none text-[#121212] tracking-normal select-none">
                The New York Times
              </h1>
            </button>
          </div>

          {/* Broadsheet Desk Navigation Strip */}
          <nav aria-label="Desktop Desk Navigation" className="border-t border-b-2 border-[#121212] py-2 mb-6">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#121212]">
              <div className="flex items-center space-x-1 sm:space-x-4 lg:space-x-5 overflow-x-auto no-scrollbar py-0.5">
                {[
                  'World', 'U.S. Politics', 'Business', 'Tech', 'Science', 
                  'Health', 'Opinion', 'Arts', 'Books', 'Style', 'Food', 
                  'Travel', 'Games', 'Cooking', 'Wirecutter', 'The Athletic'
                ].map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      if (item === 'Games') setCurrentScreen('WORDLE');
                      else setSelectedSection(item);
                    }}
                    className={`whitespace-nowrap hover:text-[#326891] transition-colors ${
                      selectedSection === item ? 'text-[#326891] underline decoration-2 underline-offset-4' : ''
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-3 shrink-0 pl-4 border-l border-[#e2e2e2]">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#555] hover:text-[#121212]"
                  title="Search articles"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Search</span>
                </button>
                <span className="text-[#888] font-normal text-[10px]">U.S. Edition</span>
              </div>
            </div>
          </nav>

          {/* Breaking / Top Stories Alert Ribbon */}
          <div className="bg-[#fcfcfc] border border-[#e2e2e2] px-4 py-2 mb-6 flex flex-wrap items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#d0021b] uppercase tracking-wider flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#d0021b] mr-1.5 animate-pulse"></span>
                Top Story
              </span>
              <span className="text-[#ccc]">|</span>
              <span className="text-[#333] font-medium">
                Analysis of high-level resignations and diplomatic realignments in Washington.
              </span>
            </div>
            <button
              onClick={() => openArticle(LEAD_ARTICLE)}
              className="text-[#326891] hover:underline font-bold text-xs"
            >
              Read Full Special Report →
            </button>
          </div>

          {/* BROADSHEET 3-COLUMN EDITORIAL GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 hairline-b">
            {/* COLUMN 1: Secondary Investigations & Political Depth (Left, 3.5 cols) */}
            <div className="lg:col-span-3 lg:border-r lg:border-[#e2e2e2] lg:pr-6 space-y-6">
              {/* Secondary Lead: Kimberly Guilfoyle */}
              <article className="pb-6 hairline-b">
                <span className="meta-font text-[#326891] font-bold uppercase tracking-wider block mb-1">
                  Investigation
                </span>
                <h2 className="headline-font text-[22px] font-bold leading-tight text-[#121212]">
                  <button 
                    onClick={() => openArticle(SECONDARY_ARTICLES[0])}
                    className="text-left hover:underline focus:outline-none"
                  >
                    The Steep Rise and Sudden Fall of Kimberly Guilfoyle
                  </button>
                </h2>
                <p 
                  onClick={() => openArticle(SECONDARY_ARTICLES[0])}
                  className="headline-font text-[14px] text-[#444] leading-normal mt-2 cursor-pointer"
                >
                  Her quick ascent in Republican circles culminated in an ambassador post, but scrutiny followed quickly.
                </p>
                <div className="flex items-center justify-between text-xs text-[#727272] mt-3 pt-2 border-t border-[#f0f0f0]">
                  <span className="meta-font">7 MIN READ</span>
                  <button 
                    onClick={() => setIsCommentsOpen(true)}
                    className="flex items-center gap-1 hover:text-[#121212] transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    <span className="font-bold">519</span>
                  </button>
                </div>
              </article>

              {/* Story 3: Press Secretary */}
              <article className="pb-6 hairline-b">
                <span className="meta-font text-[#727272] uppercase font-bold tracking-wider block mb-1">
                  White House Memo
                </span>
                <h3 className="headline-font text-[20px] font-bold leading-snug text-[#121212]">
                  <button 
                    onClick={() => openArticle(SECONDARY_ARTICLES[1])}
                    className="text-left hover:underline focus:outline-none"
                  >
                    Trump’s New Press Secretary: Not-Quite Attorney at Law
                  </button>
                </h3>
                <p 
                  onClick={() => openArticle(SECONDARY_ARTICLES[1])}
                  className="headline-font text-[13.5px] text-[#555] leading-normal mt-2 cursor-pointer"
                >
                  Questions linger over credentials and legal background in a fiercely combative briefing room.
                </p>
                <div className="meta-font text-[#727272] mt-2">
                  4 MIN READ · Charlie Savage
                </div>
              </article>

              {/* Political Quick Briefs */}
              <div className="pt-2">
                <h4 className="meta-font text-[#121212] font-bold uppercase tracking-wider mb-3">
                  Capital Developments
                </h4>
                <div className="space-y-4 text-xs font-sans divide-y divide-[#f0f0f0]">
                  <div className="pt-2">
                    <a href="#oversight" onClick={(e) => { e.preventDefault(); openArticle(LEAD_ARTICLE); }} className="font-semibold text-[#121212] hover:text-[#326891] block leading-snug">
                      Senate Oversight schedules subpoena votes on West Wing personnel files.
                    </a>
                    <span className="text-[10px] text-[#888] mt-1 block">15 min ago</span>
                  </div>
                  <div className="pt-3">
                    <a href="#judicial" onClick={(e) => { e.preventDefault(); openArticle(SECONDARY_ARTICLES[1]); }} className="font-semibold text-[#121212] hover:text-[#326891] block leading-snug">
                      Federal bar admissions under review for executive regulatory counsel.
                    </a>
                    <span className="text-[10px] text-[#888] mt-1 block">42 min ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: THE LEAD STORY (Center, 5.5 cols, exactly matching user layout) */}
            <div className="lg:col-span-6 px-0 lg:px-4">
              {/* Boxed container matching user reference */}
              <div className="border border-[#121212]/80 p-4 md:p-6 mb-6">
                <div className="text-center pb-2">
                  <p className="text-[14px] leading-tight text-[#121212]">
                    These top stories are <span className="font-bold">free to read.</span>
                  </p>
                  <div className="w-16 h-[2px] bg-[#326891] mx-auto mt-2"></div>
                </div>

                <article className="pt-3">
                  <h1 
                    onClick={() => openArticle(LEAD_ARTICLE)}
                    className="headline-font text-[32px] sm:text-[40px] leading-[1.08] font-bold text-[#121212] tracking-tight cursor-pointer hover:text-[#326891] transition-colors text-center md:text-left"
                  >
                    High-Ranking Women Are Leaving the Trump Administration
                  </h1>

                  <p 
                    onClick={() => openArticle(LEAD_ARTICLE)}
                    className="headline-font text-[16px] sm:text-[18px] leading-[1.38] text-[#333333] mt-3 font-normal cursor-pointer"
                  >
                    In the president’s second term, those heading for the exits are female officials.
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#727272] my-3 border-t border-b border-[#e2e2e2] py-2">
                    <div className="font-semibold text-[#121212]">{LEAD_ARTICLE.author}</div>
                    <div className="meta-font uppercase">{LEAD_ARTICLE.readTime}</div>
                  </div>

                  {/* Featured Hero Photo */}
                  <figure 
                    onClick={() => openArticle(LEAD_ARTICLE)}
                    className="w-full m-0 p-0 cursor-pointer overflow-hidden group relative"
                  >
                    <img 
                      alt="High-ranking administration official in pink jacket" 
                      className="w-full object-cover aspect-[4/5] md:aspect-[3/2] object-center block transition-transform duration-300 group-hover:scale-[1.01]" 
                      src={getHeroImageSrc()}
                    />
                    <figcaption className="text-[11px] text-[#666] font-serif italic mt-2 flex justify-between items-center">
                      <span>{LEAD_ARTICLE.imageCaption}</span>
                      <span className="text-[10px] text-[#888] font-sans">Kenny Holston / The New York Times</span>
                    </figcaption>
                  </figure>

                  {/* Desktop Lead Story Excerpt */}
                  <div className="headline-font text-[15px] leading-relaxed text-[#333] mt-4 space-y-3">
                    <p>
                      Over the past six weeks, four cabinet-level and deputy leaders — including key directors at the Environmental Protection Agency and senior communications liaisons — have submitted their resignations or indicated their departure before the upcoming midterm season.
                    </p>
                    <p>
                      While turnover is a hallmark of second-term presidencies, several departing advisers privately pointed to an increasingly consolidated decision-making apparatus in the West Wing.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#e2e2e2] flex items-center justify-between">
                    <button 
                      onClick={() => openArticle(LEAD_ARTICLE)}
                      className="px-4 py-2 bg-[#121212] text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                    >
                      Read Full Report
                    </button>
                    <button 
                      onClick={() => toggleBookmark(LEAD_ARTICLE)}
                      className="text-xs text-[#326891] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      {savedArticles.some(a => a.id === LEAD_ARTICLE.id) ? 'Saved' : 'Save for Later'}
                    </button>
                  </div>
                </article>
              </div>
            </div>

            {/* COLUMN 3: World Cluster & Opinion Columnists (Right, 3 cols) */}
            <div className="lg:col-span-3 lg:border-l lg:border-[#e2e2e2] lg:pl-6 space-y-6">
              {/* World News • Ukraine */}
              <article className="pb-6 hairline-b">
                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-[#326891] mb-2">
                  <span>World News</span>
                  <span>•</span>
                  <span>Russia-Ukraine War</span>
                </div>
                <h3 className="headline-font text-[20px] font-bold leading-snug text-[#121212]">
                  <button 
                    onClick={() => openArticle(SECONDARY_ARTICLES[2])}
                    className="text-left hover:underline focus:outline-none"
                  >
                    Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates
                  </button>
                </h3>

                {/* Satellite Image Thumbnail */}
                <figure 
                  onClick={() => openArticle(SECONDARY_ARTICLES[2])}
                  className="w-full my-3 cursor-pointer overflow-hidden border border-[#e2e2e2]"
                >
                  <img 
                    src={SECONDARY_ARTICLES[2].imageUrl} 
                    alt="Satellite tactical map" 
                    className="w-full h-36 object-cover"
                  />
                </figure>

                {/* Key Developments Bulleted List */}
                <ul className="space-y-2 text-[12px] font-sans text-[#333]">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212] mt-1.5 mr-2 flex-shrink-0"></span>
                    <span><strong className="font-bold">Wins for Putin:</strong> Moscow secures new diplomatic backchannels across central Asia.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212] mt-1.5 mr-2 flex-shrink-0"></span>
                    <span><strong className="font-bold">Escalating Assaults:</strong> Drone strikes target power grids along the eastern frontlines.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212] mt-1.5 mr-2 flex-shrink-0"></span>
                    <span><strong className="font-bold">Russian Oil Deal:</strong> Price caps face renewed pushback under shadow maritime fleets.</span>
                  </li>
                </ul>
              </article>

              {/* Opinion Voices */}
              <div>
                <div className="meta-font text-[#121212] font-bold uppercase tracking-wider pb-1.5 border-b border-[#121212] mb-3">
                  Opinion Columnists
                </div>
                <div className="space-y-4">
                  {OPINION_ARTICLES.map(op => (
                    <article key={op.id} className="pb-3 border-b border-[#f0f0f0]">
                      <span className="text-[11px] font-bold text-[#121212] block">{op.author}</span>
                      <h4 className="headline-font text-[15px] font-bold leading-snug text-[#121212] mt-0.5">
                        <button 
                          onClick={() => openArticle(op)}
                          className="text-left hover:text-[#326891]"
                        >
                          {op.title}
                        </button>
                      </h4>
                      <p className="text-[11px] text-[#666] line-clamp-2 mt-1 font-serif">
                        {op.summary}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP INTERACTIVE GAMES STRIP */}
          <section className="my-10 bg-[#f7f7f7] border border-[#e2e2e2] p-6 rounded-xs">
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-[#e2e2e2]">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                  The New York Times Games & Puzzles
                </h3>
                <span className="text-xs text-[#727272] hidden sm:inline">
                  Original wordplay and daily intellectual exercises
                </span>
              </div>
              <button 
                onClick={() => setCurrentScreen('WORDLE')}
                className="text-xs font-semibold text-[#326891] hover:underline"
              >
                All Games & Crosswords ›
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Wordle Card */}
              <div 
                onClick={() => setCurrentScreen('WORDLE')}
                className="bg-white p-4 border border-[#e2e2e2] rounded hover:border-[#121212] hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1.5 mb-2">
                    <span className="w-4 h-4 bg-[#6aaa64] inline-block rounded-xs"></span>
                    <span className="w-4 h-4 bg-[#c9b458] inline-block rounded-xs"></span>
                    <span className="w-4 h-4 bg-[#787c7e] inline-block rounded-xs"></span>
                  </div>
                  <h4 className="font-bold text-[16px] text-[#121212]">Wordle</h4>
                  <p className="text-xs text-[#666] mt-1">Guess the hidden 5-letter word in 6 tries.</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#121212] underline">Play Today’s Word</span>
                  <span className="text-[10px] text-[#888] font-mono">No. 1,214</span>
                </div>
              </div>

              {/* Connections Card */}
              <div 
                onClick={() => setCurrentScreen('CONNECTIONS')}
                className="bg-white p-4 border border-[#e2e2e2] rounded hover:border-[#121212] hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1.5 mb-2">
                    <span className="w-3.5 h-3.5 bg-[#f9df6d] rounded-full"></span>
                    <span className="w-3.5 h-3.5 bg-[#a0c35a] rounded-full"></span>
                    <span className="w-3.5 h-3.5 bg-[#4a72b2] rounded-full"></span>
                    <span className="w-3.5 h-3.5 bg-[#ba81c5] rounded-full"></span>
                  </div>
                  <h4 className="font-bold text-[16px] text-[#121212]">Connections</h4>
                  <p className="text-xs text-[#666] mt-1">Group 16 words into 4 categories of four.</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#121212] underline">Play Connections</span>
                  <span className="text-[10px] text-[#888] font-mono">No. 491</span>
                </div>
              </div>

              {/* Mini Crossword Card */}
              <div 
                onClick={() => setCurrentScreen('WORDLE')}
                className="bg-white p-4 border border-[#e2e2e2] rounded hover:border-[#121212] hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 bg-[#121212] text-white flex items-center justify-center font-bold text-xs rounded-xs mb-2">
                    5×5
                  </div>
                  <h4 className="font-bold text-[16px] text-[#121212]">The Mini Crossword</h4>
                  <p className="text-xs text-[#666] mt-1">Quick, bite-sized clues solved in under a minute.</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#121212] underline">Play The Mini</span>
                  <span className="text-[10px] text-[#888]">Daily</span>
                </div>
              </div>

              {/* Spelling Bee Card */}
              <div 
                onClick={() => setCurrentScreen('CONNECTIONS')}
                className="bg-white p-4 border border-[#e2e2e2] rounded hover:border-[#121212] hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#f9df6d]"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#e2e2e2]"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#e2e2e2]"></span>
                  </div>
                  <h4 className="font-bold text-[16px] text-[#121212]">Spelling Bee</h4>
                  <p className="text-xs text-[#666] mt-1">How many words can you make with 7 letters?</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#121212] underline">Play Spelling Bee</span>
                  <span className="text-[10px] text-[#888]">Hive</span>
                </div>
              </div>
            </div>
          </section>

          {/* LOWER BROADSHEET: Business, Tech & Lifestyle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-[#121212]">
            {/* Business Desk */}
            <div>
              <div className="meta-font text-[#121212] font-bold uppercase tracking-wider pb-1 border-b border-[#121212] mb-3">
                Business & Economy
              </div>
              {BUSINESS_ARTICLES.map(biz => (
                <article key={biz.id} className="mb-4 pb-4 border-b border-[#f0f0f0] last:border-none">
                  <h4 className="headline-font text-[16px] font-bold leading-snug text-[#121212]">
                    <button onClick={() => openArticle(biz)} className="text-left hover:text-[#326891]">
                      {biz.title}
                    </button>
                  </h4>
                  <p className="text-xs text-[#555] font-serif mt-1">{biz.summary}</p>
                  <span className="meta-font text-[#888] mt-1.5 block">{biz.readTime} · {biz.author}</span>
                </article>
              ))}
            </div>

            {/* Wirecutter & Product Reviews */}
            <div>
              <div className="meta-font text-[#121212] font-bold uppercase tracking-wider pb-1 border-b border-[#121212] mb-3">
                Wirecutter Picks
              </div>
              <div className="space-y-4">
                <div className="flex gap-3 items-center group cursor-pointer" onClick={() => setSelectedSection('Wirecutter')}>
                  <div className="w-16 h-16 bg-[#f0f0f0] flex items-center justify-center font-bold text-xs text-[#727272] shrink-0">
                    TESTED
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#121212] group-hover:text-[#326891]">
                      The 8 Best Kitchen Knives for Precision Prep
                    </h5>
                    <p className="text-[11px] text-[#727272] line-clamp-2 mt-0.5">
                      After 60 hours of slicing and dicing, our culinary lab picks the ultimate versatile blades.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-center group cursor-pointer" onClick={() => setSelectedSection('Wirecutter')}>
                  <div className="w-16 h-16 bg-[#f0f0f0] flex items-center justify-center font-bold text-xs text-[#727272] shrink-0">
                    AUDIO
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#121212] group-hover:text-[#326891]">
                      Top Noise-Canceling Headphones for Long-Haul Travel
                    </h5>
                    <p className="text-[11px] text-[#727272] line-clamp-2 mt-0.5">
                      Sublime acoustics, 40-hour battery stamina, and plush memory foam comfort tested on transcontinental flights.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* NYT Cooking */}
            <div>
              <div className="meta-font text-[#121212] font-bold uppercase tracking-wider pb-1 border-b border-[#121212] mb-3">
                NYT Cooking
              </div>
              <div className="bg-[#fafafa] border border-[#e2e2e2] p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d0021b] block mb-1">
                  Dinner Tonight
                </span>
                <h4 className="headline-font text-[17px] font-bold text-[#121212] mb-1">
                  Sheet-Pan Harissa Chicken With Caramelized Leeks
                </h4>
                <p className="text-xs text-[#555] font-serif mb-3">
                  A high-heat roast that yields succulent chicken with charred scallions and lemon yogurt drizzle.
                </p>
                <div className="flex items-center justify-between text-xs text-[#727272] border-t border-[#e2e2e2] pt-2">
                  <span>45 Min · Easy</span>
                  <span className="font-bold text-[#121212]">4.9 ★ (1,840)</span>
                </div>
              </div>
            </div>
          </div>

          {/* MASTER DESKTOP FOOTER */}
          <footer className="mt-12 pt-8 border-t-2 border-[#121212]">
            <div className="text-center mb-8">
              <span className="masthead-title text-[36px] text-[#121212] select-none block">
                The New York Times
              </span>
              <p className="text-xs text-[#727272] mt-1">
                “All the News That’s Fit to Print”
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-xs text-[#444] pb-8 border-b border-[#e2e2e2]">
              <div>
                <h5 className="font-bold text-[#121212] mb-2 uppercase text-[11px]">News</h5>
                <ul className="space-y-1.5 text-[#555]">
                  <li><button onClick={() => setSelectedSection('World')} className="hover:underline">World News</button></li>
                  <li><button onClick={() => setSelectedSection('U.S. Politics')} className="hover:underline">U.S. Politics</button></li>
                  <li><button onClick={() => setSelectedSection('Business')} className="hover:underline">Business</button></li>
                  <li><button onClick={() => setSelectedSection('Tech')} className="hover:underline">Technology</button></li>
                  <li><button onClick={() => setSelectedSection('Science')} className="hover:underline">Science</button></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-[#121212] mb-2 uppercase text-[11px]">Opinion</h5>
                <ul className="space-y-1.5 text-[#555]">
                  <li><button onClick={() => setSelectedSection('Opinion')} className="hover:underline">Today's Opinion</button></li>
                  <li><button onClick={() => setSelectedSection('Opinion')} className="hover:underline">Columnists</button></li>
                  <li><button onClick={() => setSelectedSection('Opinion')} className="hover:underline">Editorials</button></li>
                  <li><button onClick={() => setSelectedSection('Opinion')} className="hover:underline">Guest Essays</button></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-[#121212] mb-2 uppercase text-[11px]">Arts</h5>
                <ul className="space-y-1.5 text-[#555]">
                  <li><button onClick={() => setSelectedSection('Arts')} className="hover:underline">Art & Design</button></li>
                  <li><button onClick={() => setSelectedSection('Books')} className="hover:underline">Book Review</button></li>
                  <li><button onClick={() => setSelectedSection('Movies')} className="hover:underline">Movies</button></li>
                  <li><button onClick={() => setSelectedSection('Music')} className="hover:underline">Music</button></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-[#121212] mb-2 uppercase text-[11px]">Living</h5>
                <ul className="space-y-1.5 text-[#555]">
                  <li><button onClick={() => setSelectedSection('Style')} className="hover:underline">Style</button></li>
                  <li><button onClick={() => setSelectedSection('Food')} className="hover:underline">Food & Cooking</button></li>
                  <li><button onClick={() => setSelectedSection('Travel')} className="hover:underline">Travel</button></li>
                  <li><button onClick={() => setSelectedSection('Real Estate')} className="hover:underline">Real Estate</button></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-[#121212] mb-2 uppercase text-[11px]">More</h5>
                <ul className="space-y-1.5 text-[#555]">
                  <li><button onClick={() => setCurrentScreen('WORDLE')} className="hover:underline font-bold text-[#326891]">Wordle</button></li>
                  <li><button onClick={() => setCurrentScreen('CONNECTIONS')} className="hover:underline font-bold text-[#326891]">Connections</button></li>
                  <li><button onClick={() => setSelectedSection('Cooking')} className="hover:underline">NYT Cooking</button></li>
                  <li><button onClick={() => setSelectedSection('Wirecutter')} className="hover:underline">Wirecutter</button></li>
                  <li><button onClick={() => setSelectedSection('The Athletic')} className="hover:underline">The Athletic</button></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-[#121212] mb-2 uppercase text-[11px]">Subscribe</h5>
                <ul className="space-y-1.5 text-[#555]">
                  <li><button onClick={() => setIsSubscribeOpen(true)} className="hover:underline font-bold text-[#121212]">All Access for $1/week</button></li>
                  <li><button onClick={() => setIsAccountOpen(true)} className="hover:underline">Manage Subscription</button></li>
                  <li><button onClick={() => setIsSubscribeOpen(true)} className="hover:underline">Gift Subscriptions</button></li>
                  <li><button onClick={() => setIsAccountOpen(true)} className="hover:underline">Newsletters</button></li>
                </ul>
              </div>
            </div>

            <div className="py-6 flex flex-wrap items-center justify-between text-[11px] text-[#727272]">
              <div className="flex flex-wrap gap-4 mb-2 md:mb-0">
                <span>© 2026 The New York Times Company</span>
                <a href="#nytco" className="hover:underline">NYTCo</a>
                <a href="#contact" className="hover:underline">Contact Us</a>
                <a href="#accessibility" className="hover:underline">Accessibility</a>
                <a href="#work" className="hover:underline">Work with Us</a>
                <a href="#advertise" className="hover:underline">Advertise</a>
                <a href="#privacy" className="hover:underline">Your Privacy Choices</a>
              </div>
              <div>
                <span>Site Map · Help · Subscriptions</span>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Modals & Drawers */}
      <CommentsDrawer
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        articleTitle={selectedArticle.title}
      />

      <NavigationDrawer
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onSelectSection={(sec) => setSelectedSection(sec)}
        onOpenWordle={() => setCurrentScreen('WORDLE')}
        onOpenConnections={() => setCurrentScreen('CONNECTIONS')}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        onSubscribed={() => setIsSubscribed(true)}
      />

      <UserAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        isSubscribed={isSubscribed}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        savedArticles={savedArticles}
        onSelectArticle={(art) => openArticle(art)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(art) => openArticle(art)}
      />
    </div>
  );
}
