import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const VideoDiagnosticModal: React.FC = () => {
  const { isVideoModalOpen, setIsVideoModalOpen, selectedMaestro, addNotification } = useApp();
  const [isMuted, setIsMuted] = useState(false);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'back' | 'front'>('back');

  if (!isVideoModalOpen) return null;

  const handleEndCall = () => {
    setIsVideoModalOpen(false);
    addNotification({
      title: 'Diagnóstico en vivo finalizado',
      body: `Videollamada completada con ${selectedMaestro.name}. El resumen quedó en el chat.`,
      icon: 'videocam',
      type: 'chat',
      actionPath: 'chat',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in p-2 sm:p-4">
      <div className="w-full max-w-md h-[85vh] max-h-[720px] bg-[#070d18] rounded-3xl overflow-hidden shadow-2xl flex flex-col relative border border-[#1e293b]">
        {/* Main Camera View */}
        <div className="relative flex-1 bg-[#10192a] overflow-hidden flex items-center justify-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX4YemX-W6wxmElDx83sEal5Ydj8ZTAQci2C-PMrQgmw3FO72b8Bvtt00COTK8CwST2K_2aH0QB_BTZzV_kn-uUBOJ0619_aOt3HJn-jXyz6kypwbkXk1MLpDeb5Z2trgM-fmCfR4ibkGz-bLVAPwUTM1erRzoNHb5HbOckkFs4JQI7Nhl3Jp7QZKwwDmTjhn2iRncaTJkI0lNJgADDFSVhqtQFRcdGuEddUvOf-AWb_HM3I44k5rG"
            alt="Inspección en vivo"
            className={`w-full h-full object-cover transition-all duration-300 ${
              flashlightOn ? 'brightness-125 contrast-110' : 'brightness-90'
            }`}
          />

          {/* Camera focus overlay */}
          <div className="absolute inset-0 pointer-events-none border-2 border-white/20 m-4 rounded-2xl flex flex-col justify-between p-4">
            <div className="flex justify-between items-start">
              <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  EN VIVO
                </span>
              </div>
              <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-mono">
                02:18
              </div>
            </div>

            {/* Target Reticle */}
            <div className="self-center flex flex-col items-center">
              <div className="w-24 h-24 border border-dashed border-[#59dbc7] rounded-xl flex items-center justify-center animate-pulse">
                <span className="material-symbols-outlined text-[#59dbc7] text-[28px] opacity-75">
                  center_focus_strong
                </span>
              </div>
              <span className="text-[10px] text-white/90 bg-black/50 px-2 py-0.5 rounded mt-1 font-mono">
                Zona a revisar
              </span>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-[10px] text-white/80 bg-black/60 px-2 py-1 rounded">
                Videollamada activa
              </span>
            </div>
          </div>

          {/* Picture in Picture */}
          <div className="absolute top-4 right-4 w-24 h-32 rounded-2xl overflow-hidden border-2 border-[#59dbc7] shadow-xl bg-[#0b1320] z-20">
            <img
              src={selectedMaestro.avatar}
              alt={selectedMaestro.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/60 to-transparent p-1 text-center">
              <span className="text-[9px] font-bold text-white block truncate">
                {selectedMaestro.name}
              </span>
              <div className="flex items-center justify-center gap-0.5 mt-0.5">
                <span className="w-1 h-2 bg-[#59dbc7] animate-bounce" />
                <span className="w-1 h-3 bg-[#59dbc7] animate-bounce [animation-delay:0.1s]" />
                <span className="w-1 h-1 bg-[#59dbc7] animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Audio Dialogue Transcript Ribbon */}
        <div className="bg-[#0b1320] px-4 py-2 text-center border-t border-[#1e293b]">
          <p className="text-[12px] text-[#93ccff] italic leading-tight">
            “{selectedMaestro.name}: ‘Con esa imagen puedo estimar mejor los materiales y confirmar
            el valor antes de ir.’”
          </p>
        </div>

        {/* Diagnostic Control Bar */}
        <div className="bg-[#070d18] p-4 flex items-center justify-around gap-2 pb-safe">
          <button
            onClick={() => setFlashlightOn(!flashlightOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              flashlightOn
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/40'
                : 'bg-[#1e293b] text-white hover:bg-[#334155]'
            }`}
            title="Encender Linterna"
          >
            <span className="material-symbols-outlined text-[22px]">flashlight_on</span>
          </button>

          <button
            onClick={() => setCameraFacing(cameraFacing === 'back' ? 'front' : 'back')}
            className="w-12 h-12 rounded-full bg-[#1e293b] text-white hover:bg-[#334155] flex items-center justify-center transition-all"
            title="Girar Cámara"
          >
            <span className="material-symbols-outlined text-[22px]">flip_camera_ios</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMuted ? 'bg-[#ba1a1a] text-white' : 'bg-[#1e293b] text-white hover:bg-[#334155]'
            }`}
            title={isMuted ? 'Desmutear' : 'Mutear'}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          <button
            onClick={handleEndCall}
            className="w-14 h-14 rounded-full bg-[#ba1a1a] hover:bg-[#93000a] text-white flex items-center justify-center shadow-lg shadow-red-500/30 active:scale-95 transition-all"
            title="Finalizar Diagnóstico"
          >
            <span className="material-symbols-outlined text-[26px]">call_end</span>
          </button>
        </div>
      </div>
    </div>
  );
};
