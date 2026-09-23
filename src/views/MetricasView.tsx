import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const MetricasView: React.FC = () => {
  const { addNotification, triggerCloudSync } = useApp();

  const [availabilityState, setAvailabilityState] = useState<'ahora' | 'hoy' | '24h'>('ahora');
  const [coverageRadiusKm, setCoverageRadiusKm] = useState(15);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Dynamic score based on availability
  const availabilityPoints =
    availabilityState === 'ahora' ? 100 : availabilityState === 'hoy' ? 75 : 50;

  // Global score calculation: 0.45*96 + 0.30*availabilityPoints + 0.10*85 + 0.10*100 + 0.05*100
  const globalScore = Math.round(
    0.45 * 96 + 0.3 * availabilityPoints + 0.1 * 85 + 0.1 * 100 + 0.05 * 100
  );

  const handleStateChange = (st: 'ahora' | 'hoy' | '24h') => {
    setAvailabilityState(st);
    addNotification({
      title: 'Disponibilidad actualizada',
      body: `Estado cambiado a "${st === 'ahora' ? 'Disponible ahora' : st === 'hoy' ? 'Disponible hoy' : 'Disponible en 24 h'}".`,
      icon: 'speed',
      type: 'quote',
    });
    triggerCloudSync();
  };

  return (
    <div className="flex flex-col w-full pb-24 animate-fade-in max-w-2xl mx-auto px-4 py-3 gap-4">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-[#eaedff] dark:bg-[#1e293b] text-[#006b5f] dark:text-[#59dbc7] text-[11px] font-bold">
          <span className="material-symbols-outlined text-[14px]">verified</span>
          Panel Maestro Certificado
        </div>
        <h1 className="font-bold text-[22px] text-[#001026] dark:text-white tracking-tight leading-tight mt-1">
          Tu actividad como maestro
        </h1>
        <p className="text-[13px] text-[#44474e] dark:text-[#94a3b8]">
          Revisa tu disponibilidad, radio de atención, respuesta y evaluaciones.
        </p>
      </div>

      {/* Main Score Card */}
      <div className="bg-[#ffffff] dark:bg-[#0b1320] rounded-2xl p-4 border border-[#eaedff] dark:border-[#1e293b] shadow-md flex flex-col gap-3 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#44474e] dark:text-[#94a3b8]">
              Estado general del perfil
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[36px] font-extrabold text-[#001026] dark:text-white font-mono leading-none">
                {globalScore}
              </span>
              <span className="text-[16px] text-[#44474e] dark:text-[#94a3b8] font-bold">/ 100</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#76f4e0]/30 text-[#006f63] dark:text-[#59dbc7] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              Prioridad Máxima
            </span>
            <span className="text-[10px] text-[#44474e] dark:text-[#94a3b8] mt-1">
              Buen desempeño
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-[#eaedff] dark:bg-[#1e293b] rounded-full h-3 overflow-hidden p-0.5">
          <div
            className="bg-[#006b5f] dark:bg-[#00a896] h-full rounded-full transition-all duration-700"
            style={{ width: `${globalScore}%` }}
          />
        </div>

        {/* Key Factor Bars Breakdown */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-[12px] font-bold text-[#001026] dark:text-white">
            Señales que mejoran tu perfil
          </span>

          {/* Factor R */}
          <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[#f2f3ff] dark:bg-[#132238]">
            <div className="flex justify-between items-center text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#001026] dark:text-white">Reputación General</span>
                <span className="px-1.5 py-0.2 rounded bg-[#eaedff] dark:bg-[#1e293b] text-[10px] text-[#44474e] dark:text-[#94a3b8] font-mono">
                  Principal
                </span>
              </div>
              <span className="font-mono font-bold text-[#006b5f] dark:text-[#59dbc7]">Alta</span>
            </div>
            <div className="w-full bg-[#eaedff] dark:bg-[#1e293b] rounded-full h-2 overflow-hidden">
              <div className="bg-[#006b5f] h-full rounded-full w-[96%]" />
            </div>
          </div>

          {/* Factor D */}
          <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[#f2f3ff] dark:bg-[#132238]">
            <div className="flex justify-between items-center text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#001026] dark:text-white">
                  Disponibilidad y Respuesta
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#eaedff] dark:bg-[#1e293b] text-[10px] text-[#44474e] dark:text-[#94a3b8] font-mono">
                  Importante
                </span>
              </div>
              <span className="font-mono font-bold text-[#006b5f] dark:text-[#59dbc7]">
                {availabilityState === 'ahora' ? 'Alta' : availabilityState === 'hoy' ? 'Media' : 'Programada'}
              </span>
            </div>
            <div className="w-full bg-[#eaedff] dark:bg-[#1e293b] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#006b5f] h-full rounded-full transition-all duration-500"
                style={{ width: `${availabilityPoints}%` }}
              />
            </div>
          </div>

          {/* Factor C */}
          <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[#f2f3ff] dark:bg-[#132238]">
            <div className="flex justify-between items-center text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#001026] dark:text-white">Cercanía a Clientes</span>
                <span className="px-1.5 py-0.2 rounded bg-[#eaedff] dark:bg-[#1e293b] text-[10px] text-[#44474e] dark:text-[#94a3b8] font-mono">
                  Zona
                </span>
              </div>
              <span className="font-mono font-bold text-[#0b2545] dark:text-[#93ccff]">Cercano</span>
            </div>
            <div className="w-full bg-[#eaedff] dark:bg-[#1e293b] rounded-full h-2 overflow-hidden">
              <div className="bg-[#0b2545] dark:bg-[#0284c7] h-full rounded-full w-[85%]" />
            </div>
            <span className="text-[10px] text-[#44474e] dark:text-[#94a3b8]">
              Radio de servicio activo: {coverageRadiusKm} km en Santiago Oriente
            </span>
          </div>

          {/* Factor P */}
          <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[#f2f3ff] dark:bg-[#132238]">
            <div className="flex justify-between items-center text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#001026] dark:text-white">
                  Perfil y Verificación
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#eaedff] dark:bg-[#1e293b] text-[10px] text-[#44474e] dark:text-[#94a3b8] font-mono">
                  Completo
                </span>
              </div>
              <span className="font-mono font-bold text-[#006b5f] dark:text-[#59dbc7]">
                100 <span className="text-[#44474e] dark:text-[#94a3b8] font-normal">/ 100</span>
              </span>
            </div>
            <div className="w-full bg-[#eaedff] dark:bg-[#1e293b] rounded-full h-2 overflow-hidden">
              <div className="bg-[#006b5f] h-full rounded-full w-full" />
            </div>
            <span className="text-[10px] text-[#006b5f] dark:text-[#59dbc7] font-semibold">
              Antecedentes validados y documentos tributarios al día
            </span>
          </div>

          {/* Factor E */}
          <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[#f2f3ff] dark:bg-[#132238]">
            <div className="flex justify-between items-center text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#001026] dark:text-white">
                  Especialidad Certificada
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#eaedff] dark:bg-[#1e293b] text-[10px] text-[#44474e] dark:text-[#94a3b8] font-mono">
                  Oficio
                </span>
              </div>
              <span className="font-mono font-bold text-[#006b5f] dark:text-[#59dbc7]">
                100 <span className="text-[#44474e] dark:text-[#94a3b8] font-normal">/ 100</span>
              </span>
            </div>
            <div className="w-full bg-[#eaedff] dark:bg-[#1e293b] rounded-full h-2 overflow-hidden">
              <div className="bg-[#006b5f] h-full rounded-full w-full" />
            </div>
            <span className="text-[10px] text-[#44474e] dark:text-[#94a3b8]">
              Oficio declarado y perfil revisado
            </span>
          </div>
        </div>
      </div>

      {/* Sección Desglose de Reputación Interna (R) matching mockup */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#0b2545] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div>
            <h2 className="font-bold text-[16px] text-[#001026] dark:text-white">
              Desglose de Reputación
            </h2>
            <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">
              Factores que construyen tu prestigio en la plataforma
            </span>
          </div>
        </div>

        <div className="bg-[#001026] dark:bg-[#071324] border border-[#1e293b] text-white rounded-2xl p-4 shadow-md flex flex-col gap-2">
          <div className="grid grid-cols-1 gap-2">
            {/* N: Nota Clientes */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[13px] text-white">Nota de Clientes</span>
                  <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-[#79f7e3] font-semibold">
                    Principal
                  </span>
                </div>
                <span className="text-[11px] text-[#778db2]">Promedio escala 1.0 a 7.0 chilena</span>
              </div>
              <div className="text-right">
                <span className="text-[20px] font-extrabold text-[#79f7e3] font-mono">6.8</span>
                <div className="text-[10px] text-[#778db2]">Muy buena</div>
              </div>
            </div>

            {/* V: Volumen */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[13px] text-white">Volumen de Reseñas</span>
                  <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-[#79f7e3] font-semibold">
                    Historial
                  </span>
                </div>
                <span className="text-[11px] text-[#778db2]">Tramo superior (≥ 31 evaluaciones)</span>
              </div>
              <div className="text-right">
                <span className="text-[18px] font-bold text-white font-mono">38</span>
                <div className="text-[10px] text-[#79f7e3] font-semibold">Alto</div>
              </div>
            </div>

            {/* A: Actividad Reciente */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[13px] text-white">Actividad Reciente</span>
                  <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-[#79f7e3] font-semibold">
                    Reciente
                  </span>
                </div>
                <span className="text-[11px] text-[#778db2]">3 trabajos completados esta semana</span>
              </div>
              <div className="text-right">
                <span className="text-[18px] font-bold text-white font-mono">90</span>
                <div className="text-[10px] text-[#778db2]">Muy activo</div>
              </div>
            </div>

            {/* K: Cumplimiento */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[13px] text-white">Cumplimiento y Puntualidad</span>
                  <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-[#79f7e3] font-semibold">
                    Constancia
                  </span>
                </div>
                <span className="text-[11px] text-[#778db2]">0 cancelaciones • 100% asistencia</span>
              </div>
              <div className="text-right">
                <span className="text-[18px] font-bold text-white font-mono">100</span>
                <div className="text-[10px] text-[#79f7e3] font-semibold">Excelente</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Disponibilidad y Tiempo de Respuesta (D) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] text-[#006b5f] dark:text-[#59dbc7] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">speed</span>
          </div>
          <div>
            <h2 className="font-bold text-[16px] text-[#001026] dark:text-white">
              Disponibilidad y Tiempo de Respuesta
            </h2>
            <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">
              Controla tu estado en tiempo real
            </span>
          </div>
        </div>

        <div className="bg-[#ffffff] dark:bg-[#0b1320] rounded-2xl p-4 border border-[#eaedff] dark:border-[#1e293b] shadow-md flex flex-col gap-3">
          {/* Selector Interactivo de Estado */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#001026] dark:text-white">
              Tu Estado Actual:
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#eaedff] dark:bg-[#1e293b] rounded-xl">
              <button
                type="button"
                onClick={() => handleStateChange('ahora')}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-center transition-all ${
                  availabilityState === 'ahora'
                    ? 'bg-[#006b5f] text-white shadow-sm font-bold'
                    : 'text-[#44474e] dark:text-[#94a3b8] hover:text-[#001026] dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#79f7e3] animate-ping" />
                  <span className="text-[12px]">Ahora</span>
                </div>
                <span className="text-[10px] opacity-90">Mayor alcance</span>
              </button>

              <button
                type="button"
                onClick={() => handleStateChange('hoy')}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-center transition-all ${
                  availabilityState === 'hoy'
                    ? 'bg-[#006b5f] text-white shadow-sm font-bold'
                    : 'text-[#44474e] dark:text-[#94a3b8] hover:text-[#001026] dark:hover:text-white'
                }`}
              >
                <span className="text-[12px]">Hoy</span>
                <span className="text-[10px] opacity-90">Buen alcance</span>
              </button>

              <button
                type="button"
                onClick={() => handleStateChange('24h')}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-center transition-all ${
                  availabilityState === '24h'
                    ? 'bg-[#006b5f] text-white shadow-sm font-bold'
                    : 'text-[#44474e] dark:text-[#94a3b8] hover:text-[#001026] dark:hover:text-white'
                }`}
              >
                <span className="text-[12px]">En 24h</span>
                <span className="text-[10px] opacity-90">Programado</span>
              </button>
            </div>
          </div>

          {/* Métrica de Velocidad Real */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] dark:bg-[#132238]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#76f4e0]/30 text-[#006f63] dark:text-[#59dbc7] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[13px] text-[#001026] dark:text-white">
                  Tiempo de Respuesta Promedio
                </span>
                <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">
                  Rango óptimo: 0 a 5 minutos
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[18px] font-bold text-[#006b5f] dark:text-[#59dbc7] font-mono">
                3.5 min
              </span>
              <span className="block text-[10px] text-[#006b5f] dark:text-[#59dbc7] font-semibold">
                Respuesta rápida
              </span>
            </div>
          </div>

          {/* Tarjeta de Consejos */}
          <div className="p-3 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] flex gap-2.5 items-start">
            <span className="material-symbols-outlined text-[20px] text-[#006b5f] dark:text-[#59dbc7] shrink-0 mt-0.5">
              tips_and_updates
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-[12px] text-[#001026] dark:text-white">
                Consejo Shasky
              </span>
              <p className="text-[11px] text-[#44474e] dark:text-[#94a3b8] mt-0.5">
                Responde antes de 15 minutos dentro de tu horario configurado para evitar
                penalizaciones temporales en el mapa en vivo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de Parámetros de Cobertura */}
      <div className="pt-1 pb-4">
        <button
          type="button"
          onClick={() => setShowConfigModal(true)}
          className="w-full py-3 px-4 rounded-xl bg-[#0b2545] hover:bg-[#001026] dark:bg-[#006b5f] text-white font-bold text-[14px] shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span>Ajustar Parámetros de Cobertura</span>
        </button>
      </div>

      {/* Modal para Ajustar Parámetros */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#ffffff] dark:bg-[#0f172a] rounded-2xl p-5 border border-[#eaedff] dark:border-[#1e293b] shadow-2xl flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[16px] text-[#001026] dark:text-white">
                Parámetros de Cobertura GPS
              </h3>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-[#44474e] hover:text-[#ba1a1a]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[12px]">
                <span className="text-[#44474e] dark:text-[#94a3b8]">Radio de Cobertura</span>
                <span className="font-bold text-[#006b5f] dark:text-[#59dbc7]">
                  {coverageRadiusKm} km
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="30"
                value={coverageRadiusKm}
                onChange={(e) => setCoverageRadiusKm(parseInt(e.target.value))}
                className="accent-[#006b5f]"
              />
            </div>

            <button
              onClick={() => {
                setShowConfigModal(false);
                addNotification({
                  title: 'Radio de Cobertura Actualizado',
                  body: `Nuevo radio activo: ${coverageRadiusKm} km en Santiago Oriente.`,
                  icon: 'tune',
                  type: 'quote',
                });
                triggerCloudSync();
              }}
              className="w-full h-11 rounded-xl bg-[#006b5f] text-white font-bold text-[13px] mt-2"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
