import React from 'react';

const AltBilgi = () => {
  return (
    <footer className="w-full mt-20 border-t border-white/10 relative z-10 bg-black/20 backdrop-blur-xl pt-12 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        {/* logo ve aciklama */}
        <div className="flex flex-col items-center md:items-start gap-4 max-w-sm text-center md:text-left">
          <div className="flex items-center gap-2.5 cursor-default">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-1.5 rounded-lg shadow-lg shadow-indigo-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-purple-500">
              Movix
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Kişisel dizi ve film takip platformunuz. İzlediğiniz ve izleyeceğiniz içerikleri modern, hızlı ve şık bir arayüzle kolayca yönetin.
          </p>
        </div>

        {/* gelistirici */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <a
            href="https://github.com/erensogutlu"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profilim"
            className="flex items-center gap-3 p-1.5 pr-6 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 group backdrop-blur-md relative overflow-hidden"
          >
            {/* isik parlamasi efekti (hover) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

            {/* profil fotografi (github'dan otomatik alir) */}
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              <img
                src="https://github.com/erensogutlu.png"
                alt="Eren Söğütlü"
                className="w-11 h-11 rounded-full border border-white/20 group-hover:border-indigo-400 relative z-10 object-cover transition-colors"
              />
            </div>

            {/* isim ve kullanici adi */}
            <div className="flex flex-col relative z-10 text-left">
              <span className="text-gray-200 font-bold text-sm tracking-wide group-hover:text-white transition-colors">
                Eren Söğütlü
              </span>
              <span className="text-indigo-400/80 text-xs font-medium flex items-center gap-1.5 group-hover:text-indigo-300 transition-colors mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a11.4 11.4 0 0 0-6 0C6.9 2.75 5.8 3 5.8 3a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.3 9.3c0 5.6 3.36 6.65 6.5 7a4.8 4.8 0 0 0-1 3.02V22" />
                  <path d="M9 20c-5 1.5-5-2.5-7-3" />
                </svg>
                @erensogutlu
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* alt bilgi (telif hakki) */}
      <div className="max-w-5xl mx-auto px-4 mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
        <p>&copy; {new Date().getFullYear()} Movix. Tüm hakları saklıdır.</p>
        <p className="flex items-center gap-1.5">
          Sevgiyle
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-indigo-500 animate-pulse"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          tasarlandı
        </p>
      </div>
    </footer>
  );
};

export default AltBilgi;
