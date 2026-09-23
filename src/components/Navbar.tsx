import React from 'react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    previousTab,
    role,
    setRole,
    unreadNotifsCount,
    setIsNotificationsDrawerOpen,
    setIsAuthModalOpen,
    selectedMaestro,
    cloudSyncState,
    settings,
    updateSettings,
    setIsVideoModalOpen,
  } = useApp();

  const getTitle = () => {
    switch (activeTab) {
      case 'explorar':
        return 'Explorar';
      case 'maestros':
        return 'Maestros';
      case 'mi-perfil':
        return 'Mi Perfil';
      case 'metricas':
        return 'Métricas';
      case 'ajustes':
        return 'Ajustes';
      case 'chat':
        return 'Chat Maestro';
      default:
        return 'Shasky Ya';
    }
  };

  // If in chat view, show dedicated chat header
  if (activeTab === 'chat') {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-[#ffffff]/90 dark:bg-[#0b1320]/90 backdrop-blur-xl border-b border-[#eaedff] dark:border-[#1e293b] pt-safe shadow-[0_1px_8px_rgba(11,37,69,0.06)]">
        <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={() => setActiveTab(previousTab || 'explorar')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#001026] dark:text-[#f1f5f9] hover:bg-[#eaedff] dark:hover:bg-[#1e293b] transition-all active:scale-95"
              aria-label="Volver atrás"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div
              className="relative shrink-0 cursor-pointer"
              onClick={() => setActiveTab('mi-perfil')}
              title={`Ver perfil de ${selectedMaestro.name}`}
            >
              <img
                src={selectedMaestro.avatar}
                alt={selectedMaestro.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#79f7e3] dark:ring-[#00a896]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] rounded-full ring-2 ring-white dark:ring-[#0b1320]" />
            </div>
            <div
              className="flex flex-col min-w-0 flex-1 pl-1 cursor-pointer"
              onClick={() => setActiveTab('mi-perfil')}
            >
              <div className="flex items-center gap-1.5 truncate">
                <h2 className="font-bold text-[16px] text-[#001026] dark:text-white truncate leading-tight">
                  {selectedMaestro.name}
                </h2>
                <span className="material-symbols-outlined text-[#006b5f] dark:text-[#59dbc7] text-[16px] shrink-0">
                  verified
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#44474e] dark:text-[#94a3b8] leading-none truncate text-[12px]">
                <span className="bg-[#eaedff] dark:bg-[#1e293b] text-[#0b2545] dark:text-[#93ccff] px-1.5 py-0.5 rounded font-semibold text-[10px]">
                  {selectedMaestro.badge || 'Verificado'}
                </span>
                <span className="text-[#006b5f] dark:text-[#59dbc7] truncate">
                  En línea · {selectedMaestro.responseTime}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                alert(`Llamando a ${selectedMaestro.name} (${selectedMaestro.phone})...`);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#001026] dark:text-[#f1f5f9] hover:bg-[#eaedff] dark:hover:bg-[#1e293b] transition-all active:scale-95"
              aria-label="Llamada de voz"
              title="Llamar"
            >
              <span className="material-symbols-outlined text-[22px]">call</span>
            </button>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#006b5f] dark:text-[#59dbc7] bg-[#76f4e0]/20 hover:bg-[#76f4e0]/40 transition-all active:scale-95"
              aria-label="Diagnóstico por Videollamada"
              title="Videodiagnóstico en vivo"
            >
              <span className="material-symbols-outlined text-[22px]">videocam</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#faf8ff]/85 dark:bg-[#070d18]/85 backdrop-blur-xl border-b border-[#eaedff]/60 dark:border-[#1e293b]/60 pt-safe shadow-[0_1px_8px_rgba(11,37,69,0.05)] transition-colors">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-2xl mx-auto">
        {/* Brand / Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setActiveTab('explorar')}
        >
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1WzS6Y9EoxfrlJK2qlpQiIvNowWjmQiFOkMO_PKhZc41wEzFyznXLCWL1NFODGNGus3lEZ8EjYbdksDsjmwSSDh8ADkwBsHLGHlWZAK0qtENZ0fVwVQ92h9BTgj5Xyr3B0-4JtdA_TxBByCpou6w8q0aK9YZV-Fkyl69UkQ8aqIhkKT_b0pZn5igLMKK5dSVirmlfwvuXYOfh856ut06qKNMVoaN3ajnJI1c3oXLoitLPonUjXNLF2u3A"
            alt="Logo Shasky Ya"
            className="h-8 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-bold text-[18px] tracking-tight text-[#001026] dark:text-white leading-none">
              Shasky Ya
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-[#44474e] dark:text-[#94a3b8] font-bold tracking-wider uppercase">
                {getTitle()}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  cloudSyncState === 'syncing'
                    ? 'bg-amber-400 animate-spin'
                    : 'bg-[#10B981]'
                }`}
                title={
                  cloudSyncState === 'syncing'
                    ? 'Guardando cambios...'
                    : 'Cambios guardados'
                }
              />
            </div>
          </div>
        </div>

        {/* Center / Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Cliente / Maestro Mode Switch */}
          <div className="inline-flex items-center bg-[#eaedff] dark:bg-[#1e293b] rounded-full p-0.5 shadow-inner">
            <button
              type="button"
              onClick={() => setRole('cliente')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                role === 'cliente'
                  ? 'text-white bg-[#0b2545] dark:bg-[#0284c7] shadow-sm'
                  : 'text-[#44474e] dark:text-[#94a3b8] hover:text-[#131b2e] dark:hover:text-white'
              }`}
            >
              Cliente
            </button>
            <button
              type="button"
              onClick={() => setRole('maestro')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                role === 'maestro'
                  ? 'text-white bg-[#006b5f] dark:bg-[#00a896] shadow-sm'
                  : 'text-[#44474e] dark:text-[#94a3b8] hover:text-[#131b2e] dark:hover:text-white'
              }`}
            >
              Maestro
            </button>
          </div>

          {/* Dark Mode Quick Toggle */}
          <button
            type="button"
            onClick={() => updateSettings({ darkMode: !settings.darkMode })}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#44474e] dark:text-[#93ccff] hover:bg-[#eaedff] dark:hover:bg-[#1e293b] transition-all active:scale-95"
            title={settings.darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Cambiar tema"
          >
            <span className="material-symbols-outlined text-[20px]">
              {settings.darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notifications Bell */}
          <button
            type="button"
            onClick={() => setIsNotificationsDrawerOpen(true)}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#44474e] dark:text-[#94a3b8] hover:bg-[#eaedff] dark:hover:bg-[#1e293b] transition-all active:scale-95"
            title="Notificaciones push"
            aria-label="Notificaciones"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#ba1a1a] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center p-0.5 focus:outline-none ring-1 ring-[#006b5f]/40 hover:ring-[#006b5f] transition-all"
            title="Cuenta"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq7pKhESJfhxHNmhQn3ujvTfDu0BaO1SM-ckcuuw0Urf0xijeWFVR1cTeOHnYSUVplfZeXkkX1Aqao7cdo_UhDj6CqiLcOE_w4D0k3oUuCdAWt4JlAV8QG5Ja4YqKDaI14cYCMsSBB4Fuyy-gZvKKHnD9cTgvQvoBXjMnYXISZ7pc6uEHoEORwv_Up2dr5LfqELERXC5HxmLKwS1uuSYvXasWlFovCzLUQqsbAaabRMVyWaIk9Btqm"
              alt="Perfil"
              className="w-7 h-7 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
