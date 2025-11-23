import React from 'react';
import { ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface StepSelectionProps {
  title: string;
  subtitle: string;
  items: string[];
  selectedItem: string | null;
  onSelect: (item: string) => void;
  onConfirm: () => void;
  isLoading: boolean;
  itemIcon?: React.ReactNode;
  confirmLabel: string;
}

export const StepSelection: React.FC<StepSelectionProps> = ({
  title,
  subtitle,
  items,
  selectedItem,
  onSelect,
  onConfirm,
  isLoading,
  itemIcon,
  confirmLabel,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="text-slate-600 mt-1">{subtitle}</p>
        </div>
        
        <div className="flex items-center gap-4 sticky top-20 z-30 md:static bg-slate-50/90 p-2 rounded-lg md:bg-transparent md:p-0">
            <span className="text-sm text-slate-500 hidden md:block">
                {selectedItem ? '1 item selected' : 'Select an item to proceed'}
            </span>
             <Button
                onClick={onConfirm}
                disabled={!selectedItem}
                isLoading={isLoading}
                className="shadow-lg shadow-indigo-500/20 w-full md:w-auto"
              >
                {confirmLabel} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item, idx) => {
          const isSelected = selectedItem === item;
          return (
            <button
              key={idx}
              onClick={() => onSelect(item)}
              className={`group relative p-6 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isSelected
                  ? 'bg-indigo-50 border-indigo-600 shadow-indigo-100'
                  : 'bg-white border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                 <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'}`}>
                   {itemIcon || <CheckCircle2 className="h-5 w-5" />}
                 </div>
                 {isSelected && <CheckCircle2 className="h-6 w-6 text-indigo-600" />}
              </div>
              
              <h3 className={`font-semibold leading-snug ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                {item}
              </h3>
              <p className="text-xs text-slate-400 mt-3 font-medium uppercase tracking-wider">Option {idx + 1}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};