import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface StepInputProps {
  onNext: (topic: string) => void;
  isLoading: boolean;
}

export const StepInput: React.FC<StepInputProps> = ({ onNext, isLoading }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onNext(topic.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20 text-center animate-fade-in">
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-full ring-8 ring-indigo-50/50">
          <Sparkles className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
      
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
        Let's build your authority.
      </h2>
      <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
        I'm your content strategy coach. Start by telling me the <strong>single core topic</strong> you want to dominate. I'll help you break it down.
      </p>

      <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Sustainable Gardening, SaaS Marketing, Yoga for Seniors"
            className="block w-full pl-11 pr-4 py-4 text-lg bg-white border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none shadow-sm transition-all text-slate-900 placeholder:text-slate-400"
            disabled={isLoading}
            autoFocus
          />
        </div>
        <div className="mt-6">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full sm:w-auto rounded-full px-8" 
            isLoading={isLoading}
            disabled={!topic.trim()}
          >
            Start Brainstorming <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </form>
      
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left text-sm text-slate-500">
        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
          <span className="block font-semibold text-slate-800 mb-1">1. Broad Pillars</span>
          We'll generate 30 high-level pillars to cover your base.
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
          <span className="block font-semibold text-slate-800 mb-1">2. Specific Lessons</span>
          You pick a pillar, we drill down into actionable lessons.
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
          <span className="block font-semibold text-slate-800 mb-1">3. Search Intent</span>
          Finally, we map real audience questions to your content.
        </div>
      </div>
    </div>
  );
};