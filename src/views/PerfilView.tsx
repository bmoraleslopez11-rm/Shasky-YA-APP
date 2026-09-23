import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const PerfilView: React.FC = () => {
  const {
    selectedMaestro,
    reviews,
    addReview,
    setActiveTab,
    setPreviewImage,
    profile,
    settings,
  } = useApp();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(7.0);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const avgRating = selectedMaestro.rating.toFixed(1);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addReview({
        authorName: profile.name,
        authorInitials: profile.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
        commune: settings.userCommune ? settings.userCommune.split(',')[0] : 'Providencia',
        rating: newReviewRating,
        comment: `“${newReviewComment.trim()}”`,
      });
      setIsSubmitting(false);
      setShowReviewForm(false);
      setNewReviewComment('');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full pb-28 animate-fade-in max-w-2xl mx-auto">
      {/* Profile Hero Section */}
      <div className="relative px-4 pt-3 pb-4 flex flex-col gap-3">
        {/* Master Header Card matching mockup */}
        <div className="flex items-start gap-3 bg-[#ffffff] dark:bg-[#0b1320] p-4 rounded-2xl border border-[#eaedff] dark:border-[#1e293b] shadow-sm">
          <div className="relative shrink-0">
            <img
              src={selectedMaestro.avatar}
              alt={selectedMaestro.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-inner ring-1 ring-[#006b5f]/20"
            />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#79f7e3] opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#006b5f]" />
            </span>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-[18px] text-[#001026] dark:text-white truncate">
                {selectedMaestro.name}
              </span>
              <span className="bg-[#79f7e3]/30 text-[#005047] dark:text-[#59dbc7] px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                {selectedMaestro.badge || 'Verificado'}
              </span>
            </div>

            <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8] line-clamp-1 mt-0.5 font-medium">
              {selectedMaestro.trade}
            </p>

            <div className="flex items-center gap-1 text-[#44474e] dark:text-[#94a3b8] text-[12px] mt-1">
              <span className="material-symbols-outlined text-[16px] text-[#0284c7]">
                location_on
              </span>
              <span className="truncate">{selectedMaestro.location} (Radio 15 km)</span>
            </div>
          </div>
        </div>

        {/* Badges de Confianza Chilean Standard */}
        <div className="flex flex-wrap gap-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-white text-[11px] font-bold">
            <span
              className="material-symbols-outlined text-[14px] text-[#006b5f] dark:text-[#59dbc7]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            Identidad verificada
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-white text-[11px] font-bold">
            <span
              className="material-symbols-outlined text-[14px] text-[#006b5f] dark:text-[#59dbc7]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            Buen cumplimiento
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-white text-[11px] font-bold">
            <span
              className="material-symbols-outlined text-[14px] text-[#0284c7]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield
            </span>
            Perfil revisado
          </div>
        </div>

        {/* Chilean Reputation & Score Card */}
        <div className="bg-[#ffffff] dark:bg-[#0b1320] rounded-2xl p-4 border border-[#eaedff] dark:border-[#1e293b] shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#44474e] dark:text-[#94a3b8] font-bold">
                Nota de Reputación
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[32px] text-[#001026] dark:text-white font-extrabold tracking-tight font-mono leading-none">
                  {avgRating}
                </span>
                <span className="text-[16px] text-[#44474e] dark:text-[#94a3b8] font-semibold">
                  / 7.0
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center text-amber-400 gap-0.5">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star_half
                </span>
              </div>
              <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8] mt-1">
                {selectedMaestro.reviewCount} evaluaciones
              </span>
            </div>
          </div>

          <div className="h-px bg-[#eaedff] dark:bg-[#1e293b] w-full my-0.5" />

          {/* Live Speed & Availability Indicators */}
          <div className="flex flex-col gap-1.5 pt-0.5">
            <div className="flex items-center gap-2 text-[12px] text-[#001026] dark:text-[#eef0ff]">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#10B981] shrink-0" />
              <span className="font-bold text-[#006b5f] dark:text-[#59dbc7]">
                {selectedMaestro.availableText}
              </span>
              <span className="text-[#44474e] dark:text-[#94a3b8]">· {selectedMaestro.distanceKm} km de ti</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-[#44474e] dark:text-[#94a3b8]">
              <span className="material-symbols-outlined text-[17px] text-[#0284c7] shrink-0">
                bolt
              </span>
              <span>
                Responde habitualmente en {selectedMaestro.responseTime}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid matching mockup */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#ffffff] dark:bg-[#0b1320] p-3 rounded-2xl border border-[#eaedff] dark:border-[#1e293b] shadow-sm">
            <span className="text-[22px] font-extrabold text-[#001026] dark:text-white block font-mono">
              {selectedMaestro.completedJobs}
            </span>
            <span className="text-[10px] font-bold text-[#44474e] dark:text-[#94a3b8]">
              Trabajos OK
            </span>
          </div>
          <div className="bg-[#ffffff] dark:bg-[#0b1320] p-3 rounded-2xl border border-[#eaedff] dark:border-[#1e293b] shadow-sm">
            <span className="text-[22px] font-extrabold text-[#006b5f] dark:text-[#59dbc7] block font-mono">
              {selectedMaestro.punctuality}%
            </span>
            <span className="text-[10px] font-bold text-[#44474e] dark:text-[#94a3b8]">
              Puntualidad
            </span>
          </div>
          <div className="bg-[#ffffff] dark:bg-[#0b1320] p-3 rounded-2xl border border-[#eaedff] dark:border-[#1e293b] shadow-sm">
            <span className="text-[22px] font-extrabold text-[#001026] dark:text-white block">
              {selectedMaestro.secCode ? selectedMaestro.secCode.replace('SEC ', '') : 'OK'}
            </span>
            <span className="text-[10px] font-bold text-[#44474e] dark:text-[#94a3b8]">
              Perfil
            </span>
          </div>
        </div>

        {/* Portfolio Section: Trabajos Realizados */}
        <div className="flex flex-col gap-2.5 mt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[18px] text-[#001026] dark:text-white">
                Trabajos Realizados
              </h2>
              <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8]">
                Fotos y referencias de trabajos realizados
              </p>
            </div>
            <span className="text-[12px] font-bold text-[#006b5f] dark:text-[#59dbc7]">
              6 Proyectos
            </span>
          </div>

          {/* Project 1: Tablero Monofásico */}
          <div className="bg-[#ffffff] dark:bg-[#0b1320] rounded-2xl overflow-hidden border border-[#eaedff] dark:border-[#1e293b] shadow-sm p-3 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <div
                className="relative rounded-xl overflow-hidden bg-[#eaedff] aspect-video cursor-pointer group"
                onClick={() =>
                  setPreviewImage(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDmlDWjeLY_PYXJTbTnBorj0m2iG1WxJnE9jDvUE3wVDEshWvRKVToOaSKV92N6cuWCxe2oTa9gmo4c7pBdO2MBXpQOE6ocOvPlxGW5EN44tD-D1ks90OGAoHR8xsFlbaascfJuTKennhbxYC2uY4jxcFq404-WAxL8YO2__19EhPfWoO0LWNMutZO9f6_33rJ2R2i3qBIa72d3QeK9f7ri0SAc0W_FSTGqu_3voRp6XW2_47rcIXvr'
                  )
                }
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmlDWjeLY_PYXJTbTnBorj0m2iG1WxJnE9jDvUE3wVDEshWvRKVToOaSKV92N6cuWCxe2oTa9gmo4c7pBdO2MBXpQOE6ocOvPlxGW5EN44tD-D1ks90OGAoHR8xsFlbaascfJuTKennhbxYC2uY4jxcFq404-WAxL8YO2__19EhPfWoO0LWNMutZO9f6_33rJ2R2i3qBIa72d3QeK9f7ri0SAc0W_FSTGqu_3voRp6XW2_47rcIXvr"
                  alt="Tablero antiguo antes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-[#001026]/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  Antes
                </span>
              </div>
              <div
                className="relative rounded-xl overflow-hidden bg-[#eaedff] aspect-video cursor-pointer group"
                onClick={() =>
                  setPreviewImage(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBQllhXuLNIVmEMWjr9Q-epJhFWcmJJhgW3LpF9gt4etUU68edT1I_Pnu_NN--ZRkzTqUpm9xdBuH0Qp1nFjS9ag9NlEl_SZe_gfTVsbW9-Zq7mwQ7g1T5tz0GEL1y-yaBF9TkNb9QRzrU06oUS141jcWnDSrkd5I9f-QQWCMcgfJADazikCtV04xk_de4fwb2shSi9uKjpTztMgBjWO9c1taPQYnf7RKPsz0jn-x8Cgsat5ms5g2lA'
                  )
                }
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQllhXuLNIVmEMWjr9Q-epJhFWcmJJhgW3LpF9gt4etUU68edT1I_Pnu_NN--ZRkzTqUpm9xdBuH0Qp1nFjS9ag9NlEl_SZe_gfTVsbW9-Zq7mwQ7g1T5tz0GEL1y-yaBF9TkNb9QRzrU06oUS141jcWnDSrkd5I9f-QQWCMcgfJADazikCtV04xk_de4fwb2shSi9uKjpTztMgBjWO9c1taPQYnf7RKPsz0jn-x8Cgsat5ms5g2lA"
                  alt="Tablero nuevo certificado SEC"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-[#006b5f] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  Después SEC
                </span>
              </div>
            </div>
            <div className="px-1 py-0.5 flex justify-between items-center">
              <span className="font-bold text-[13px] text-[#001026] dark:text-white">
                Reparación y revisión en domicilio
              </span>
              <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">Las Condes</span>
            </div>
          </div>

          {/* Project 2: Mueble a Medida */}
          <div className="bg-[#ffffff] dark:bg-[#0b1320] rounded-2xl overflow-hidden border border-[#eaedff] dark:border-[#1e293b] shadow-sm p-3 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <div
                className="relative rounded-xl overflow-hidden bg-[#eaedff] aspect-video cursor-pointer group"
                onClick={() =>
                  setPreviewImage(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBQYUyQ4xRUMMMd5dfkuNXn3nncaeIX1s-1xctYX-JhZDROERuuapmYIQD-jsfZdrDgc3GxGbLcVthSKx56U78RjbDEZan-nWPLBLu012-l95KbE195Zzj6ZboL6H5Iz-sAA_QnZo627sG_QowDa8CzVCEsjN4YBzVaRLr2EhueoSZWeiXtka9PQXC9iNnkE3Q6pLajSNYHG9Y1qXfI57du_Rg1rMe3edjUHzaaK21zeftJgkltoq6x'
                  )
                }
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQYUyQ4xRUMMMd5dfkuNXn3nncaeIX1s-1xctYX-JhZDROERuuapmYIQD-jsfZdrDgc3GxGbLcVthSKx56U78RjbDEZan-nWPLBLu012-l95KbE195Zzj6ZboL6H5Iz-sAA_QnZo627sG_QowDa8CzVCEsjN4YBzVaRLr2EhueoSZWeiXtka9PQXC9iNnkE3Q6pLajSNYHG9Y1qXfI57du_Rg1rMe3edjUHzaaK21zeftJgkltoq6x"
                  alt="Obra gruesa cocina antes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-[#001026]/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  Antes
                </span>
              </div>
              <div
                className="relative rounded-xl overflow-hidden bg-[#eaedff] aspect-video cursor-pointer group"
                onClick={() =>
                  setPreviewImage(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuArAn0nxmwmeEvffBL5jN7snLogfMg6QHvE7eHU7BFdfwJPGya2nDlR_J1YmALDD8DMT-W-jzHwZRUYntkuaGLE9nhyGSZtpjBicxRNpQirF8M-aV98Heyxp4hL5OllQ27xNEpOibhMeo7fB1HCe3L2iMRvClyg7Wtar5V_k8Cxj-zs67uac17QzOuCSVsxg6_Fn3eFJfXAl0bEnx5CcpeMDV-AYuR_P3JY9ke6Wn_94PdyDGNfRHoP'
                  )
                }
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArAn0nxmwmeEvffBL5jN7snLogfMg6QHvE7eHU7BFdfwJPGya2nDlR_J1YmALDD8DMT-W-jzHwZRUYntkuaGLE9nhyGSZtpjBicxRNpQirF8M-aV98Heyxp4hL5OllQ27xNEpOibhMeo7fB1HCe3L2iMRvClyg7Wtar5V_k8Cxj-zs67uac17QzOuCSVsxg6_Fn3eFJfXAl0bEnx5CcpeMDV-AYuR_P3JY9ke6Wn_94PdyDGNfRHoP"
                  alt="Mueble e iluminación terminada"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-[#006b5f] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  Después
                </span>
              </div>
            </div>
            <div className="px-1 py-0.5 flex justify-between items-center">
              <span className="font-bold text-[13px] text-[#001026] dark:text-white">
                Trabajo de terminaciones y mantención
              </span>
              <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8]">Providencia</span>
            </div>
          </div>
        </div>

        {/* Verified Reviews Section */}
        <div className="flex flex-col gap-2.5 mt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[18px] text-[#001026] dark:text-white">
                Evaluaciones Reales
              </h2>
              <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8]">
                Opiniones de clientes que usaron el servicio
              </p>
            </div>
          </div>

          {/* Trigger Button to Write Review */}
          {!showReviewForm ? (
            <button
              type="button"
              onClick={() => setShowReviewForm(true)}
              className="flex items-center justify-center gap-2 bg-[#eaedff] dark:bg-[#1e293b] hover:bg-[#e2e7ff] text-[#001026] dark:text-white font-bold text-[13px] py-3 px-4 rounded-2xl transition-all active:scale-98 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px] text-[#006b5f] dark:text-[#59dbc7]">
                rate_review
              </span>
              <span>Escribir reseña</span>
            </button>
          ) : (
            /* Interactive Review Form */
            <form
              onSubmit={handleReviewSubmit}
              className="bg-[#ffffff] dark:bg-[#0b1320] p-4 rounded-2xl border border-[#006b5f]/40 shadow-lg flex flex-col gap-3 animate-fade-in"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[15px] text-[#001026] dark:text-white">
                  Tu Opinión Verificada
                </span>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="text-[#44474e] dark:text-[#94a3b8] hover:text-[#ba1a1a]"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#44474e] dark:text-[#94a3b8]">
                  Evalúa en escala chilena (1.0 a 7.0):
                </span>
                <span className="text-[16px] font-extrabold text-[#006b5f] dark:text-[#59dbc7] font-mono">
                  {newReviewRating.toFixed(1)} / 7.0
                </span>
              </div>

              {/* Star Rating Selector */}
              <div className="flex items-center justify-center gap-2 text-amber-400 py-1">
                {[5.0, 5.5, 6.0, 6.5, 7.0].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setNewReviewRating(val)}
                    className="transition-transform hover:scale-110 active:scale-90"
                  >
                    <span
                      className="material-symbols-outlined text-[32px]"
                      style={
                        newReviewRating >= val
                          ? { fontVariationSettings: "'FILL' 1" }
                          : { fontVariationSettings: "'FILL' 0" }
                      }
                    >
                      star
                    </span>
                  </button>
                ))}
              </div>

              <textarea
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="Describe la puntualidad, limpieza y calidad de Ricardo..."
                rows={3}
                required
                className="w-full p-3 bg-[#f2f3ff] dark:bg-[#070d18] border border-[#eaedff] dark:border-[#1e293b] rounded-xl text-[13px] text-[#001026] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006b5f] resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 rounded-xl bg-[#001026] dark:bg-[#006b5f] text-white font-bold text-[13px] flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      progress_activity
                    </span>
                    <span>Publicando evaluación...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Publicar Evaluación</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Review Cards List */}
          <div className="flex flex-col gap-2.5 mt-1">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#ffffff] dark:bg-[#0b1320] p-4 rounded-2xl border border-[#eaedff] dark:border-[#1e293b] shadow-sm flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#76f4e0]/40 text-[#005047] dark:text-[#59dbc7] flex items-center justify-center font-bold text-[12px]">
                      {rev.authorInitials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[13px] text-[#001026] dark:text-white leading-tight">
                        {rev.authorName}
                      </span>
                      <span className="text-[10px] text-[#44474e] dark:text-[#94a3b8]">
                        {rev.dateText} · {rev.commune}
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#76f4e0]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="text-[12px] text-[#006b5f] dark:text-[#59dbc7] font-extrabold font-mono">
                      {rev.rating.toFixed(1)}
                    </span>
                    <span
                      className="material-symbols-outlined text-[13px] text-amber-400"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </div>
                </div>
                <p className="text-[12px] text-[#001026] dark:text-[#eef0ff] leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

        <div className="bg-[#ffffff] dark:bg-[#0b1320] p-4 rounded-2xl border border-[#eaedff] dark:border-[#1e293b] shadow-sm">
          <div className="flex gap-2 items-start">
            <span className="material-symbols-outlined text-[20px] text-[#006b5f] dark:text-[#59dbc7] shrink-0">
              info
            </span>
            <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8] leading-relaxed">
              Shasky Ya es un medio de contacto entre clientes y prestadores. Antes de iniciar,
              acuerda alcance, precio, materiales y horario directamente con el maestro.
            </p>
          </div>
        </div>

      {/* Sticky Bottom CTA matching mockup */}
      <div className="fixed bottom-16 inset-x-0 p-3 bg-gradient-to-t from-[#faf8ff] via-[#faf8ff]/95 dark:from-[#070d18] dark:via-[#070d18]/95 to-transparent z-30">
        <div className="max-w-2xl mx-auto bg-[#ffffff] dark:bg-[#0b1320] p-2 rounded-2xl border border-[#eaedff] dark:border-[#1e293b] shadow-xl flex items-center gap-2 backdrop-blur-md">
          <button
            type="button"
            onClick={() => {
              alert(`Llamando a ${selectedMaestro.name} (${selectedMaestro.phone})...`);
            }}
            aria-label="Llamar"
            className="w-12 h-12 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-white flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[22px]">call</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className="flex-1 h-12 bg-[#006b5f] hover:bg-[#005047] text-white rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Solicitar Servicio / Conversar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
