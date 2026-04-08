import React from 'react';
import IcerikKarti from './IcerikKarti';

const IcerikListesi = ({ filmler, diziler, filtreliListeBosMu, silindi, durumDegisti }) => {
  if (filtreliListeBosMu) {
    return (
      <div className="flex-col items-center justify-center py-20 text-center flex">
        <div className="w-24 h-24 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center mb-4 text-gray-400 shadow-xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m9 8 6 4-6 4Z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-200">Listeniz şu an boş (veya arama sonucu yok).</h3>
        <p className="text-gray-400 mt-2">
          Yukarıdaki formu kullanarak yeni filmler ve diziler ekleyin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* filmler */}
      <div>
        <div className="flex items-center mb-4 px-1 border-b border-white/10 pb-2">
          <h3 className="text-xl font-bold text-blue-300">Filmler</h3>
          <span className="ml-auto text-xs font-bold bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 px-2.5 py-1 rounded-md">
            {filmler.length}
          </span>
        </div>
        {filmler.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filmler.map((film) => (
              <IcerikKarti key={film.id} icerik={film} silindi={silindi} durumDegisti={durumDegisti} />
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm italic">
            Henüz film eklenmemiş.
          </div>
        )}
      </div>

      {/* diziler */}
      <div>
        <div className="flex items-center mb-4 px-1 border-b border-white/10 pb-2">
          <h3 className="text-xl font-bold text-purple-300">Diziler</h3>
          <span className="ml-auto text-xs font-bold bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 px-2.5 py-1 rounded-md">
            {diziler.length}
          </span>
        </div>
        {diziler.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diziler.map((dizi) => (
              <IcerikKarti key={dizi.id} icerik={dizi} silindi={silindi} durumDegisti={durumDegisti} />
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm italic">
            Henüz dizi eklenmemiş.
          </div>
        )}
      </div>
    </div>
  );
};

export default IcerikListesi;
