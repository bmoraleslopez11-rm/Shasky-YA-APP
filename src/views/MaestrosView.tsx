import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Maestro } from '../types';

export const MaestrosView: React.FC = () => {
  const { maestros, setSelectedMaestro, setActiveTab, addNotification } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'distance' | 'rating' | 'new'>('all');

  const handleOpenProfile = (m: Maestro) => {
    setSelectedMaestro(m);
    setActiveTab('mi-perfil');
  };

  const handleContactMaestro = (m: Maestro) => {
    setSelectedMaestro(m);
    setActiveTab('chat');
  };

  const handleRequestQuote = (m: Maestro) => {
    setSelectedMaestro(m);
    addNotification({
      title: `Cotización solicitada a ${m.name}`,
      body: `Diagnóstico estándar fijado en $${(m.diagnosticFee || 20000).toLocaleString('es-CL')}. Respuesta en ${m.responseTime}.`,
      icon: 'request_quote',
      type: 'quote',
      actionPath: 'chat',
    });
    setActiveTab('chat');
  };

  const filteredMaestros = maestros.filter((m) => {
    if (activeFilter === 'available') return m.availableStatus === 'ahora';
    if (activeFilter === 'distance') return m.distanceKm <= 2.5;
    if (activeFilter === 'rating') return m.rating >= 6.5;
    if (activeFilter === 'new') return m.isNewFairQuota || m.badgeType === 'nuevo';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-24 animate-fade-in max-w-2xl mx-auto">
      {/* Header */}
      <section className="px-4 pt-3">
        <div className="bg-[#ffffff] dark:bg-[#0b1320] p-4 rounded-2xl border border-[#eaedff] dark:border-[#1e293b] shadow-[0_2px_12px_rgba(11,37,69,0.04)] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex p-1.5 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] text-[#006b5f] dark:text-[#59dbc7]">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </span>
              <h2 className="font-bold text-[18px] text-[#001026] dark:text-white">
                Maestros disponibles
              </h2>
            </div>
          </div>

          <p className="text-[13px] text-[#44474e] dark:text-[#94a3b8] leading-snug">
            Primero aparecen los maestros mejor evaluados, disponibles y cerca de tu domicilio.
          </p>
        </div>
      </section>

      {/* Fairness Commitment Banner */}
      <section className="px-4 pt-3">
        <div className="relative overflow-hidden bg-[#0b2545] dark:bg-[#07172b] border border-[#1e3a5f] text-white p-3.5 rounded-2xl shadow-[0_4px_16px_rgba(11,37,69,0.08)] flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#006b5f] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">balance</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-bold text-[#79f7e3] uppercase tracking-wider">
                Nuevos maestros verificados
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#79f7e3] animate-pulse" />
            </div>
            <p className="text-[12px] text-[#eef0ff] leading-tight">
              Tambien mostramos perfiles nuevos que tengan identidad revisada, disponibilidad y buen
              tiempo de respuesta.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Filter Horizontal Carousel */}
      <section className="pt-3">
        <div className="flex gap-2 overflow-x-auto px-4 no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'Recomendados', icon: 'tune' },
            { id: 'available', label: 'Disponibles ya', icon: 'bolt' },
            { id: 'distance', label: 'Más cercanos', icon: 'near_me' },
            { id: 'rating', label: 'Mejor evaluados (6.5+)', icon: 'grade' },
            { id: 'new', label: 'Nuevos verificados', icon: 'new_releases' },
          ].map((chip) => {
            const isActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveFilter(chip.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-bold shrink-0 transition-all shadow-sm ${
                  isActive
                    ? 'bg-[#001026] dark:bg-[#006b5f] text-white'
                    : 'bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] text-[#44474e] dark:text-[#94a3b8] hover:text-[#001026] dark:hover:text-white'
                }`}
              >
                {chip.id === 'available' ? (
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                ) : (
                  <span className="material-symbols-outlined text-[16px]">{chip.icon}</span>
                )}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Quadrant Counter */}
      <div className="px-4 pt-3 flex items-center justify-between text-[#44474e] dark:text-[#94a3b8] text-[11px]">
        <span className="font-semibold text-[#001026] dark:text-white">
          {filteredMaestros.length} maestros cercanos
        </span>
        <span className="flex items-center gap-1 text-[#006b5f] dark:text-[#59dbc7] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          Santiago Oriente
        </span>
      </div>

      {/* Maestros Cards List matching mockup */}
      <section className="px-4 pt-2.5 flex flex-col gap-3.5">
        {filteredMaestros.map((m) => {
          const isTop = m.badgeType === 'top';
          const isNew = m.isNewFairQuota;

          return (
            <article
              key={m.id}
              className={`bg-[#ffffff] dark:bg-[#0b1320] rounded-2xl p-4 border border-[#eaedff] dark:border-[#1e293b] shadow-[0_2px_12px_rgba(11,37,69,0.06)] hover:shadow-lg transition-all flex flex-col gap-3 relative overflow-hidden`}
            >
              {/* Fair Quota Top Ribbon Indicator */}
              {isNew && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#006b5f] to-[#0284c7]" />
              )}

              {/* Top Meta Row */}
              <div className="flex items-start gap-3">
                <div
                  className="relative shrink-0 cursor-pointer"
                  onClick={() => handleOpenProfile(m)}
                >
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#eaedff] dark:ring-[#1e293b]"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white shadow-sm ${
                      isNew ? 'bg-[#10B981]' : 'bg-[#006b5f]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {isNew ? 'shield' : 'verified'}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3
                      onClick={() => handleOpenProfile(m)}
                      className="font-bold text-[17px] text-[#001026] dark:text-white truncate leading-tight cursor-pointer hover:underline"
                    >
                      {m.name}
                    </h3>
                    {m.badge && (
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          isTop
                            ? 'bg-[#76f4e0]/30 text-[#006f63] dark:text-[#59dbc7]'
                            : isNew
                            ? 'bg-[#e2e7ff] dark:bg-[#1e293b] text-[#006b5f] dark:text-[#59dbc7]'
                            : 'bg-[#eaedff] dark:bg-[#1e293b] text-[#44474e] dark:text-[#94a3b8]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {isTop ? 'workspace_premium' : 'verified_user'}
                        </span>
                        {m.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8] truncate mt-0.5">
                    {m.trade}
                  </p>

                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {/* Chilean Score Pill */}
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#e6f4f1] dark:bg-[#006b5f]/20 text-[#006b5f] dark:text-[#59dbc7] font-bold text-[13px] font-mono">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span>{m.rating.toFixed(1)}</span>
                      <span className="text-[10px] opacity-75 font-normal">/ 7.0</span>
                    </div>
                    <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">
                      ({m.reviewCount} evaluaciones)
                    </span>
                    {isNew && (
                      <span className="text-[10px] font-semibold text-[#006b5f] dark:text-[#59dbc7] bg-[#e6f4f1] dark:bg-[#1e293b] px-1.5 py-0.5 rounded">
                        Nuevo verificado
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Verification Micro Info for New Fair-Quota Masters */}
              {isNew && (
                <div className="bg-[#f2f3ff] dark:bg-[#1e293b]/60 p-2 rounded-xl flex items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#44474e] dark:text-[#94a3b8]">
                    <span className="material-symbols-outlined text-[16px] text-[#006b5f] dark:text-[#59dbc7]">
                      id_card
                    </span>
                    <span>Identidad y perfil revisados</span>
                  </div>
                  <span className="font-bold text-[#001026] dark:text-white">Nuevo en la zona</span>
                </div>
              )}

              {/* Tactical Micro Metrics Badges */}
              <div className="grid grid-cols-3 gap-1.5 text-center bg-[#f2f3ff] dark:bg-[#1e293b]/50 rounded-xl p-2 text-[11px]">
                <div className="flex flex-col">
                  <span className="text-[#44474e] dark:text-[#94a3b8]">Disponibilidad</span>
                  <span
                    className={`inline-flex items-center justify-center gap-1 font-bold ${
                      m.availableStatus === 'ahora'
                        ? 'text-[#10B981]'
                        : 'text-[#0284c7] dark:text-[#93ccff]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        m.availableStatus === 'ahora' ? 'bg-[#10B981]' : 'bg-[#0284c7]'
                      }`}
                    />
                    {m.availableText}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[#44474e] dark:text-[#94a3b8]">Distancia</span>
                  <span className="font-bold text-[#001026] dark:text-white flex items-center justify-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px] text-[#44474e] dark:text-[#94a3b8]">
                      near_me
                    </span>
                    {m.distanceKm} km
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[#44474e] dark:text-[#94a3b8]">Respuesta</span>
                  <span className="font-bold text-[#001026] dark:text-white">
                    {m.responseTime}
                  </span>
                </div>
              </div>

              {/* Specialty & Pricing Line */}
              <div className="flex items-center justify-between px-1 text-[12px] text-[#44474e] dark:text-[#94a3b8]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-[16px] text-[#006b5f] dark:text-[#59dbc7] shrink-0">
                    {m.diagnosticFee ? 'payments' : 'handyman'}
                  </span>
                  {m.diagnosticFee ? (
                    <span className="truncate">
                      Visita de diagnóstico:{' '}
                      <strong className="text-[#001026] dark:text-white font-bold font-mono">
                        ${m.diagnosticFee.toLocaleString('es-CL')}
                      </strong>
                    </span>
                  ) : (
                    <span className="truncate">{m.specialtyTag}</span>
                  )}
                </div>
                {m.guaranteeDays && (
                  <span className="text-[10px] font-bold text-[#006b5f] dark:text-[#59dbc7] bg-[#eaedff] dark:bg-[#1e293b] px-2 py-0.5 rounded shrink-0">
                    Garantía maestro {m.guaranteeDays} días
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenProfile(m)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-white font-bold text-[12px] hover:bg-[#e2e7ff] transition-all text-center"
                >
                  Ver Perfil
                </button>
                <button
                  type="button"
                  onClick={() => (m.diagnosticFee ? handleRequestQuote(m) : handleContactMaestro(m))}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#006b5f] hover:bg-[#005047] text-white font-bold text-[12px] shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isNew ? 'handyman' : 'chat'}
                  </span>
                  <span>{isNew ? 'Contactar' : m.diagnosticFee ? 'Pedir Cotización' : 'Contactar'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Trust Footer Card */}
      <section className="px-4 pt-6">
        <div className="p-4 rounded-2xl bg-[#f2f3ff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#eaedff] dark:bg-[#1e293b] flex items-center justify-center text-[#001026] dark:text-white">
            <span className="material-symbols-outlined text-[22px]">gavel</span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-[15px] text-[#001026] dark:text-white">
              Como aparecen primero
            </h4>
            <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8] max-w-xs mt-0.5">
              Ningún maestro aparece primero solo por pagar. Priorizamos buenas evaluaciones,
              disponibilidad, cercanía y cumplimiento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
