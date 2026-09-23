import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Maestro } from '../types';

type CategoryId = 'gasfiteria' | 'electricidad' | 'albanileria' | 'pintura' | 'carpinteria';

const categories: { id: CategoryId; label: string; icon: string; terms: string[] }[] = [
  {
    id: 'gasfiteria',
    label: 'Gasfiteria',
    icon: 'plumbing',
    terms: ['gasfiter', 'fuga', 'filtracion', 'destape', 'bano', 'calefon'],
  },
  {
    id: 'electricidad',
    label: 'Electricidad',
    icon: 'bolt',
    terms: ['electric', 'tablero', 'enchufe', 'sec', 'sobrecarga'],
  },
  {
    id: 'albanileria',
    label: 'Albanileria',
    icon: 'handyman',
    terms: ['albanil', 'radier', 'muro', 'tabiqueria', 'estructura'],
  },
  {
    id: 'pintura',
    label: 'Pintura',
    icon: 'format_paint',
    terms: ['pintor', 'pintura', 'latex', 'esmalte', 'terminacion'],
  },
  {
    id: 'carpinteria',
    label: 'Carpinteria',
    icon: 'carpenter',
    terms: ['carpinter', 'mueble', 'puerta', 'closet', 'madera'],
  },
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const ExplorarView: React.FC = () => {
  const { maestros, setSelectedMaestro, setActiveTab, setIsSOSModalOpen, addNotification } =
    useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('gasfiteria');
  const [selectedRadius, setSelectedRadius] = useState<3 | 8 | 15>(8);
  const [isLayerSatellite, setIsLayerSatellite] = useState(false);
  const [activePinMaestro, setActivePinMaestro] = useState<Maestro | null>(null);
  const [filterRatingMin, setFilterRatingMin] = useState(5.5);

  const activeCategoryData = categories.find((cat) => cat.id === activeCategory) || categories[0];

  const filteredMaestros = useMemo(() => {
    const query = normalize(searchQuery);
    return maestros
      .filter((m) => {
        const searchable = normalize(`${m.name} ${m.trade} ${m.specialtyTag}`);
        const matchesCategory = activeCategoryData.terms.some((term) => searchable.includes(term));
        const matchesQuery = !query || searchable.includes(query);
        const matchesRating = m.rating >= filterRatingMin;
        const matchesRadius = m.distanceKm <= selectedRadius;
        return matchesCategory && matchesQuery && matchesRating && matchesRadius;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [activeCategoryData, filterRatingMin, maestros, searchQuery, selectedRadius]);

  const recommendedMaestros = filteredMaestros.length > 0 ? filteredMaestros : maestros.slice(0, 3);

  const handleOpenChatWith = (m: Maestro) => {
    setSelectedMaestro(m);
    setActiveTab('chat');
  };

  const handleOpenProfile = (m: Maestro) => {
    setSelectedMaestro(m);
    setActiveTab('mi-perfil');
  };

  const handleCall = (m: Maestro) => {
    alert(`Llamando a ${m.name} (${m.phone})`);
  };

  return (
    <div className="flex flex-col w-full pb-24 animate-fade-in max-w-2xl mx-auto">
      <section className="px-4 pt-3 pb-2 flex flex-col gap-3">
        <div className="rounded-2xl bg-[#001026] dark:bg-[#071324] text-white p-4 shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#79f7e3]">
                Shasky Ya cerca de ti
              </p>
              <h1 className="text-[21px] font-extrabold leading-tight mt-1">
                Encuentra un maestro para tu casa hoy
              </h1>
              <p className="text-[13px] text-[#dbe7ff] mt-2 leading-snug">
                Busca por oficio, revisa valoraciones y coordina llamada o chat antes de aceptar una
                visita.
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px] text-[#79f7e3]">
                home_repair_service
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-[#44474e] dark:text-[#94a3b8] pointer-events-none text-[22px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ej: filtracion de bano, enchufe, pintura..."
            className="w-full h-12 pl-11 pr-10 rounded-2xl bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] shadow-[0_2px_12px_rgba(11,37,69,0.06)] text-[#001026] dark:text-white text-[14px] placeholder:text-[#44474e]/70 dark:placeholder:text-[#94a3b8]/70 focus:outline-none focus:ring-2 focus:ring-[#006b5f] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 w-8 h-8 rounded-full flex items-center justify-center text-[#44474e] hover:text-[#ba1a1a] hover:bg-[#eaedff]"
              title="Limpiar busqueda"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-bold shrink-0 transition-all active:scale-95 shadow-sm ${
                  isActive
                    ? 'bg-[#001026] dark:bg-[#006b5f] text-white'
                    : 'bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] text-[#001026] dark:text-[#eef0ff] hover:bg-[#eaedff] dark:hover:bg-[#1e293b]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isActive ? 'text-[#79f7e3]' : 'text-[#006b5f] dark:text-[#59dbc7]'
                  }`}
                >
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
          <label className="flex flex-col gap-1 bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] rounded-2xl px-3 py-2 shadow-sm">
            <span className="text-[11px] font-bold text-[#44474e] dark:text-[#94a3b8]">
              Nota minima
            </span>
            <input
              type="range"
              min="5.0"
              max="7.0"
              step="0.1"
              value={filterRatingMin}
              onChange={(e) => setFilterRatingMin(parseFloat(e.target.value))}
              className="w-full accent-[#006b5f]"
            />
          </label>
          <div className="h-full min-w-[74px] bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] rounded-2xl px-3 py-2 shadow-sm flex flex-col justify-center text-right">
            <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8] font-bold">Desde</span>
            <span className="text-[16px] font-extrabold text-[#006b5f] dark:text-[#59dbc7] font-mono">
              {filterRatingMin.toFixed(1)}
            </span>
          </div>
        </div>
      </section>

      <section className="relative w-full h-[320px] px-4 mt-1">
        <div
          className={`w-full h-full rounded-2xl bg-cover bg-center overflow-hidden relative shadow-md transition-all duration-500 border border-[#eaedff] dark:border-[#1e293b] ${
            isLayerSatellite ? 'contrast-125' : ''
          }`}
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBt5aouXueXl2ozouqL4Rb9laM8ERMPzBPDH-xgDO3LIJG9dDM6BVFF719UGTLwWpy5aRtPoZqtId8zL3H4aGK7-HO92yz4CxIYdZ2aY-RaCokNnN8-WrCxDoMi_wEd1yHSjAcVt4RHtOGaD01ilzSNcNqXXwE_bySgT7apuUtcQfH6gJXKOHEQ1lNpr-Nciz0uD5klyKqac6YV3V28LE3bMrwBgzSTyAb4w5yxIq7UZ8EME92Azg3H')`,
          }}
        >
          <div className="absolute inset-0 bg-[#001026]/15 dark:bg-[#070d18]/45 pointer-events-none" />

          <div className="absolute top-3 left-3 bg-[#ffffff]/90 dark:bg-[#0b1320]/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-white/40 dark:border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#006b5f] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#006b5f] -ml-3.5" />
            <span className="text-[11px] font-bold text-[#001026] dark:text-white uppercase tracking-wider">
              Radio: {selectedRadius} km
            </span>
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            <button
              type="button"
              onClick={() => {
                addNotification({
                  title: 'Ubicacion actualizada',
                  body: 'Busqueda centrada en Providencia, Santiago Oriente.',
                  icon: 'my_location',
                  type: 'quote',
                });
              }}
              className="w-9 h-9 rounded-xl bg-[#ffffff]/95 dark:bg-[#0b1320]/95 backdrop-blur-md shadow-sm flex items-center justify-center text-[#001026] dark:text-white hover:bg-[#eaedff] transition-transform active:scale-90 border border-white/30"
              title="Mi ubicacion actual"
            >
              <span className="material-symbols-outlined text-[20px]">my_location</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLayerSatellite(!isLayerSatellite)}
              className={`w-9 h-9 rounded-xl backdrop-blur-md shadow-sm flex items-center justify-center transition-transform active:scale-90 border border-white/30 ${
                isLayerSatellite
                  ? 'bg-[#006b5f] text-white'
                  : 'bg-[#ffffff]/95 dark:bg-[#0b1320]/95 text-[#001026] dark:text-white'
              }`}
              title="Cambiar capa del mapa"
            >
              <span className="material-symbols-outlined text-[20px]">layers</span>
            </button>
          </div>

          {recommendedMaestros.slice(0, 4).map((m, idx) => (
            <button
              key={m.id}
              type="button"
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
              style={{ left: `${m.coordinates.x}%`, top: `${m.coordinates.y}%` }}
              onClick={() => setActivePinMaestro(m)}
              title={`Ver ${m.name}`}
            >
              <div
                className={`text-white px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 group-hover:scale-110 transition-transform ${
                  idx === 0 ? 'bg-[#001026]' : 'bg-[#006b5f]'
                }`}
              >
                {m.isNewFairQuota && <span className="text-[10px] font-bold uppercase">Nuevo</span>}
                <span className="text-[12px] font-extrabold leading-tight">{m.rating.toFixed(1)} ★</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white p-0.5 shadow-md -mt-1 ring-2 ring-[#001026]">
                <img src={m.avatar} alt={m.name} className="w-full h-full rounded-full object-cover" />
              </div>
            </button>
          ))}

          {activePinMaestro && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] p-3 rounded-2xl shadow-xl flex items-center gap-3 w-[280px] animate-fade-in">
              <img
                src={activePinMaestro.avatar}
                alt={activePinMaestro.name}
                className="w-11 h-11 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[13px] text-[#001026] dark:text-white truncate">
                  {activePinMaestro.name}
                </h4>
                <p className="text-[11px] text-[#006b5f] dark:text-[#59dbc7] font-semibold truncate">
                  {activePinMaestro.trade}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => handleOpenProfile(activePinMaestro)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-white"
                  >
                    Perfil
                  </button>
                  <button
                    onClick={() => handleOpenChatWith(activePinMaestro)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#006b5f] text-white"
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => handleCall(activePinMaestro)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#001026] text-white"
                  >
                    Llamar
                  </button>
                </div>
              </div>
              <button
                onClick={() => setActivePinMaestro(null)}
                className="text-[#44474e] hover:text-[#ba1a1a] p-1 self-start"
                title="Cerrar"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          )}

          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-auto z-10">
            <div className="bg-[#ffffff]/90 dark:bg-[#0b1320]/90 backdrop-blur-md p-1 rounded-xl shadow-sm flex items-center gap-1 border border-white/40 dark:border-white/10">
              {[3, 8, 15].map((radius) => (
                <button
                  key={radius}
                  type="button"
                  onClick={() => setSelectedRadius(radius as 3 | 8 | 15)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    selectedRadius === radius
                      ? 'text-white bg-[#001026] dark:bg-[#006b5f]'
                      : 'text-[#001026] dark:text-white hover:bg-[#eaedff]'
                  }`}
                >
                  {radius} km
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('maestros')}
              className="bg-[#ffffff]/90 dark:bg-[#0b1320]/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm text-[11px] font-bold text-[#001026] dark:text-white flex items-center gap-1 hover:bg-[#eaedff] border border-white/40 dark:border-white/10"
            >
              <span className="material-symbols-outlined text-[16px]">list</span>
              <span>Ver lista</span>
            </button>
          </div>
        </div>
      </section>

      <section className="mt-4 px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006b5f] dark:text-[#59dbc7] text-[18px]">
                verified_user
              </span>
              <h2 className="font-bold text-[18px] text-[#001026] dark:text-white">
                Maestros cerca para {activeCategoryData.label.toLowerCase()}
              </h2>
            </div>
            <span className="text-[12px] text-[#44474e] dark:text-[#94a3b8]">
              Ordenados por valoraciones, disponibilidad y cercania.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('maestros')}
            className="text-[13px] font-bold text-[#006b5f] dark:text-[#59dbc7] hover:underline flex items-center"
          >
            Ver todos
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {recommendedMaestros.slice(0, 3).map((m) => (
            <article
              key={m.id}
              className="w-full bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] rounded-2xl p-4 shadow-[0_4px_16px_rgba(11,37,69,0.06)] flex flex-col gap-3 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <button className="relative shrink-0" onClick={() => handleOpenProfile(m)} title="Ver perfil">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-14 h-14 rounded-2xl object-cover shadow-inner ring-1 ring-[#006b5f]/30"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#79f7e3] flex items-center justify-center text-[#00201c] shadow-sm">
                      <span className="material-symbols-outlined text-[11px] font-bold">check</span>
                    </span>
                  </button>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3
                        onClick={() => handleOpenProfile(m)}
                        className="font-bold text-[18px] text-[#001026] dark:text-white leading-tight cursor-pointer hover:underline"
                      >
                        {m.name}
                      </h3>
                      {m.badge && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#e2e7ff] dark:bg-[#1e293b] text-[#006b5f] dark:text-[#93ccff] text-[11px] font-semibold">
                          {m.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] text-[#44474e] dark:text-[#94a3b8] mt-0.5">
                      {m.trade}
                    </span>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#006b5f] dark:text-[#59dbc7]">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                        {m.availableText}
                      </span>
                      <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">
                        Responde {m.responseTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <div className="bg-[#f2f3ff] dark:bg-[#1e293b] px-2.5 py-1 rounded-xl flex items-center gap-1 text-[#001026] dark:text-white">
                    <span className="material-symbols-outlined text-[#006b5f] dark:text-[#59dbc7] text-[16px]">
                      star
                    </span>
                    <span className="text-[16px] font-extrabold font-mono">{m.rating.toFixed(1)}</span>
                    <span className="text-[#44474e] dark:text-[#94a3b8] text-[11px]">/ 7.0</span>
                  </div>
                  <span className="text-[10px] text-[#44474e] dark:text-[#94a3b8] mt-0.5 font-medium">
                    {m.reviewCount} evaluaciones
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 py-1.5 px-3 rounded-xl bg-[#f2f3ff]/70 dark:bg-[#1e293b]/50">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#006b5f] dark:text-[#59dbc7]">
                    near_me
                  </span>
                  <span className="text-[12px] text-[#131b2e] dark:text-[#eef0ff]">
                    <strong className="font-semibold text-[#001026] dark:text-white">
                      A {m.distanceKm} km
                    </strong>{' '}
                    de ti
                  </span>
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="material-symbols-outlined text-[16px] text-[#001026] dark:text-white">
                    payments
                  </span>
                  <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">
                    Visita{' '}
                    <strong className="text-[#006b5f] dark:text-[#59dbc7] font-bold">
                      ${(m.diagnosticFee || 20000).toLocaleString('es-CL')}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="text-[12px] text-[#44474e] dark:text-[#94a3b8] leading-snug">
                {m.specialtyTag}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenChatWith(m)}
                  className="flex-1 h-11 rounded-xl bg-[#0b2545] hover:bg-[#001026] dark:bg-[#006b5f] text-white text-[13px] font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Chatear</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCall(m)}
                  className="w-11 h-11 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] flex items-center justify-center text-[#001026] dark:text-[#93ccff] hover:bg-[#e2e7ff] transition-all active:scale-95"
                  title="Llamar"
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenProfile(m)}
                  className="w-11 h-11 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] flex items-center justify-center text-[#001026] dark:text-[#93ccff] hover:bg-[#e2e7ff] transition-all active:scale-95"
                  title="Ver perfil"
                >
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredMaestros.length === 0 && (
          <div className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] text-center text-[13px] text-[#44474e] dark:text-[#94a3b8]">
            No encontramos coincidencias exactas con esos filtros. Te mostramos alternativas cercanas
            mientras ajustas la busqueda.
          </div>
        )}

        <div className="mt-2 p-4 rounded-2xl bg-[#f2f3ff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#001026] dark:bg-[#006b5f] flex items-center justify-center text-[#79f7e3] shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[24px]">emergency_home</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[14px] text-[#001026] dark:text-white leading-snug">
                ¿Es urgente?
              </span>
              <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">
                Solicita prioridad para filtraciones, cortes o fallas criticas.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSOSModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-[12px] shrink-0 transition-all active:scale-95 shadow-md shadow-red-500/20"
          >
            Pedir ayuda
          </button>
        </div>
      </section>
    </div>
  );
};
