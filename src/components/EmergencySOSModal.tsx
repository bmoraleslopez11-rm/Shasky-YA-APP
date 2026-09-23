import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const EmergencySOSModal: React.FC = () => {
  const { isSOSModalOpen, setIsSOSModalOpen, addNotification, setActiveTab, setSelectedMaestro, maestros } =
    useApp();

  const [stage, setStage] = useState<'select' | 'dispatched'>('select');
  const [selectedEmergency, setSelectedEmergency] = useState('gasfiteria');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(1200); // 20 min = 1200s
  const assignedMaster =
    selectedEmergency === 'electricidad'
      ? maestros.find((m) => m.trade.toLowerCase().includes('electric')) || maestros[0]
      : maestros.find((m) => m.trade.toLowerCase().includes('gasf')) || maestros[1] || maestros[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSOSModalOpen && stage === 'dispatched' && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSOSModalOpen, stage, timeLeftSeconds]);

  if (!isSOSModalOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirmSOS = () => {
    setStage('dispatched');
    setSelectedMaestro(assignedMaster);
    addNotification({
      title: 'Ayuda urgente solicitada',
      body: `${assignedMaster.name} está en ruta a tu dirección. Tiempo estimado: 18 min.`,
      icon: 'crisis_alert',
      type: 'sos',
      actionPath: 'chat',
    });
  };

  const handleClose = () => {
    setIsSOSModalOpen(false);
    setStage('select');
    setTimeLeftSeconds(1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-[#ffffff] dark:bg-[#0f172a] border border-[#ba1a1a]/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Urgent header accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#ba1a1a] via-amber-500 to-[#ba1a1a] animate-pulse" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#44474e] dark:text-[#94a3b8] hover:text-[#001026] dark:hover:text-white p-1 rounded-full"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {stage === 'select' ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] dark:bg-[#93000a]/40 text-[#ba1a1a] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[32px] animate-bounce">
                e911_emergency
              </span>
            </div>

            <h3 className="font-bold text-[20px] text-[#001026] dark:text-white leading-tight">
              Solicitud urgente
            </h3>
            <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8] mt-1 mb-4">
              Te conectamos con un maestro disponible en Santiago Oriente.
            </p>

            <div className="w-full flex flex-col gap-2 mb-5">
              {[
                {
                  id: 'electricidad',
                  icon: 'bolt',
                  label: 'Corte de Luz / Tablero en cortocircuito',
                  desc: 'Electricista disponible de turno',
                },
                {
                  id: 'gasfiteria',
                  icon: 'plumbing',
                  label: 'Rotura de matriz o inundación de agua',
                  desc: 'Gasfíter con disponibilidad inmediata',
                },
                {
                  id: 'gas',
                  icon: 'detector_smoke',
                  label: 'Fuga de Gas urgente',
                  desc: 'Atención prioritaria inmediata',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedEmergency(opt.id)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    selectedEmergency === opt.id
                      ? 'border-[#ba1a1a] bg-[#ffdad6]/30 dark:bg-[#93000a]/20 shadow-sm'
                      : 'border-[#eaedff] dark:border-[#1e293b] hover:bg-[#eaedff]/40 dark:hover:bg-[#1e293b]/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px] text-[#ba1a1a]">
                    {opt.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[12px] text-[#001026] dark:text-white leading-tight">
                      {opt.label}
                    </p>
                    <p className="text-[10px] text-[#44474e] dark:text-[#94a3b8]">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleConfirmSOS}
              className="w-full h-12 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-[#ba1a1a]/30 active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">crisis_alert</span>
              <span>Confirmar solicitud urgente</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            {/* Live Countdown Circle */}
            <div className="relative w-32 h-32 my-3 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#ba1a1a]/20" />
              <div className="absolute inset-0 rounded-full border-4 border-[#ba1a1a] border-t-transparent animate-spin" />
              <div className="flex flex-col items-center">
                <span className="font-extrabold text-[28px] text-[#ba1a1a] tracking-tight leading-none">
                  {formatTimer(timeLeftSeconds)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#44474e] dark:text-[#94a3b8] mt-1">
                  En camino
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] font-bold text-[11px] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>Maestro asignado y notificado</span>
            </div>

            <h3 className="font-bold text-[18px] text-[#001026] dark:text-white">
              {assignedMaster.name}
            </h3>
            <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8] max-w-[260px] mt-0.5 mb-4">
              Distancia actual: {assignedMaster.distanceKm} km. Coordina detalles y costo por chat o
              llamada.
            </p>

            <div className="w-full grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  handleClose();
                  setActiveTab('chat');
                }}
                className="h-11 rounded-xl bg-[#006b5f] hover:bg-[#005047] text-white font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Chatear en ruta</span>
              </button>
              <button
                onClick={() => {
                  alert(`Llamando a ${assignedMaster.name} (${assignedMaster.phone})...`);
                }}
                className="h-11 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-white font-bold text-[12px] flex items-center justify-center gap-1.5 hover:bg-opacity-80 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Llamar SOS</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
