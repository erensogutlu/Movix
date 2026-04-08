import React from 'react';

const Istatistikler = ({ icerikler }) => {
  const stats = {
    filmIzlendi: icerikler.filter(c => c.tur === 'film' && c.durum === 'izlendi').length,
    filmIzleniyor: icerikler.filter(c => c.tur === 'film' && c.durum === 'izleniyor').length,
    diziIzlendi: icerikler.filter(c => c.tur === 'dizi' && c.durum === 'izlendi').length,
    diziIzleniyor: icerikler.filter(c => c.tur === 'dizi' && c.durum === 'izleniyor').length,
  };

  return (
    <>
      <div className="flex justify-between items-end mb-4 px-1">
        <h2 className="text-2xl font-bold text-gray-100">Listem</h2>
        <div className="text-sm text-gray-300 font-medium bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          Toplam: {icerikler.length} içerik
        </div>
      </div>

      {icerikler.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* film izlendi */}
          <div className="bg-white/5 backdrop-blur-lg border border-emerald-400/30 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all hover:bg-white/10">
            <span className="text-emerald-400 text-3xl font-extrabold">{stats.filmIzlendi}</span>
            <span className="text-gray-300 text-xs font-semibold uppercase tracking-wide mt-1 text-center">İzlenmiş Film</span>
          </div>
          {/* film izleniyor */}
          <div className="bg-white/5 backdrop-blur-lg border border-blue-400/30 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all hover:bg-white/10">
            <span className="text-blue-400 text-3xl font-extrabold">{stats.filmIzleniyor}</span>
            <span className="text-gray-300 text-xs font-semibold uppercase tracking-wide mt-1 text-center">İzlenen Film</span>
          </div>
          {/* dizi izlendi */}
          <div className="bg-white/5 backdrop-blur-lg border border-emerald-400/30 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all hover:bg-white/10">
            <span className="text-emerald-400 text-3xl font-extrabold">{stats.diziIzlendi}</span>
            <span className="text-gray-300 text-xs font-semibold uppercase tracking-wide mt-1 text-center">İzlenmiş Dizi</span>
          </div>
          {/* dizi izleniyor */}
          <div className="bg-white/5 backdrop-blur-lg border border-blue-400/30 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all hover:bg-white/10">
            <span className="text-blue-400 text-3xl font-extrabold">{stats.diziIzleniyor}</span>
            <span className="text-gray-300 text-xs font-semibold uppercase tracking-wide mt-1 text-center">İzlenen Dizi</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Istatistikler;
