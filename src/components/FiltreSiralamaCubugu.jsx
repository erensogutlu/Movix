import React from 'react';

const FiltreSiralamaCubugu = ({ aramaSorgusu, aramaSorgusuAyarla, siralamaTuru, siralamaTuruAyarla }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
      {/* arama */}
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          type="text"
          value={aramaSorgusu}
          onChange={(e) => aramaSorgusuAyarla(e.target.value)}
          placeholder="Listemde film veya dizi ara..."
          className="w-full bg-black/20 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all placeholder-gray-400 backdrop-blur-sm"
        />
      </div>

      {/* siralama */}
      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M11 5h10" />
            <path d="M11 9h10" />
            <path d="M11 13h10" />
            <path d="M11 17h10" />
            <path d="M3 5v14" />
            <path d="m3 19 3-3" />
            <path d="m3 19-3-3" />
          </svg>
        </div>
        <select
          value={siralamaTuru}
          onChange={(e) => siralamaTuruAyarla(e.target.value)}
          className="w-full bg-black/20 border border-white/10 text-white pl-10 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent appearance-none cursor-pointer backdrop-blur-sm"
        >
          <option value="durum" className="bg-gray-900">Duruma Göre (Varsayılan)</option>
          <option value="yeni" className="bg-gray-900">En Yeni Eklenenler</option>
          <option value="eski" className="bg-gray-900">En Eski Eklenenler</option>
          <option value="az" className="bg-gray-900">İsim (A-Z)</option>
          <option value="za" className="bg-gray-900">İsim (Z-A)</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FiltreSiralamaCubugu;
