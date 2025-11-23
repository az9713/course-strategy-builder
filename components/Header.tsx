import React from 'react';
import { BrainCircuit, ChevronRight } from 'lucide-react';
import { Step } from '../types';

interface HeaderProps {
  currentStep: Step;
  reset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, reset }) => {
  const steps = [
    { id: Step.INPUT_CORE, label: 'Core Topic' },
    { id: Step.SELECT_PILLAR, label: 'Select Pillar' },
    { id: Step.SELECT_VARIATION, label: 'Select Lesson' },
    { id: Step.VIEW_QUESTIONS, label: 'Get Questions' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer group" onClick={reset}>
            <div className="bg-indigo-600 p-2 rounded-lg mr-3 group-hover:bg-indigo-700 transition-colors">
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Topical Authority Coach</h1>
              <p className="text-xs text-slate-500 font-medium">Iterative Strategy Builder</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                    currentStep >= step.id
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-200'
                      : 'bg-slate-50 text-slate-400 border-2 border-slate-200'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${currentStep >= step.id ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                )}
              </div>
            ))}
          </nav>
        </div>
        
        {/* Mobile Progress Bar */}
        <div className="md:hidden h-1 w-full bg-slate-100 mt-0">
            <div 
                className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
            />
        </div>
      </div>
    </header>
  );
};