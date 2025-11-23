import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StepInput } from './components/StepInput';
import { StepSelection } from './components/StepSelection';
import { StepResults } from './components/StepResults';
import { Step, ContentStrategy, LoadingState } from './types';
import { generatePillars, generateVariations, generateQuestions } from './services/geminiService';
import { Layers, BookOpen, AlertCircle } from 'lucide-react';

const INITIAL_STRATEGY: ContentStrategy = {
  coreTopic: '',
  selectedPillar: null,
  selectedVariation: null,
  generatedPillars: [],
  generatedVariations: [],
  generatedQuestions: [],
};

function App() {
  const [step, setStep] = useState<Step>(Step.INPUT_CORE);
  const [strategy, setStrategy] = useState<ContentStrategy>(INITIAL_STRATEGY);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false, message: '' });
  const [error, setError] = useState<string | null>(null);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleError = (msg: string) => {
    setError(msg);
    setLoading({ isLoading: false, message: '' });
    // Auto-dismiss error after 5 seconds
    setTimeout(() => setError(null), 5000);
  };

  const handleCoreTopicSubmit = async (topic: string) => {
    setLoading({ isLoading: true, message: 'Analyzing market and generating strategic pillars...' });
    setError(null);
    try {
      const pillars = await generatePillars(topic);
      setStrategy(prev => ({ ...prev, coreTopic: topic, generatedPillars: pillars }));
      setStep(Step.SELECT_PILLAR);
    } catch (err) {
      handleError('Coach is having trouble connecting. Please try again.');
    } finally {
      setLoading({ isLoading: false, message: '' });
    }
  };

  const handlePillarSelect = (pillar: string) => {
    setStrategy(prev => ({ ...prev, selectedPillar: pillar }));
  };

  const confirmPillar = async () => {
    if (!strategy.selectedPillar || !strategy.coreTopic) return;
    
    setLoading({ isLoading: true, message: `Drilling down into "${strategy.selectedPillar}"...` });
    setError(null);
    
    try {
      const variations = await generateVariations(strategy.selectedPillar, strategy.coreTopic);
      setStrategy(prev => ({ ...prev, generatedVariations: variations }));
      setStep(Step.SELECT_VARIATION);
    } catch (err) {
      handleError('Could not generate variations. Please try a different pillar or retry.');
    } finally {
      setLoading({ isLoading: false, message: '' });
    }
  };

  const handleVariationSelect = (variation: string) => {
    setStrategy(prev => ({ ...prev, selectedVariation: variation }));
  };

  const confirmVariation = async () => {
    if (!strategy.selectedVariation || !strategy.selectedPillar) return;

    setLoading({ isLoading: true, message: 'Finding customer pain points and questions...' });
    setError(null);

    try {
      const questions = await generateQuestions(strategy.selectedVariation, strategy.selectedPillar);
      setStrategy(prev => ({ ...prev, generatedQuestions: questions }));
      setStep(Step.VIEW_QUESTIONS);
    } catch (err) {
      handleError('Could not generate questions. Please try again.');
    } finally {
      setLoading({ isLoading: false, message: '' });
    }
  };

  const resetApp = () => {
    if (window.confirm("Start a new strategy session? Current progress will be lost.")) {
        setStrategy(INITIAL_STRATEGY);
        setStep(Step.INPUT_CORE);
        setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header currentStep={step} reset={resetApp} />

      <main className="flex-grow relative">
        
        {/* Error Toast */}
        {error && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-lg flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                </div>
            </div>
        )}

        {/* Loading Overlay */}
        {loading.isLoading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center animate-fade-in">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                </div>
            </div>
            <p className="mt-6 text-lg font-medium text-slate-700 animate-pulse">{loading.message}</p>
            <p className="text-sm text-slate-400 mt-2">Consulting the AI Coach...</p>
          </div>
        )}

        {step === Step.INPUT_CORE && (
          <StepInput onNext={handleCoreTopicSubmit} isLoading={loading.isLoading} />
        )}

        {step === Step.SELECT_PILLAR && (
          <StepSelection
            title="Choose a Pillar Topic"
            subtitle={`Which aspect of "${strategy.coreTopic}" do you want to focus on first?`}
            items={strategy.generatedPillars}
            selectedItem={strategy.selectedPillar}
            onSelect={handlePillarSelect}
            onConfirm={confirmPillar}
            isLoading={loading.isLoading}
            confirmLabel="Generate Variations"
            itemIcon={<Layers className="h-5 w-5" />}
          />
        )}

        {step === Step.SELECT_VARIATION && (
          <StepSelection
            title="Select a Lesson Angle"
            subtitle={`How do you want to teach "${strategy.selectedPillar}"?`}
            items={strategy.generatedVariations}
            selectedItem={strategy.selectedVariation}
            onSelect={handleVariationSelect}
            onConfirm={confirmVariation}
            isLoading={loading.isLoading}
            confirmLabel="Find Audience Questions"
            itemIcon={<BookOpen className="h-5 w-5" />}
          />
        )}

        {step === Step.VIEW_QUESTIONS && (
          <StepResults 
            strategy={strategy} 
            onRestart={() => {
                setStrategy(INITIAL_STRATEGY);
                setStep(Step.INPUT_CORE);
            }} 
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
              <p>&copy; {new Date().getFullYear()} Topical Authority Coach. Powered by Google Gemini.</p>
          </div>
      </footer>
    </div>
  );
}

export default App;