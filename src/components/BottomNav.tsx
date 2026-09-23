import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'explorar', label: 'Explorar', icon: 'explore' },
    { id: 'maestros', label: 'Maestros', icon: 'engineering' },
    { id: 'mi-perfil', label: 'Mi Perfil', icon: 'badge' },
    { id: 'metricas', label: 'Métricas', icon: 'analytics' },
    { id: 'ajustes', label: 'Ajustes', icon: 'tune' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#faf8ff]/95 dark:bg-[#070d18]/95 backdrop-blur-xl border-t border-[#eaedff]/80 dark:border-[#1e293b]/80 shadow-[0_-2px_12px_rgba(11,37,69,0.06)] transition-colors">
      <div className="flex justify-around items-center h-16 px-1 max-w-2xl mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] h-13 transition-all group ${
                isActive
                  ? 'text-[#006b5f] dark:text-[#59dbc7]'
                  : 'text-[#44474e] dark:text-[#94a3b8] hover:text-[#001026] dark:hover:text-white'
              }`}
              type="button"
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[23px] mb-0.5 transition-transform ${
                    isActive ? 'scale-110 font-bold' : 'group-hover:scale-105'
                  }`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#006b5f] dark:bg-[#59dbc7]" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
