/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LEAD_ARTICLE, 
  SECONDARY_ARTICLES, 
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
  ExternalLink 
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
  const [viewportMode, setViewportMode] = useState<'mobile' | 'responsive'>('mobile');
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

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#121212] flex flex-col items-center">
      {/* Top Floating App Bar: Viewport & Image toggles (helpful for previewing) */}
      <aside aria-label="Preview controls" className="w-full bg-[#121212] text-white text-[11px] py-1.5 px-4 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-neutral-300 hidden sm:inline">The New York Times</span>
          {isSubscribed && (
            <span className="flex items-center gap-1 text-[#6aaa64] font-bold">
              <CheckCircle2 className="w-3 h-3" /> All-Access Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Viewport switch */}
          <div className="flex items-center bg-neutral-800 rounded p-0.5 border border-neutral-700">
            <button
              onClick={() => setViewportMode('mobile')}
              className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 transition-colors ${
                viewportMode === 'mobile' ? 'bg-neutral-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Mobile Mockup View (480px)"
            >
              <Smartphone className="w-3 h-3" /> Mobile
            </button>
            <button
              onClick={() => setViewportMode('responsive')}
              className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 transition-colors ${
                viewportMode === 'responsive' ? 'bg-neutral-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Desktop / Wide View"
            >
              <Monitor className="w-3 h-3" /> Full
            </button>
          </div>

          {/* Image source switch */}
          <button
            onClick={() => setImageMode(m => m === 'generated' ? 'placeholder' : 'generated')}
            className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded text-[10px] text-neutral-300 flex items-center gap-1"
            title="Toggle between Photojournalism and Stitch Placeholder image"
          >
            <ImageIcon className="w-3 h-3" />
            <span>{imageMode === 'generated' ? 'Photo: On' : 'Stitch SVG'}</span>
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
      ) : (
        /* Front Page Screen */
        <div className={`w-full bg-white min-h-screen transition-all ${
          viewportMode === 'mobile' ? 'max-w-[480px] shadow-xl my-0 sm:my-3 sm:border sm:border-[#e2e2e2]' : 'max-w-[760px] shadow-sm my-0 sm:my-4'
        }`}>
          {/* BEGIN: NavigationBar */}
          <header className="sticky top-0 z-40 bg-white border-b border-[#e2e2e2]" data-purpose="main-header">
            <div className="px-4 h-[48px] flex items-center justify-between">
              {/* Hamburger Menu Button */}
              <button 
                onClick={() => setIsNavOpen(true)}
                aria-label="Open navigation menu" 
                className="p-1 -ml-1 text-black hover:opacity-70 focus:outline-none transition-opacity"
              >
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>

              {/* Iconic NYT Masthead */}
              <button 
                onClick={() => {
                  setSelectedSection('Front Page');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="The New York Times Home" 
                className="flex items-center justify-center pt-0.5 focus:outline-none"
              >
                <span className="masthead-title text-[28px] sm:text-[32px] font-normal leading-none text-[#121212] select-none">
                  The New York Times
                </span>
              </button>

              {/* Action Buttons: Search & Profile */}
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
          {/* END: NavigationBar */}

          {/* BEGIN: SubBar */}
          <section className="border-b border-[#e2e2e2] bg-white px-4 py-2 flex items-center justify-between" data-purpose="sub-bar">
            <time className="text-[12px] sm:text-[13px] font-bold text-[#121212] tracking-tight" dateTime="2026-10-14">
              Wednesday, October 14, 2026
            </time>
            {isSubscribed ? (
              <span className="text-[11px] font-bold text-[#326891] tracking-tight">
                Subscriber Edition
              </span>
            ) : (
              <button 
                onClick={() => setIsSubscribeOpen(true)}
                className="px-3 py-1.5 border border-[#121212] rounded-sm text-[11px] font-bold tracking-tight text-[#121212] hover:bg-neutral-50 transition-colors"
              >
                Subscribe for $1/week
              </button>
            )}
          </section>
          {/* END: SubBar */}

          {/* Section banner if not front page */}
          {selectedSection !== 'Front Page' && (
            <div className="bg-[#f7f7f7] border-b border-[#e2e2e2] px-4 py-1.5 flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[#326891]">{selectedSection}</span>
              <button 
                onClick={() => setSelectedSection('Front Page')}
                className="text-[11px] text-[#727272] hover:underline"
              >
                Back to Front Page
              </button>
            </div>
          )}

          {/* BEGIN: MainContent */}
          <main className="max-w-[480px] mx-auto pb-12">
            {/* BEGIN: TopStoryWrapper */}
            <div className="m-3 border border-[#121212]/80 pb-3" data-purpose="top-story-container">
              {/* Free-to-read tag banner */}
              <div className="pt-4 pb-2 text-center" data-purpose="reading-access-badge">
                <p className="text-[14px] leading-tight text-[#121212]">
                  These top stories are <span className="font-bold">free to read.</span>
                </p>
                <div className="w-16 h-[2px] bg-[#326891] mx-auto mt-2"></div>
              </div>

              {/* Lead Headline Article */}
              <article className="px-4 pt-3" data-purpose="lead-article">
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

                {/* Read time metadata */}
                <div className="meta-font text-[#727272] mt-2 mb-3.5 uppercase font-medium flex items-center justify-between">
                  <span>5 MIN READ</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openArticle(LEAD_ARTICLE);
                    }}
                    className="text-[#326891] hover:underline text-[10px] font-bold tracking-wider"
                  >
                    READ STORY →
                  </button>
                </div>

                {/* Featured Portrait Photograph */}
                <figure 
                  onClick={() => openArticle(LEAD_ARTICLE)}
                  className="w-full m-0 p-0 cursor-pointer overflow-hidden relative group" 
                  data-purpose="article-hero-media"
                >
                  <img 
                    alt="High-ranking administration official testifying in committee" 
                    className="w-full object-cover aspect-[4/5] object-center block transition-transform duration-300 group-hover:scale-[1.01]" 
                    src={getHeroImageSrc()}
                  />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Tap to read story
                  </div>
                </figure>
              </article>
            </div>
            {/* END: TopStoryWrapper */}

            {/* BEGIN: SecondaryNewsSection */}
            <section className="px-4 mt-6" data-purpose="secondary-headlines">
              {/* Story 2: Kimberly Guilfoyle */}
              <article className="py-4 hairline-b">
                <h2 className="headline-font text-[21px] font-bold leading-snug text-[#121212]">
                  <button 
                    onClick={() => openArticle(SECONDARY_ARTICLES[0])}
                    className="text-left hover:underline focus:outline-none"
                  >
                    The Steep Rise and Sudden Fall of Kimberly Guilfoyle
                  </button>
                </h2>
                <p 
                  onClick={() => openArticle(SECONDARY_ARTICLES[0])}
                  className="headline-font text-[14px] text-[#555] leading-normal mt-1.5 cursor-pointer"
                >
                  Her quick ascent in Republican circles culminated in an ambassador post, but scrutiny followed quickly.
                </p>
                <div className="flex items-center space-x-3 mt-2 text-[11px] text-[#727272]">
                  <span className="meta-font">7 MIN READ</span>
                  <button 
                    onClick={() => setIsCommentsOpen(true)}
                    className="inline-flex items-center text-xs hover:text-[#121212] transition-colors focus:outline-none"
                    title="View 519 comments"
                  >
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    519
                  </button>
                </div>
              </article>

              {/* Story 3: Press Secretary */}
              <article className="py-4 hairline-b">
                <h2 className="headline-font text-[20px] font-bold leading-snug text-[#121212]">
                  <button 
                    onClick={() => openArticle(SECONDARY_ARTICLES[1])}
                    className="text-left hover:underline focus:outline-none"
                  >
                    Trump’s New Press Secretary: Not-Quite Attorney at Law
                  </button>
                </h2>
                <p 
                  onClick={() => openArticle(SECONDARY_ARTICLES[1])}
                  className="headline-font text-[14px] text-[#555] leading-normal mt-1.5 cursor-pointer"
                >
                  Questions linger over credentials and legal background in a fiercely combative briefing room.
                </p>
                <div className="meta-font text-[#727272] mt-2">
                  4 MIN READ
                </div>
              </article>

              {/* Topic Section: Russia-Ukraine War */}
              <div className="mt-6 pt-2 pb-4 hairline-b" data-purpose="topic-cluster">
                <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-[#326891] mb-2">
                  <span>World News</span>
                  <span>•</span>
                  <span>Russia-Ukraine War</span>
                </div>
                <h3 className="headline-font text-[19px] font-bold leading-snug text-[#121212]">
                  <button 
                    onClick={() => openArticle(SECONDARY_ARTICLES[2])}
                    className="text-left hover:underline focus:outline-none"
                  >
                    Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates
                  </button>
                </h3>
                {/* Key Developments Bulleted List */}
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
            {/* END: SecondaryNewsSection */}

            {/* BEGIN: DailyPuzzlesSection */}
            <section className="mt-8 px-4 py-4 bg-[#f7f7f7] border-t border-b border-[#e2e2e2]" data-purpose="nyt-games-widget">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#121212]">Play Daily Games</h3>
                <button 
                  onClick={() => setCurrentScreen('WORDLE')}
                  className="text-[12px] font-semibold text-[#326891] hover:underline"
                >
                  All Games ›
                </button>
              </div>

              {/* Game Cards Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Wordle Card */}
                <div 
                  onClick={() => setCurrentScreen('WORDLE')}
                  className="bg-white p-3 border border-[#e2e2e2] rounded flex flex-col justify-between hover:shadow-sm cursor-pointer transition-shadow"
                >
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

                {/* Connections Card */}
                <div 
                  onClick={() => setCurrentScreen('CONNECTIONS')}
                  className="bg-white p-3 border border-[#e2e2e2] rounded flex flex-col justify-between hover:shadow-sm cursor-pointer transition-shadow"
                >
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
            {/* END: DailyPuzzlesSection */}

            {/* BEGIN: Footer */}
            <footer className="mt-10 px-4 pt-6 border-t-2 border-[#121212] text-center" data-purpose="page-footer">
              <div className="masthead-title text-[24px] text-[#121212] mb-3">
                The New York Times
              </div>
              <nav aria-label="Footer links" className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-[#555] mb-5 font-sans">
                {['NEWS', 'OPINION', 'ARTS', 'LIVING', 'GAMES', 'COOKING', 'WIRECUTTER'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => {
                      if (item === 'GAMES') setCurrentScreen('WORDLE');
                      else setSelectedSection(item);
                    }}
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
            {/* END: Footer */}
          </main>
          {/* END: MainContent */}
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
