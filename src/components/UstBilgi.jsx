import React from 'react';

const UstBilgi = ({ girisTiklama, kayitTiklama }) => {
  return (
    <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* movix logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-1.5 rounded-lg shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 3v18" />
              <path d="M3 7.5h4" />
              <path d="M3 12h18" />
              <path d="M3 16.5h4" />
              <path d="M17 3v18" />
              <path d="M17 7.5h4" />
              <path d="M17 16.5h4" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-purple-500 drop-shadow-sm">
            Movix
          </h1>
        </div>

        {/* giris/kayit butonlari */}
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={girisTiklama}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-white/10"
          >
            Giriş Yap
          </button>
          <button
            onClick={kayitTiklama}
            className="text-sm font-semibold text-white bg-indigo-500/80 hover:bg-indigo-500 backdrop-blur-md border border-indigo-400/50 px-4 sm:px-5 py-2 rounded-xl transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-1.5 group"
          >
            Kayıt Ol
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform duration-300 hidden sm:block"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default UstBilgi;
