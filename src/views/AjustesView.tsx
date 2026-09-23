import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AjustesView: React.FC = () => {
  const {
    settings,
    updateSettings,
    profile,
    cloudSyncState,
    triggerCloudSync,
    requestBiometricAuth,
    setIsAuthModalOpen,
    addNotification,
  } = useApp();

  const [accountCode] = useState('SHY-904D');
  const [syncingNow, setSyncingNow] = useState(false);

  const handleManualSync = async () => {
    setSyncingNow(true);
    await triggerCloudSync();
    setSyncingNow(false);
    addNotification({
      title: 'Cambios guardados',
      body: 'Tus preferencias quedaron actualizadas.',
      icon: 'save',
      type: 'sync',
    });
  };

  const handleTestPushNotification = () => {
    addNotification({
      title: 'Notificación de prueba',
      body: 'Las alertas de Shasky Ya están funcionando.',
      icon: 'notifications_active',
      type: 'chat',
    });
  };

  return (
    <div className="flex flex-col w-full pb-24 animate-fade-in max-w-2xl mx-auto px-4 py-3 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-[22px] text-[#001026] dark:text-white leading-tight">
            Ajustes
          </h1>
          <p className="text-[13px] text-[#44474e] dark:text-[#94a3b8]">
            Configura cuenta, avisos, radio de búsqueda y accesibilidad.
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-[#eaedff] dark:bg-[#1e293b] text-[#006b5f] dark:text-[#59dbc7] flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]">tune</span>
        </div>
      </div>

      {/* Saved Status Card */}
      <div className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#006b5f]/15 text-[#006b5f] dark:text-[#59dbc7] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">save</span>
            </div>
            <div>
              <h3 className="font-bold text-[14px] text-[#001026] dark:text-white flex items-center gap-1.5">
                <span>Cambios guardados</span>
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              </h3>
              <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">
                Última actualización: {profile.lastCloudSync}
              </span>
            </div>
          </div>
          <button
            onClick={handleManualSync}
            disabled={syncingNow}
            className="px-3 py-1.5 rounded-xl bg-[#006b5f] hover:bg-[#005047] text-white text-[12px] font-bold shadow-sm transition-all flex items-center gap-1 disabled:opacity-50 active:scale-95"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                syncingNow ? 'animate-spin' : ''
              }`}
            >
              sync
            </span>
            <span>{syncingNow ? 'Guardando...' : 'Guardar ahora'}</span>
          </button>
        </div>

        {/* Session Strip */}
        <div className="bg-[#f2f3ff] dark:bg-[#132238] rounded-xl p-2.5 flex flex-col gap-1.5 text-[11px]">
          <span className="font-bold text-[#001026] dark:text-white flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#006b5f] dark:text-[#59dbc7]">
              devices
            </span>
            Sesión activa:
          </span>
          <div className="flex items-center justify-between text-[#44474e] dark:text-[#94a3b8] pl-5">
            <span>Este dispositivo</span>
            <span className="text-[#10B981] font-bold">Activo</span>
          </div>
          <div className="flex items-center justify-between text-[#44474e] dark:text-[#94a3b8] pl-5">
            <span>Santiago Oriente</span>
            <span className="text-[#006b5f] dark:text-[#59dbc7]">Guardado</span>
          </div>
        </div>
      </div>

      {/* Modo Oscuro y Accesibilidad Visual */}
      <div className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] shadow-sm flex flex-col gap-3">
        <h3 className="font-bold text-[15px] text-[#001026] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006b5f] dark:text-[#59dbc7] text-[20px]">
            contrast
          </span>
          Modo Oscuro & Accesibilidad
        </h3>

        {/* Theme Selector */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => updateSettings({ darkMode: false })}
            className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
              !settings.darkMode
                ? 'border-[#006b5f] bg-[#f2f3ff] text-[#001026] font-bold shadow-sm'
                : 'border-[#eaedff] dark:border-[#1e293b] text-[#44474e] dark:text-[#94a3b8]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] text-amber-500">light_mode</span>
            <div className="text-left">
              <span className="text-[13px] block">Modo Claro</span>
              <span className="text-[10px] opacity-75">Alta luminosidad</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => updateSettings({ darkMode: true })}
            className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
              settings.darkMode
                ? 'border-[#59dbc7] bg-[#1e293b] text-white font-bold shadow-sm'
                : 'border-[#eaedff] dark:border-[#1e293b] text-[#44474e] dark:text-[#94a3b8]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] text-[#59dbc7]">dark_mode</span>
            <div className="text-left">
              <span className="text-[13px] block">Modo Oscuro</span>
              <span className="text-[10px] opacity-75">Menor fatiga visual</span>
            </div>
          </button>
        </div>

        {/* Sound & Haptic Feedback */}
        <div className="flex items-center justify-between pt-1 border-t border-[#eaedff] dark:border-[#1e293b]">
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#001026] dark:text-white">
              Vibración y Sonidos Hápticos
            </span>
            <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">
              Confirmaciones táctiles al enviar o agendar
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.hapticsEnabled}
            onChange={(e) => updateSettings({ hapticsEnabled: e.target.checked })}
            className="w-5 h-5 accent-[#006b5f] rounded"
          />
        </div>
      </div>

      {/* Sistema de Notificaciones Push */}
      <div className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[15px] text-[#001026] dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b5f] dark:text-[#59dbc7] text-[20px]">
              notifications_active
            </span>
            Notificaciones
          </h3>
          <input
            type="checkbox"
            checked={settings.pushEnabled}
            onChange={(e) => updateSettings({ pushEnabled: e.target.checked })}
            className="w-5 h-5 accent-[#006b5f] rounded"
          />
        </div>

        {settings.pushEnabled && (
          <div className="flex flex-col gap-2.5 pt-1 animate-fade-in text-[13px]">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between">
              <span className="text-[#001026] dark:text-[#eef0ff]">
                Mensajes de chat de maestros
              </span>
              <input
                type="checkbox"
                checked={settings.notifyChatMessages}
                onChange={(e) => updateSettings({ notifyChatMessages: e.target.checked })}
                className="w-4 h-4 accent-[#006b5f]"
              />
            </div>
            {/* Toggle 2 */}
            <div className="flex items-center justify-between">
              <span className="text-[#001026] dark:text-[#eef0ff]">
                Nuevas cotizaciones y presupuestos
              </span>
              <input
                type="checkbox"
                checked={settings.notifyNewQuotes}
                onChange={(e) => updateSettings({ notifyNewQuotes: e.target.checked })}
                className="w-4 h-4 accent-[#006b5f]"
              />
            </div>
            {/* Toggle 3 */}
            <div className="flex items-center justify-between">
              <span className="text-[#001026] dark:text-[#eef0ff]">
                Alertas urgentes
              </span>
              <input
                type="checkbox"
                checked={settings.notifySosAlerts}
                onChange={(e) => updateSettings({ notifySosAlerts: e.target.checked })}
                className="w-4 h-4 accent-[#006b5f]"
              />
            </div>

            {/* Test button */}
            <button
              type="button"
              onClick={handleTestPushNotification}
              className="mt-2 w-full py-2.5 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] hover:bg-[#e2e7ff] text-[#001026] dark:text-white font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px] text-[#006b5f] dark:text-[#59dbc7]">
                send
              </span>
              <span>Probar notificación</span>
            </button>
          </div>
        )}
      </div>

      {/* Seguridad de cuenta */}
      <div className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] shadow-sm flex flex-col gap-3">
        <h3 className="font-bold text-[15px] text-[#001026] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006b5f] dark:text-[#59dbc7] text-[20px]">
            fingerprint
          </span>
          Seguridad de cuenta
        </h3>

        {/* Biometrics Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#001026] dark:text-white">
              Inicio con huella / Face ID
            </span>
            <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">
              Confirmación rápida al abrir tu cuenta
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.biometricLogin}
            onChange={(e) => updateSettings({ biometricLogin: e.target.checked })}
            className="w-5 h-5 accent-[#006b5f] rounded"
          />
        </div>

        {/* Test Biometrics Button */}
        <button
          type="button"
          onClick={() => {
            requestBiometricAuth(() => {
              alert('Identidad validada correctamente.');
            });
          }}
          className="w-full py-2.5 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] text-[#006b5f] dark:text-[#59dbc7] font-bold text-[12px] flex items-center justify-center gap-2 hover:bg-[#e2e7ff] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">fingerprint</span>
          <span>Comprobar Sensor Biométrico</span>
        </button>

        {/* Account Code Box */}
        <div className="p-3 rounded-xl bg-[#f2f3ff] dark:bg-[#132238] border border-[#eaedff] dark:border-[#1e293b] flex flex-col gap-1 text-[11px]">
          <div className="flex justify-between items-center">
            <span className="font-bold text-[#001026] dark:text-white flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#006b5f]">badge</span>
              Código de cuenta:
            </span>
            <span className="text-[10px] text-[#10B981] font-bold">Activa</span>
          </div>
          <span className="font-mono text-[#44474e] dark:text-[#94a3b8] break-all">
            {accountCode}
          </span>
          <span className="text-[10px] text-[#44474e] dark:text-[#94a3b8] mt-0.5">
            Úsalo como referencia si necesitas ayuda con tu cuenta.
          </span>
        </div>
      </div>

      {/* User Account / Chilean Identity Card */}
      <div className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#006b5f]"
            />
            <div className="flex flex-col">
              <h4 className="font-bold text-[14px] text-[#001026] dark:text-white">{profile.name}</h4>
              <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8] font-mono">
                RUT: {profile.rut}
              </span>
              <span className="text-[10px] text-[#006b5f] dark:text-[#59dbc7] font-semibold mt-0.5">
                Rol: {profile.role === 'cliente' ? 'Cliente residencial' : 'Maestro'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-white text-[12px] font-bold hover:bg-[#e2e7ff] transition-all"
          >
            Editar
          </button>
        </div>
      </div>

      {/* App Version & Chilean Trust Strip */}
      <div className="text-center py-2 flex flex-col items-center gap-1 text-[11px] text-[#44474e] dark:text-[#94a3b8]">
        <span>Shasky Ya Chile • Versión 2.4.0 (Build 2026)</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[13px] text-[#006b5f]">security</span>
          Hecho para conectar clientes y maestros locales
        </span>
      </div>
    </div>
  );
};
