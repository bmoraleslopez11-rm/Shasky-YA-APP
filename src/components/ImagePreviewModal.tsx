import React from 'react';
import { useApp } from '../context/AppContext';

export const ImagePreviewModal: React.FC = () => {
  const { previewImage, setPreviewImage } = useApp();

  if (!previewImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={() => setPreviewImage(null)}
    >
      <div
        className="relative max-w-lg w-full max-h-[85vh] bg-[#0b1320] rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setPreviewImage(null)}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all"
          aria-label="Cerrar vista previa"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex-1 overflow-auto flex items-center justify-center p-2">
          <img
            src={previewImage}
            alt="Detalle de instalación"
            className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
          />
        </div>

        <div className="p-3 bg-[#070d18] border-t border-white/10 flex items-center justify-between text-white text-[12px]">
          <span className="flex items-center gap-1.5 text-[#59dbc7]">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Inspección fotográfica verificada
          </span>
          <button
            onClick={() => setPreviewImage(null)}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
