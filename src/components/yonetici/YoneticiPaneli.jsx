import React, { useState, useEffect } from 'react';
import { kimlikKullan } from '../../context/KimlikBaglami';
import api from '../../utils/api';

const YoneticiPaneli = () => {
  const { kullanici } = kimlikKullan();
  const [aktifSekme, aktifSekmeAyarla] = useState('kullanicilar'); // 'kullanicilar' or 'icerikler'
  
  const [kullanicilar, kullanicilarAyarla] = useState([]);
  const [icerikler, iceriklerAyarla] = useState([]);
  const [yukleniyor, yukleniyorAyarla] = useState(true);
  const [hata, hataAyarla] = useState(null);

  useEffect(() => {
    if (kullanici?.yoneticiMi) {
      tablolariGetir();
    }
  }, [aktifSekme, kullanici]);

  const tablolariGetir = async () => {
    yukleniyorAyarla(true);
    hataAyarla(null);
    try {
      if (aktifSekme === 'kullanicilar') {
        const res = await api.get('/yonetici/kullanicilar');
        kullanicilarAyarla(res.data);
      } else {
        const res = await api.get('/yonetici/icerikler');
        iceriklerAyarla(res.data);
      }
    } catch (err) {
      hataAyarla(err.response?.data?.message || 'Veri çekilirken bir hata oluştu');
    } finally {
      yukleniyorAyarla(false);
    }
  };

  const kullaniciSil = async (id, kullaniciAdi) => {
    if (!window.confirm(`'${kullaniciAdi}' adlı kullanıcıyı TIKLA TÜM İÇERİKLERİYLE SİLMEK İSTEDİĞİNİZE EMİN MİSİNİZ?`)) return;
    try {
      await api.delete(`/yonetici/kullanicilar/${id}`);
      kullanicilarAyarla(kullanicilar.filter(u => u.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Kullanıcı silinemedi');
    }
  };

  const icerikSil = async (id, title) => {
    if (!window.confirm(`'${title}' adlı içeriği silmek istediğinize emin misiniz?`)) return;
    try {
      await api.delete(`/yonetici/icerikler/${id}`);
      iceriklerAyarla(icerikler.filter(c => c.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'İçerik silinemedi');
    }
  };

  if (!kullanici?.yoneticiMi) return null;

  return (
    <div className="max-w-7xl mx-auto pb-12 w-full flex-1 relative z-10 pt-4">
      {/* Dashboard Toolbar Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 mb-8 mt-4">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Yönetim Paneli</h2>
          <p className="text-gray-400 mt-1">Sistemdeki tüm kayıtlı veriler elinin altında.</p>
        </div>
        <div className="flex bg-white/5 p-1.5 rounded-2xl">
          <button 
            onClick={() => aktifSekmeAyarla('kullanicilar')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${aktifSekme === 'kullanicilar' ? 'bg-indigo-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Kullanıcılar Görünümü
          </button>
          <button 
            onClick={() => aktifSekmeAyarla('icerikler')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${aktifSekme === 'icerikler' ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            İçerikler Görünümü
          </button>
        </div>
      </div>

      {hata && (
        <div className="mb-6 bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-4 rounded-2xl flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
          {hata}
        </div>
      )}

      {/* Main Table Content */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl">
        {yukleniyor ? (
          <div className="py-24 text-center text-gray-400">Yükleniyor... Detaylar analiz ediliyor.</div>
        ) : aktifSekme === 'kullanicilar' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-5 font-semibold text-gray-300">Kullanıcı (Admin?)</th>
                  <th className="px-6 py-5 font-semibold text-gray-300">E-posta Adresi</th>
                  <th className="px-6 py-5 font-semibold text-gray-300 text-center">Toplam İçeriği</th>
                  <th className="px-6 py-5 font-semibold text-gray-300 text-right">Aksiyonlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {kullanicilar.map(u => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white flex items-center gap-2">
                        {u.kullaniciAdi}
                        {u.yoneticiMi && <span className="text-[10px] uppercase font-bold bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">Admin</span>}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Kayıt: {new Date(u.olusturulmaTarihi).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{u.eposta}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center bg-white/10 px-3 py-1 rounded-full text-sm font-semibold">
                        {u.icerikSayisi}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!u.yoneticiMi && (
                        <button 
                          onClick={() => kullaniciSil(u.id, u.kullaniciAdi)}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg border border-red-500/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Kullanıcıyı Sil"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {kullanicilar.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-400">Veritabanında kayıtlı kullanıcı bulunamadı.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-5 font-semibold text-gray-300">İçerik Başlığı</th>
                  <th className="px-6 py-5 font-semibold text-gray-300">Statü & Tür</th>
                  <th className="px-6 py-5 font-semibold text-gray-300">Sahipliği</th>
                  <th className="px-6 py-5 font-semibold text-gray-300 text-right">Aksiyonlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {icerikler.map(c => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-medium text-white">{c.isim}</td>
                    <td className="px-6 py-4 text-gray-300">
                      <span className="capitalize">{c.tur}</span> 
                      <span className="mx-2 text-gray-600">•</span>
                      <span className="text-gray-400">{c.durum}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-indigo-300">{c.kullaniciAdi}</div>
                      <div className="text-xs text-gray-500">{c.eposta}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => icerikSil(c.id, c.isim)}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg border border-red-500/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="İçeriği Sistemden Kaldır"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {icerikler.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-400">Veritabanında eklenmiş hiçbir içerik bulunamadı.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default YoneticiPaneli;
