/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Roadmap from './components/Roadmap';
import Timeline from './components/Timeline';
import QualityManagement from './components/QualityManagement';
import Quiz from './components/Quiz';
import Dictionary from './components/Dictionary';
import AITutor from './components/AITutor';
import { PROCESS_STEPS } from './data/semiconductorData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  // Track visited/completed processes in local storage
  const [progress, setProgress] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('semiconductor_progress');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Track favorite/saved processes in local storage
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('semiconductor_favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Keep track of which specific roadmap step is active (if any)
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  // Ensure we are strictly in light mode
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    localStorage.removeItem('theme');
  }, []);

  // Scroll to top on tab or step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab, selectedStepId]);

  // Sync progress and favorites with localStorage
  useEffect(() => {
    localStorage.setItem('semiconductor_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('semiconductor_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleCompleted = (id: string) => {
    setProgress(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectRoadmapStep = (id: string | null) => {
    setSelectedStepId(id);
    setCurrentTab('roadmap');
  };

  // Render the selected tab component
  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <Home 
            setCurrentTab={setCurrentTab} 
            progressCount={progress.length} 
            totalSteps={PROCESS_STEPS.length} 
          />
        );
      case 'roadmap':
        return (
          <Roadmap
            favorites={favorites}
            progress={progress}
            toggleFavorite={toggleFavorite}
            toggleCompleted={toggleCompleted}
            selectedStepId={selectedStepId}
            setSelectedStepId={setSelectedStepId}
          />
        );
      case 'timeline':
        return (
          <Timeline
            favorites={favorites}
            progress={progress}
            toggleFavorite={toggleFavorite}
            toggleCompleted={toggleCompleted}
          />
        );
      case 'quality':
        return <QualityManagement />;
      case 'quiz':
        return <Quiz />;
      case 'dictionary':
        return <Dictionary />;
      case 'tutor':
        return <AITutor />;
      default:
        return <Home setCurrentTab={setCurrentTab} progressCount={progress.length} totalSteps={PROCESS_STEPS.length} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-slate-50 flex flex-col transition-colors duration-300">
      
      {/* Header and navbar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          // If we navigate out of roadmap tab, we can deselect the step so it defaults to grid next time
          if (tab !== 'roadmap') {
            setSelectedStepId(null);
          }
        }}
        favorites={favorites}
        progress={progress}
        totalSteps={PROCESS_STEPS.length}
      />

      {/* Main viewport */}
      <main className="flex-1" id="main-viewport-content">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-950 text-center text-xs text-slate-400 font-medium shrink-0" id="global-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p>© 2026 반도체 제조 및 품질 배움터. All Rights Reserved.</p>
          <p className="mt-1">Designed for university students in Semiconductor Quality Management Course.</p>
        </div>
      </footer>

    </div>
  );
}
