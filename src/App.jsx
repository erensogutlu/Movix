import React, { useState, useEffect, useMemo } from 'react';
import UstBilgi from './components/UstBilgi';
import AltBilgi from './components/AltBilgi';
import IcerikEklemeFormu from './components/IcerikEklemeFormu';
import Istatistikler from './components/Istatistikler';
import FiltreSiralamaCubugu from './components/FiltreSiralamaCubugu';
import IcerikListesi from './components/IcerikListesi';
import Pencere from './components/Pencere';
import YoneticiPaneli from './components/yonetici/YoneticiPaneli';
import { kimlikKullan } from './context/KimlikBaglami';
import api from './utils/api';

function App() {
  const { kullanici, girisYap, kayitOl, cikisYap, yukleniyor: yetkiYukleniyor } = kimlikKullan();
  
  const [icerikListesi, setIcerikListesi] = useState([]);
  const [aramaSorgusu, aramaSorgusuAyarla] = useState('');
  const [siralamaTuru, siralamaTuruAyarla] = useState('durum');
  
  // modallar durumu
  const [silinecekId, setSilinecekId] = useState(null);
  const [girisModaliAcikMi, girisModaliAyarla] = useState(false);
  const [kayitModaliAcikMi, kayitModaliAyarla] = useState(false);
  const [cikisModaliAcikMi, cikisModaliAyarla] = useState(false);
  
  // formlar & hata durumu
  const [hataMesaji, setHataMesaji] = useState('');
  const [yetkiHatasi, yetkiHatasiAyarla] = useState('');
  const [girisFormu, girisFormuAyarla] = useState({ eposta: '', sifre: '' });
  const [kayitFormu, kayitFormuAyarla] = useState({ kullaniciAdi: '', eposta: '', sifre: '' });

  // yukari cikma durumu
  const [yukariCikGoster, yukariCikAyarla] = useState(false);

  useEffect(() => {
    const kaydirmaIsle = () => {
      yukariCikAyarla(window.scrollY > 300);
    };
    window.addEventListener('scroll', kaydirmaIsle);
    return () => window.removeEventListener('scroll', kaydirmaIsle);
  }, []);

  const yukariCik = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Fetch from Node.js Backend when kullanici is logged in (ve admin değilse)
  useEffect(() => {
    if (kullanici && !kullanici?.yoneticiMi) {
      icerikleriGetir();
    } else {
      setIcerikListesi([]); // cikis yapildiginda veya admin ise temizle
    }
  }, [kullanici]);

  const icerikleriGetir = async () => {
    try {
      const res = await api.get('/icerikler');
      setIcerikListesi(res.data);
    } catch (err) {
      hataGoster('İçerikler yüklenirken bir sorun oluştu.');
    }
  };

  const hataGoster = (mesaj) => {
    setHataMesaji(mesaj);
    setTimeout(() => setHataMesaji(''), 4000);
  };

  const icerikEklemeIslemi = async (yeniIcerikVeri) => {
    if (!kullanici) {
      hataGoster("Lütfen içerik eklemek için giriş yapın.");
      girisModaliAyarla(true);
      return;
    }

    const ayniIcerikVarMi = icerikListesi.some(
      (icerik) =>
        icerik.isim.toLowerCase() === yeniIcerikVeri.isim.toLowerCase() &&
        icerik.tur === yeniIcerikVeri.tur
    );

    if (ayniIcerikVarMi) {
      hataGoster("Bu içerik zaten listenizde mevcut!");
      return;
    }

    try {
      const res = await api.post('/icerikler', yeniIcerikVeri);
      setIcerikListesi([res.data, ...icerikListesi]);
    } catch (err) {
      hataGoster("İçerik eklenemedi.");
    }
  };

  const icerikSil = (id) => {
    setSilinecekId(id);
  };

  const icerigiGercektenSil = async () => {
    if (silinecekId) {
      try {
        await api.delete(`/icerikler/${silinecekId}`);
        const guncelListe = icerikListesi.filter(icerik => icerik.id !== silinecekId);
        setIcerikListesi(guncelListe);
        setSilinecekId(null);
      } catch (err) {
        hataGoster('Silme işlemi başarısız oldu.');
      }
    }
  };

  const durumDegistir = async (id, yeniDurum) => {
    try {
      const res = await api.put(`/icerikler/${id}/status`, { durum: yeniDurum });
      const guncelListe = icerikListesi.map(icerik => icerik.id === id ? res.data : icerik);
      setIcerikListesi(guncelListe);
    } catch (err) {
      hataGoster('Durum güncellenemedi.');
    }
  };

  const modallarArasiGecis = (kapatilacak) => {
    yetkiHatasiAyarla('');
    if (kapatilacak === 'giris') {
      girisModaliAyarla(false);
      setTimeout(() => kayitModaliAyarla(true), 150);
    } else {
      kayitModaliAyarla(false);
      setTimeout(() => girisModaliAyarla(true), 150);
    }
  };

  // kimlik dogrulama gonderim isleyicileri
  const girisGonderimiIsle = async (e) => {
    e.preventDefault();
    yetkiHatasiAyarla('');
    try {
      await girisYap(girisFormu.eposta, girisFormu.sifre);
      girisModaliAyarla(false);
      girisFormuAyarla({ eposta: '', sifre: '' });
    } catch (error) {
      yetkiHatasiAyarla(error.response?.data?.message || 'Giriş yapılamadı.');
    }
  };

  const kayitGonderimiIsle = async (e) => {
    e.preventDefault();
    yetkiHatasiAyarla('');
    try {
      await kayitOl(kayitFormu.kullaniciAdi, kayitFormu.eposta, kayitFormu.sifre);
      kayitModaliAyarla(false);
      kayitFormuAyarla({ kullaniciAdi: '', eposta: '', sifre: '' });
    } catch (error) {
      yetkiHatasiAyarla(error.response?.data?.message || 'Kayıt olunamadı.');
    }
  };

  const cikisTiklamaIsle = () => {
    cikisModaliAyarla(true);
  };

  const cikisiOnayla = () => {
    cikisYap();
    cikisModaliAyarla(false);
  };

  // filtreleme ve siralama
  const filtrelenmisVeSiraliListe = useMemo(() => {
    const aramaMetni = aramaSorgusu.toLowerCase().trim();
    const filtrelenmisListe = icerikListesi.filter(icerik =>
      icerik.isim.toLowerCase().includes(aramaMetni)
    );

    const siralamaAgirliklari = { izleniyor: 1, izlenecek: 2, izlendi: 3 };

    return filtrelenmisListe.sort((a, b) => {
      if (siralamaTuru === "az") return a.isim.localeCompare(b.isim);
      if (siralamaTuru === "za") return b.isim.localeCompare(a.isim);
      if (siralamaTuru === "yeni") {
        return new Date(b.olusturulmaTarihi) - new Date(a.olusturulmaTarihi);
      }
      if (siralamaTuru === "eski") {
        return new Date(a.olusturulmaTarihi) - new Date(b.olusturulmaTarihi);
      }
      return siralamaAgirliklari[a.durum] - siralamaAgirliklari[b.durum];
    });
  }, [icerikListesi, aramaSorgusu, siralamaTuru]);

  const filmler = filtrelenmisVeSiraliListe.filter(icerik => icerik.tur === "film");
  const diziler = filtrelenmisVeSiraliListe.filter(icerik => icerik.tur === "dizi");

  if (yetkiYukleniyor) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Yükleniyor...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-gray-100 min-h-screen font-sans selection:bg-indigo-500 selection:text-white relative flex flex-col overflow-x-hidden">
      {/* Background elements */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] z-0 pointer-events-none animasyon-yavas"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[120px] z-0 pointer-events-none animasyon-yavas-ters"></div>

      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-1.5 rounded-lg shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

          <div className="flex items-center gap-1 sm:gap-3">
            {kullanici ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300 hidden sm:block">
                  Merhaba, <b className={kullanici.yoneticiMi ? "text-indigo-400" : ""}>{kullanici.kullaniciAdi}</b>
                </span>
                <button
                  onClick={cikisTiklamaIsle}
                  className="text-sm font-semibold text-white bg-red-500/80 hover:bg-red-500 backdrop-blur-md border border-red-400/50 px-4 py-2 rounded-xl transition-all shadow-lg"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => girisModaliAyarla(true)}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-white/10"
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => kayitModaliAyarla(true)}
                  className="text-sm font-semibold text-white bg-indigo-500/80 hover:bg-indigo-500 backdrop-blur-md border border-indigo-400/50 px-4 sm:px-5 py-2 rounded-xl transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-1.5 group"
                >
                  Kayıt Ol
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {kullanici?.yoneticiMi ? (
        <YoneticiPaneli />
      ) : (
        <main className="max-w-5xl mx-auto px-4 mt-8 relative z-10 flex-1 w-full">
          {kullanici ? (
            <>
              <IcerikEklemeFormu icerikEkle={icerikEklemeIslemi} />
              
              {hataMesaji && (
                <div className="mt-4 mb-4 bg-red-500/20 backdrop-blur-md border border-red-500/40 text-red-200 px-4 py-3 rounded-xl text-sm font-medium items-center gap-2 flex">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{hataMesaji}</span>
                </div>
              )}

              <Istatistikler icerikler={icerikListesi} />

              {icerikListesi.length > 0 && (
                <FiltreSiralamaCubugu 
                  aramaSorgusu={aramaSorgusu}
                  aramaSorgusuAyarla={aramaSorgusuAyarla}
                  siralamaTuru={siralamaTuru}
                  siralamaTuruAyarla={siralamaTuruAyarla}
                />
              )}

              <IcerikListesi 
                filmler={filmler}
                diziler={diziler}
                filtreliListeBosMu={icerikListesi.length > 0 && filtrelenmisVeSiraliListe.length === 0}
                silindi={icerikSil}
                durumDegisti={durumDegistir}
              />
              
              {icerikListesi.length === 0 && (
                <div className="flex-col items-center justify-center py-20 text-center flex">
                  <div className="w-24 h-24 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center mb-4 text-gray-400 shadow-xl mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="m9 8 6 4-6 4Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-200">Listeniz şu an boş.</h3>
                  <p className="text-gray-400 mt-2">
                    Yukarıdaki formu kullanarak yeni filmler ve diziler ekleyin.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex-col items-center justify-center py-32 text-center flex mt-10">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6 drop-shadow-lg">
                Film ve Dizi Dünyanıza Hoş Geldiniz
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                İzlediğiniz, yarım bıraktığınız veya izlemek istediğiniz yapımları listeleyin.
                Profesyonel takip platformunuza başlamak için hemen giriş yapın.
              </p>
              <button
                onClick={() => kayitModaliAyarla(true)}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-all transform hover:-translate-y-1"
              >
                Ücretsiz Kayıt Olun
              </button>
            </div>
          )}
        </main>
      )}

      <AltBilgi />

      {/* Delete Modal */}
      <Pencere acikMi={!!silinecekId} kapat={() => setSilinecekId(null)}>
        <div className="bg-gray-900 border border-white/10 p-6 rounded-3xl shadow-2xl w-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">İçeriği Sil</h3>
            <p className="text-gray-400 text-sm mb-6">
              Bu içeriği listenden kaldırmak istediğine emin misin? Bu işlem geri alınamaz.
            </p>

            <div className="flex w-full gap-3">
              <button onClick={() => setSilinecekId(null)} className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 font-medium transition-colors">İptal</button>
              <button onClick={icerigiGercektenSil} className="flex-1 py-3 px-4 bg-red-500/80 hover:bg-red-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-red-500/20">Evet, Sil</button>
            </div>
          </div>
        </div>
      </Pencere>

      {/* Login Modal */}
      <Pencere acikMi={girisModaliAcikMi} kapat={() => girisModaliAyarla(false)}>
        <div className="bg-gray-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.15)] w-full">
          <button onClick={() => girisModaliAyarla(false)} className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center mb-4 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Tekrar Hoş Geldiniz</h3>
            <p className="text-gray-400 text-sm">Hesabınıza giriş yaparak listelerinizi yönetin.</p>
          </div>

          {yetkiHatasi && <div className="mb-4 text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg">{yetkiHatasi}</div>}

          <form onSubmit={girisGonderimiIsle} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">E-posta Adresi</label>
              <input 
                type="email" required placeholder="ornek@mail.com" 
                value={girisFormu.eposta} onChange={e => girisFormuAyarla({...girisFormu, eposta: e.target.value})}
                className="w-full bg-black/30 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Şifre</label>
              <input 
                type="password" required placeholder="••••••••" 
                value={girisFormu.sifre} onChange={e => girisFormuAyarla({...girisFormu, sifre: e.target.value})}
                className="w-full bg-black/30 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-500" 
              />
            </div>
            <button type="submit" className="w-full py-3.5 mt-4 bg-indigo-500/90 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/30 flex justify-center items-center gap-2 border border-indigo-400/50 backdrop-blur-md">
              Giriş Yap
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Hesabınız yok mu?
            <button onClick={() => modallarArasiGecis('giris')} className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors ml-1">
              Hemen kayıt olun
            </button>
          </div>
        </div>
      </Pencere>

      {/* Register Modal */}
      <Pencere acikMi={kayitModaliAcikMi} kapat={() => kayitModaliAyarla(false)}>
        <div className="bg-gray-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.15)] w-full">
          <button onClick={() => kayitModaliAyarla(false)} className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mb-4 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Movix'e Katılın</h3>
            <p className="text-gray-400 text-sm">Kişisel takip listenizi oluşturmaya başlayın.</p>
          </div>

          {yetkiHatasi && <div className="mb-4 text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg">{yetkiHatasi}</div>}

          <form onSubmit={kayitGonderimiIsle} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Kullanıcı Adı</label>
              <input 
                type="text" required placeholder="Kullanıcı adınız" 
                value={kayitFormu.kullaniciAdi} onChange={e => kayitFormuAyarla({...kayitFormu, kullaniciAdi: e.target.value})}
                className="w-full bg-black/30 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">E-posta Adresi</label>
              <input 
                type="email" required placeholder="ornek@mail.com" 
                value={kayitFormu.eposta} onChange={e => kayitFormuAyarla({...kayitFormu, eposta: e.target.value})}
                className="w-full bg-black/30 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Şifre</label>
              <input 
                type="password" required placeholder="••••••••" 
                value={kayitFormu.sifre} onChange={e => kayitFormuAyarla({...kayitFormu, sifre: e.target.value})}
                className="w-full bg-black/30 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500" 
              />
            </div>
            <button type="submit" className="w-full py-3.5 mt-4 bg-purple-600/90 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-500/30 flex justify-center items-center gap-2 border border-purple-400/50 backdrop-blur-md">
              Kayıt Ol
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Zaten bir hesabınız var mı?
            <button onClick={() => modallarArasiGecis('kayit')} className="text-purple-400 hover:text-purple-300 font-semibold transition-colors ml-1">
              Giriş yapın
            </button>
          </div>
        </div>
      </Pencere>

      {/* Logout Modal */}
      <Pencere acikMi={cikisModaliAcikMi} kapat={() => cikisModaliAyarla(false)}>
        <div className="bg-gray-900 border border-white/10 p-6 rounded-3xl shadow-2xl w-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Çıkış Yap</h3>
            <p className="text-gray-400 text-sm mb-6">
              Oturumunuzu kapatarak çıkış yapmak istediğinize emin misiniz?
            </p>

            <div className="flex w-full gap-3">
              <button onClick={() => cikisModaliAyarla(false)} className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 font-medium transition-colors">İptal</button>
              <button onClick={cikisiOnayla} className="flex-1 py-3 px-4 bg-red-500/80 hover:bg-red-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-red-500/20">Evet, Çıkış Yap</button>
            </div>
          </div>
        </div>
      </Pencere>

      {/* Scroll to Top Button */}
      {yukariCikGoster && (
        <button
          onClick={yukariCik}
          className="fixed bottom-6 right-6 bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1 z-50 flex items-center justify-center group"
          title="Yukarı Çık"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
