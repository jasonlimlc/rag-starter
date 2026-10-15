import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ 
  isOpen, 
  onClose,
  onSubscribed
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'all-access' | 'news-only'>('all-access');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onSubscribed();
      onClose();
    }, 1800);
  };

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

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-2xl mb-2">Welcome to All Access</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your unlimited subscription to The New York Times is now active.
            </p>
            <div className="text-xs text-gray-400">Loading your newsfeed...</div>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <div className="masthead-title text-[26px] mb-1">
                The New York Times
              </div>
              <h2 className="font-serif font-bold text-xl text-[#121212]">
                Independent journalism worth supporting.
              </h2>
              <p className="text-xs text-[#666] mt-1">
                Unlimited access to News, Games, Cooking, Wirecutter and The Athletic.
              </p>
            </div>

            {/* Price banner */}
            <div className="bg-[#f7f7f7] border-2 border-[#121212] rounded-lg p-4 mb-4 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-[#326891] mb-1">
                LIMITED-TIME OFFER
              </div>
              <div className="text-3xl font-serif font-bold text-[#121212]">
                $1 <span className="text-sm font-sans font-normal text-gray-600">/ week</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Billed every 4 weeks for your first year. Cancel anytime.
              </p>
            </div>

            {/* Plan perks */}
            <ul className="space-y-2.5 text-xs text-gray-700 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Comprehensive global coverage:</strong> 1,700 journalists reporting from 150+ countries.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>The New York Times Games:</strong> Daily Wordle, Connections, The Mini and Spelling Bee.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>NYT Audio:</strong> Human-narrated articles, The Daily and exclusive subscriber podcasts.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Subscriber discussion:</strong> Join the conversation with 500+ verified daily commenters.</span>
              </li>
            </ul>

            <button
              onClick={handleSubscribe}
              className="w-full py-3 bg-[#121212] text-white rounded font-bold text-xs uppercase tracking-wider hover:bg-black transition-transform active:scale-98"
            >
              Start Your $1/Week Subscription
            </button>

            <div className="text-center mt-3">
              <span className="text-[10px] text-gray-400">
                Cancel anytime in your account settings. Terms apply.
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
