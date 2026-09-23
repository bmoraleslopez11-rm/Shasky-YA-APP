import React from 'react';
import { useApp } from '../context/AppContext';

export const NotificationBanner: React.FC = () => {
  const {
    activePushBanner,
    dismissPushBanner,
    setActiveTab,
    isNotificationsDrawerOpen,
    setIsNotificationsDrawerOpen,
    notifications,
    markNotificationsAsRead,
    addNotification,
  } = useApp();

  return (
    <>
      {/* Floating Push Notification Toast */}
      {activePushBanner && (
        <div className="fixed top-18 inset-x-3 z-50 max-w-md mx-auto animate-bounce-short">
          <div className="bg-[#ffffff]/95 dark:bg-[#0f172a]/95 backdrop-blur-xl border border-[#006b5f]/40 dark:border-[#59dbc7]/40 rounded-2xl p-3.5 shadow-[0_8px_30px_rgba(11,37,69,0.18)] flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#006b5f] text-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">
                {activePushBanner.icon || 'notifications'}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006b5f] dark:text-[#59dbc7]">
                  Shasky Ya • {activePushBanner.time}
                </span>
                <button
                  onClick={dismissPushBanner}
                  className="text-[#44474e] dark:text-[#94a3b8] hover:text-[#ba1a1a] p-0.5 rounded-full"
                  aria-label="Cerrar notificación"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
              <h4 className="font-bold text-[13px] text-[#001026] dark:text-white leading-tight mt-0.5">
                {activePushBanner.title}
              </h4>
              <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8] leading-snug line-clamp-2 mt-0.5">
                {activePushBanner.body}
              </p>

              {activePushBanner.actionPath && (
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (activePushBanner.actionPath) {
                        setActiveTab(activePushBanner.actionPath);
                      }
                      dismissPushBanner();
                    }}
                    className="px-3 py-1 rounded-lg bg-[#006b5f] hover:bg-[#005047] text-white text-[11px] font-bold shadow-sm transition-all active:scale-95"
                  >
                    Ver detalles
                  </button>
                  <button
                    onClick={dismissPushBanner}
                    className="px-2.5 py-1 rounded-lg bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-[#eef0ff] text-[11px] font-semibold transition-all hover:bg-opacity-80"
                  >
                    Descartar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notification Center Drawer / Modal */}
      {isNotificationsDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md h-full bg-[#faf8ff] dark:bg-[#070d18] border-l border-[#eaedff] dark:border-[#1e293b] flex flex-col shadow-2xl pt-safe pb-safe animate-slide-left">
            {/* Header */}
            <div className="p-4 border-b border-[#eaedff] dark:border-[#1e293b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#006b5f]/15 text-[#006b5f] dark:text-[#59dbc7] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#001026] dark:text-white leading-tight">
                    Centro de Notificaciones
                  </h3>
                  <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">
                    Alertas de tus servicios
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsNotificationsDrawerOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#44474e] dark:text-[#94a3b8] hover:bg-[#eaedff] dark:hover:bg-[#1e293b]"
                aria-label="Cerrar panel"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-4 py-2.5 bg-[#f2f3ff] dark:bg-[#0d1627] flex items-center justify-between text-[12px]">
              <button
                onClick={markNotificationsAsRead}
                className="text-[#006b5f] dark:text-[#59dbc7] font-semibold hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">done_all</span>
                Marcar leídas
              </button>
              <button
                onClick={() => {
                  addNotification({
                    title: 'Maestros disponibles en Providencia',
                    body: 'Hay electricistas y gasfíteres activos a menos de 2 km de tu ubicación.',
                    icon: 'crisis_alert',
                    type: 'sos',
                    actionPath: 'explorar',
                  });
                }}
                className="px-2.5 py-1 rounded bg-[#006b5f]/15 hover:bg-[#006b5f]/25 text-[#006b5f] dark:text-[#59dbc7] font-bold text-[11px] transition-all"
              >
                + Probar alerta
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center text-[#44474e] dark:text-[#94a3b8]">
                  <span className="material-symbols-outlined text-[48px] opacity-40 mb-2">
                    notifications_off
                  </span>
                  <p className="font-semibold text-[14px]">No hay notificaciones pendientes</p>
                  <p className="text-[12px] opacity-75">Las alertas de tus servicios aparecerán aquí.</p>
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.actionPath) {
                        setActiveTab(item.actionPath);
                        setIsNotificationsDrawerOpen(false);
                      }
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      item.read
                        ? 'bg-[#ffffff] dark:bg-[#0b1320] border-[#eaedff] dark:border-[#1e293b]'
                        : 'bg-[#eaedff]/60 dark:bg-[#132238] border-[#006b5f]/40 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#006b5f]/15 text-[#006b5f] dark:text-[#59dbc7] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-[13px] text-[#001026] dark:text-white truncate">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-[#44474e] dark:text-[#94a3b8] shrink-0">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8] leading-snug mt-1">
                          {item.body}
                        </p>
                        {item.actionPath && (
                          <div className="flex items-center gap-1 text-[11px] text-[#006b5f] dark:text-[#59dbc7] font-semibold mt-2">
                            <span>Ir a sección</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom info */}
            <div className="p-4 border-t border-[#eaedff] dark:border-[#1e293b] text-center">
              <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8] flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006b5f]">lock</span>
                Puedes ajustar estas alertas desde Ajustes.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
