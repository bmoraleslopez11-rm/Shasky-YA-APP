import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const ChatView: React.FC = () => {
  const {
    chatMessages,
    sendMessage,
    selectedMaestro,
    setIsVideoModalOpen,
    setPreviewImage,
    addNotification,
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const todayLabel = new Intl.DateTimeFormat('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());
  const serviceIcon = selectedMaestro.trade.toLowerCase().includes('gasf')
    ? 'plumbing'
    : selectedMaestro.trade.toLowerCase().includes('electric')
    ? 'bolt'
    : 'home_repair_service';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecordingVoice) {
      interval = setInterval(() => setVoiceSeconds((s) => s + 1), 1000);
    } else {
      setVoiceSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingVoice]);

  const handleSend = () => {
    if (!inputVal.trim()) return;
    sendMessage(inputVal.trim());
    setInputVal('');
  };

  const handleSendVoiceNote = () => {
    setIsRecordingVoice(false);
    sendMessage(`🎤 Mensaje de voz (${voiceSeconds} seg)`);
  };

  const handleAttachSamplePhoto = () => {
    sendMessage(
      'Te adjunto una foto adicional para que puedas revisar mejor el problema',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQllhXuLNIVmEMWjr9Q-epJhFWcmJJhgW3LpF9gt4etUU68edT1I_Pnu_NN--ZRkzTqUpm9xdBuH0Qp1nFjS9ag9NlEl_SZe_gfTVsbW9-Zq7mwQ7g1T5tz0GEL1y-yaBF9TkNb9QRzrU06oUS141jcWnDSrkd5I9f-QQWCMcgfJADazikCtV04xk_de4fwb2shSi9uKjpTztMgBjWO9c1taPQYnf7RKPsz0jn-x8Cgsat5ms5g2lA'
    );
  };

  return (
    <div className="flex flex-col w-full pb-36 animate-fade-in max-w-2xl mx-auto min-h-screen">
      {/* Pinned Context Banner: Job Summary Card */}
      <section className="sticky top-16 z-30 px-3 pt-2 pb-1 bg-[#faf8ff]/95 dark:bg-[#070d18]/95 backdrop-blur-md">
        <div className="w-full bg-[#ffffff] dark:bg-[#0b1320] rounded-2xl p-3.5 border border-[#eaedff] dark:border-[#1e293b] shadow-md flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] flex items-center justify-center text-[#001026] dark:text-[#93ccff] shrink-0">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {serviceIcon}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] bg-[#76f4e0]/30 text-[#006f63] dark:text-[#59dbc7] px-1.5 py-0.2 rounded font-bold uppercase">
                    {selectedMaestro.badge || 'Perfil verificado'}
                  </span>
                  <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8] truncate">
                    · {selectedMaestro.location}
                  </span>
                </div>
                <h1 className="font-bold text-[14px] text-[#001026] dark:text-white truncate leading-tight mt-0.5">
                  Reparación en domicilio
                </h1>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-white font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                En conversación
              </span>
              <span className="text-[10px] text-[#44474e] dark:text-[#94a3b8] text-right mt-0.5">
                Previa a visita
              </span>
            </div>
          </div>

          {/* Quick Action Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 pt-0.5 no-scrollbar">
            <button
              onClick={() => {
                sendMessage('Mi ubicación exacta confirmada: Av. Providencia 2145, Depto 604.');
                addNotification({
                  title: 'Ubicación enviada',
                  body: `Dirección compartida con ${selectedMaestro.name}.`,
                  icon: 'pin_drop',
                  type: 'chat',
                });
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#eaedff] dark:bg-[#1e293b] hover:bg-[#e2e7ff] text-[#001026] dark:text-white text-[11px] font-bold whitespace-nowrap transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[15px] text-[#006b5f] dark:text-[#59dbc7]">
                pin_drop
              </span>
              <span>Enviar ubicación exacta</span>
            </button>

            <button
              onClick={() => {
                sendMessage('¿Podrías enviarme un presupuesto con mano de obra y materiales por separado?');
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#eaedff] dark:bg-[#1e293b] hover:bg-[#e2e7ff] text-[#001026] dark:text-white text-[11px] font-bold whitespace-nowrap transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[15px] text-[#001026] dark:text-[#93ccff]">
                description
              </span>
              <span>Solicitar Presupuesto Formal</span>
            </button>

            <button
              onClick={() => {
                sendMessage(
                  `Confirmo la visita técnica de diagnóstico por $${(
                    selectedMaestro.diagnosticFee || 20000
                  ).toLocaleString('es-CL')} para hoy a las 16:30.`
                );
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#006b5f] hover:bg-[#005047] text-white text-[11px] font-bold whitespace-nowrap transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[15px] text-[#79f7e3]">
                calendar_clock
              </span>
              <span>Agendar Visita</span>
            </button>
          </div>
        </div>
      </section>

      {/* Trust Notice */}
      <div className="px-3 my-1">
        <div className="bg-[#f2f3ff] dark:bg-[#0d1627] rounded-xl py-2 px-3 border border-[#eaedff] dark:border-[#1e293b] flex items-center gap-2 text-[#44474e] dark:text-[#94a3b8] shadow-sm">
          <span
            className="material-symbols-outlined text-[18px] text-[#006b5f] dark:text-[#59dbc7] shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <p className="text-[11px] leading-snug">
            Shasky Ya facilita el contacto. Acuerda precio, materiales y horario antes de iniciar el
            trabajo.
          </p>
        </div>
      </div>

      {/* Live Diagnostic Quick Call Banner */}
      <div className="px-3 my-1">
        <div className="bg-gradient-to-r from-[#0b2545] to-[#00273f] dark:from-[#0d1b2e] dark:to-[#091524] border border-[#1e3a5f] rounded-2xl p-3.5 text-white shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 text-[#76f4e0]">
              <span className="material-symbols-outlined text-[22px]">video_call</span>
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-[13px] text-white truncate">¿Revisamos por videollamada?</h2>
              <p className="text-[11px] text-[#b1c7f0] truncate">
                Muestra el problema a {selectedMaestro.name} antes de la visita
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#006b5f] hover:bg-[#005047] text-white text-[12px] font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">videocam</span>
            <span>Iniciar</span>
          </button>
        </div>
      </div>

      {/* Chat Stream Timeline */}
      <div className="px-3 flex flex-col gap-3 mt-2">
        {/* Date Divider */}
        <div className="flex items-center justify-center my-1">
          <span className="bg-[#eaedff] dark:bg-[#1e293b] px-3 py-1 rounded-full text-[10px] text-[#44474e] dark:text-[#94a3b8] uppercase tracking-wider font-bold">
            Hoy, {todayLabel}
          </span>
        </div>

        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';

          // Call log widget card inside chat
          if (msg.isCallWidget) {
            return (
              <div key={msg.id} className="w-full my-1">
                <div className="bg-[#ffffff] dark:bg-[#0b1320] rounded-2xl p-3.5 border border-[#eaedff] dark:border-[#1e293b] shadow-md flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#006b5f]/15 flex items-center justify-center text-[#006b5f] dark:text-[#59dbc7] shrink-0">
                        <span className="material-symbols-outlined text-[22px]">call_made</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-[14px] text-[#001026] dark:text-white leading-none">
                            Llamada con maestro
                          </h4>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#76f4e0]/30 text-[#006f63] dark:text-[#59dbc7]">
                            Coordinada
                          </span>
                        </div>
                        <p className="text-[11px] text-[#44474e] dark:text-[#94a3b8] mt-1">
                          {msg.callDuration}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8] font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div className="bg-[#f2f3ff] dark:bg-[#1e293b] rounded-xl p-2.5 flex items-center justify-between gap-2 text-[12px]">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#10B981]">
                        check_circle
                      </span>
                      <span className="text-[#001026] dark:text-white font-medium">
                        {msg.callAgreement}
                      </span>
                    </div>
                    <button
                      onClick={() => alert(`Llamando nuevamente a ${selectedMaestro.name}...`)}
                      className="px-2.5 py-1 rounded-lg bg-[#ffffff] dark:bg-[#0b1320] text-[#001026] dark:text-white font-bold text-[11px] flex items-center gap-1 shadow-sm active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[14px] text-[#006b5f]">
                        call
                      </span>
                      <span>Volver a llamar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // User message bubble
          if (isUser) {
            return (
              <div key={msg.id} className="flex flex-col gap-1 max-w-[85%] self-end">
                <div className="bg-[#0b2545] dark:bg-[#006b5f] text-white rounded-2xl rounded-br-xs p-3.5 shadow-sm flex flex-col gap-1">
                  {msg.imageUrl && (
                    <div
                      className="relative rounded-xl overflow-hidden bg-black/20 aspect-[4/3] group cursor-pointer"
                      onClick={() => setPreviewImage(msg.imageUrl || null)}
                    >
                      <img
                        src={msg.imageUrl}
                        alt="Adjunto de usuario"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <div className="flex items-center justify-between w-full text-white text-[11px]">
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-[#79f7e3]">
                              image
                            </span>
                            <span className="truncate">{msg.imageCaption || 'Foto adjunta'}</span>
                          </div>
                          {msg.imageSize && <span>{msg.imageSize}</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  {msg.text && (
                    <p className="text-[13px] leading-relaxed text-white">{msg.text}</p>
                  )}

                  <div className="flex items-center justify-end gap-1 text-[#778db2] dark:text-white/70 text-[10px]">
                    <span className="font-mono">{msg.timestamp}</span>
                    <span className="material-symbols-outlined text-[13px] text-[#79f7e3]">
                      done_all
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Maestro message bubble
          return (
            <div key={msg.id} className="flex items-end gap-2 max-w-[88%] self-start">
              <img
                src={selectedMaestro.avatar}
                alt={selectedMaestro.name}
                className="w-8 h-8 rounded-full object-cover shrink-0 shadow-sm ring-1 ring-[#006b5f]"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 pl-1">
                  <span className="text-[11px] font-bold text-[#001026] dark:text-white">
                    {selectedMaestro.name}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#eaedff] dark:bg-[#1e293b] text-[#006b5f] dark:text-[#59dbc7] font-semibold">
                    {selectedMaestro.badge || 'Verificado'}
                  </span>
                </div>
                <div className="bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] rounded-2xl rounded-bl-xs p-3.5 shadow-sm text-[#001026] dark:text-[#eef0ff] flex flex-col gap-1.5">
                  <p className="text-[13px] leading-relaxed">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 text-[#44474e] dark:text-[#94a3b8] text-[10px]">
                    <span className="font-mono">{msg.timestamp}</span>
                    <span className="material-symbols-outlined text-[13px] text-[#006b5f] dark:text-[#59dbc7]">
                      done_all
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        <div className="flex items-center gap-2 self-start pl-1 text-[#44474e] dark:text-[#94a3b8]">
          <div className="flex items-center gap-1 bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] px-3 py-1.5 rounded-full shadow-sm text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#006b5f] animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-[#006b5f] animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-[#006b5f] animate-bounce [animation-delay:0.4s]" />
            <span className="ml-1 font-semibold text-[#006b5f] dark:text-[#59dbc7]">
              {selectedMaestro.name} está en línea
            </span>
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Floating Chat Input Area */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#ffffff]/95 dark:bg-[#070d18]/95 backdrop-blur-xl border-t border-[#eaedff] dark:border-[#1e293b] shadow-[0_-4px_16px_rgba(11,37,69,0.08)] pb-safe pt-2 px-3">
        <div className="max-w-2xl mx-auto flex flex-col gap-1.5">
          {/* Fast Suggested Prompt Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              '¿Qué materiales podría necesitar?',
              '¿Aceptas transferencia bancaria?',
              'Ya estoy esperándote en portería.',
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInputVal(prompt)}
                className="px-2.5 py-1 rounded-full bg-[#eaedff] dark:bg-[#1e293b] hover:bg-[#e2e7ff] text-[#001026] dark:text-white text-[11px] font-semibold whitespace-nowrap transition-colors shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Active Input Bar Container */}
          <div className="flex items-center gap-1.5 pb-2">
            {/* Attachment Button */}
            <button
              onClick={handleAttachSamplePhoto}
              title="Adjuntar fotografía de muestra"
              className="w-10 h-10 rounded-full bg-[#eaedff] dark:bg-[#1e293b] flex items-center justify-center text-[#44474e] dark:text-[#94a3b8] hover:text-[#001026] dark:hover:text-white transition-colors shrink-0 shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
            </button>

            {/* Input / Voice Recording Field */}
            {isRecordingVoice ? (
              <div className="flex-1 bg-red-500/10 border border-red-500 rounded-full px-4 py-2 flex items-center justify-between text-red-500 animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-[12px] font-bold">Grabando nota de voz... 00:{voiceSeconds < 10 ? `0${voiceSeconds}` : voiceSeconds}</span>
                </div>
                <button
                  onClick={handleSendVoiceNote}
                  className="px-2 py-0.5 rounded-md bg-red-500 text-white text-[11px] font-bold"
                >
                  Enviar
                </button>
              </div>
            ) : (
              <div className="flex-1 bg-[#f2f3ff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] rounded-full px-3.5 py-2 flex items-center gap-2 shadow-inner">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={`Escribe un mensaje a ${selectedMaestro.name}...`}
                  className="w-full bg-transparent text-[#001026] dark:text-white placeholder-[#44474e]/60 dark:placeholder-[#94a3b8]/60 text-[13px] focus:outline-none min-w-0"
                />
                <button
                  type="button"
                  onClick={() => setIsRecordingVoice(true)}
                  title="Grabar nota de voz"
                  className="text-[#44474e] dark:text-[#94a3b8] hover:text-[#006b5f] transition-colors shrink-0 p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>
              </div>
            )}

            {/* Direct Phone Call */}
            <button
              onClick={() => alert(`Llamando a ${selectedMaestro.name} (${selectedMaestro.phone})...`)}
              title="Llamar directo"
              className="w-10 h-10 rounded-full bg-[#eaedff] dark:bg-[#1e293b] text-[#006b5f] dark:text-[#59dbc7] flex items-center justify-center hover:bg-[#e2e7ff] transition-colors shrink-0 shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">phone_forwarded</span>
            </button>

            {/* Send Button */}
            <button
              onClick={handleSend}
              title="Enviar mensaje"
              className="w-10 h-10 rounded-full bg-[#001026] dark:bg-[#006b5f] text-white flex items-center justify-center hover:opacity-90 shadow-md transition-all active:scale-90 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
