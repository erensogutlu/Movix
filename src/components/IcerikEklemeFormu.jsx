import React, { useState } from 'react';

const IcerikEklemeFormu = ({ icerikEkle }) => {
  const [isim, setIsim] = useState('');
  const [tur, setTur] = useState('film');
  const [durum, setDurum] = useState('izlenecek');

  const gonderimiIsle = (e) => {
    e.preventDefault();
    if (!isim.trim()) return;

    icerikEkle({
      isim: isim.trim(),
      tur,
      durum
    });
    
    setIsim(''); // ekledikten sonra girdiyi temizle
  };

  return (
    <section className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10 mb-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Yeni İçerik Ekle</h2>
      <form onSubmit={gonderimiIsle} className="flex flex-col md:flex-row gap-4">
        {/* isim girisi */}
        <div className="flex-1">
          <input
            type="text"
            required
            placeholder="Film veya dizi adı girin..."
            value={isim}
            onChange={(e) => setIsim(e.target.value)}
            className="w-full bg-black/20 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all placeholder-gray-400 backdrop-blur-sm"
          />
        </div>

        {/* tur secimi */}
        <div className="relative w-full md:w-48">
          <select
            value={tur}
            onChange={(e) => setTur(e.target.value)}
            className="w-full bg-black/20 border border-white/10 text-white px-4 py-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent appearance-none cursor-pointer backdrop-blur-sm"
          >
            <option value="film" className="bg-gray-900">Film</option>
            <option value="dizi" className="bg-gray-900">Dizi</option>
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

        {/* durum secimi */}
        <div className="relative w-full md:w-48">
          <select
            value={durum}
            onChange={(e) => setDurum(e.target.value)}
            className="w-full bg-black/20 border border-white/10 text-white px-4 py-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent appearance-none cursor-pointer backdrop-blur-sm"
          >
            <option value="izlenecek" className="bg-gray-900">İzlenecek</option>
            <option value="izleniyor" className="bg-gray-900">İzleniyor</option>
            <option value="izlendi" className="bg-gray-900">İzlendi</option>
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

        {/* ekle butonu */}
        <button
          type="submit"
          className="bg-indigo-500/80 hover:bg-indigo-500 backdrop-blur-md border border-indigo-400/50 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <span>Ekle</span>
        </button>
      </form>
    </section>
  );
};

export default IcerikEklemeFormu;
