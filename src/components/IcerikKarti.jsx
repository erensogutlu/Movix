import React from 'react';

const IcerikKarti = ({ icerik, silindi, durumDegisti }) => {
  const turIkonuGetir = (tur) => {
    if (tur === "film") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M7 3v18" />
          <path d="M3 7.5h4" />
          <path d="M3 12h18" />
          <path d="M3 16.5h4" />
          <path d="M17 3v18" />
          <path d="M17 7.5h4" />
          <path d="M17 16.5h4" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
          <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
          <polyline points="17 2 12 7 7 2" />
        </svg>
      );
    }
  };

  const durumRengiGetir = (durum) => {
    switch (durum) {
      case "izlendi": return "text-emerald-300 bg-emerald-500/10 border-emerald-400/30";
      case "izleniyor": return "text-blue-300 bg-blue-500/10 border-blue-400/30";
      case "izlenecek": return "text-amber-300 bg-amber-500/10 border-amber-400/30";
      default: return "text-gray-300 bg-gray-500/10 border-gray-400/30";
    }
  };

  return (
    <div className="kart-giris bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/5 w-max">
            {turIkonuGetir(icerik.tur)}
            <span className="text-xs font-medium uppercase tracking-wider text-gray-300">{icerik.tur}</span>
          </div>
          <button onClick={() => silindi(icerik.id)} className="text-gray-400 hover:text-red-400 transition-colors p-1 opacity-70 group-hover:opacity-100" title="Sil">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>

        <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 drop-shadow-md" title={icerik.isim}>{icerik.isim}</h3>
        <p className="text-xs text-gray-400 mb-4">Eklendi: {icerik.eklenmeTarihi}</p>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        {/* durum degistirme secici */}
        <div className="relative w-full">
          <select
            value={icerik.durum}
            onChange={(e) => durumDegisti(icerik.id, e.target.value)}
            className={`w-full appearance-none font-medium text-sm border rounded-lg px-3 py-1.5 pr-8 cursor-pointer outline-none transition-colors backdrop-blur-sm shadow-sm ${durumRengiGetir(icerik.durum)}`}
          >
            <option value="izlenecek" className="bg-gray-900 text-gray-100">İzlenecek</option>
            <option value="izleniyor" className="bg-gray-900 text-gray-100">İzleniyor</option>
            <option value="izlendi" className="bg-gray-900 text-gray-100">İzlendi</option>
          </select>
          {/* ozel ok ikonu */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IcerikKarti;
