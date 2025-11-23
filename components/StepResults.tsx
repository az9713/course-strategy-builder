import React from 'react';
import { Download, Copy, BookOpen, Check, MessageCircleQuestion, Layers, Target } from 'lucide-react';
import { Button } from './Button';
import { ContentStrategy } from '../types';

interface StepResultsProps {
  strategy: ContentStrategy;
  onRestart: () => void;
}

export const StepResults: React.FC<StepResultsProps> = ({ strategy, onRestart }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = `
Core Topic: ${strategy.coreTopic}
Pillar: ${strategy.selectedPillar}
Lesson Variation: ${strategy.selectedVariation}

Audience Questions:
${strategy.generatedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
    `.trim();
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(strategy, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "content_strategy.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8 animate-fade-in pb-24">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Strategy Complete!</h2>
        <p className="text-slate-600 mt-2">Here is your demand-driven content map tailored to your audience.</p>
      </div>

      {/* Summary Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl mb-10 overflow-hidden relative">
         <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
         
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
                    <Target className="h-4 w-4" /> Core Topic
                </div>
                <div className="text-xl font-bold text-white">{strategy.coreTopic}</div>
            </div>
            
            <div className="relative md:pl-8 md:border-l md:border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
                    <Layers className="h-4 w-4" /> Pillar
                </div>
                <div className="text-lg font-semibold text-indigo-300">{strategy.selectedPillar}</div>
            </div>
            
            <div className="relative md:pl-8 md:border-l md:border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
                    <BookOpen className="h-4 w-4" /> Lesson
                </div>
                <div className="text-lg font-semibold text-teal-300">{strategy.selectedVariation}</div>
            </div>
         </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-8 justify-end">
        <Button variant="outline" onClick={handleCopy} className="bg-white">
          {copied ? <Check className="mr-2 h-4 w-4 text-green-600" /> : <Copy className="mr-2 h-4 w-4" />}
          {copied ? 'Copied' : 'Copy to Clipboard'}
        </Button>
        <Button variant="outline" onClick={handleDownload} className="bg-white">
          <Download className="mr-2 h-4 w-4" /> Export JSON
        </Button>
        <Button onClick={onRestart}>
           Start New Strategy
        </Button>
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
             <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <MessageCircleQuestion className="h-5 w-5 mr-2 text-indigo-600" />
                Audience Questions (Search Intent)
             </h3>
             <p className="text-sm text-slate-500 mt-1">Answer these specific questions in your content to demonstrate authority.</p>
        </div>
        <ul className="divide-y divide-slate-100">
          {strategy.generatedQuestions.map((question, idx) => (
            <li key={idx} className="p-4 hover:bg-indigo-50/30 transition-colors flex items-start group">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-slate-500 text-xs font-medium mr-4 mt-0.5 flex-shrink-0 group-hover:bg-indigo-100 group-hover:text-indigo-700">
                {idx + 1}
              </span>
              <span className="text-slate-700 font-medium">{question}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};