import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const KimlikBaglami = createContext();

export const kimlikKullan = () => useContext(KimlikBaglami);

export const KimlikSaglayici = ({ children }) => {
  const [kullanici, kullaniciAyarla] = useState(null);
  const [yukleniyor, yukleniyorAyarla] = useState(true);

  useEffect(() => {
    // bilesen mount oldugunda giris yapilmis mi kontrol et
    const girisKontrol = () => {
      const jeton = localStorage.getItem('jeton');
      const kayitliKullanici = localStorage.getItem('kullanici');
      if (jeton && kayitliKullanici) {
        kullaniciAyarla(JSON.parse(kayitliKullanici));
      }
      yukleniyorAyarla(false);
    };
    girisKontrol();
  }, []);

  const girisYap = async (eposta, sifre) => {
    const res = await api.post('/kimlik/giris', { eposta, sifre });
    localStorage.setItem('jeton', res.data.jeton);
    localStorage.setItem('kullanici', JSON.stringify(res.data.kullanici));
    kullaniciAyarla(res.data.kullanici);
    return res.data;
  };

  const kayitOl = async (kullaniciAdi, eposta, sifre) => {
    const res = await api.post('/kimlik/kayit', { kullaniciAdi, eposta, sifre });
    localStorage.setItem('jeton', res.data.jeton);
    localStorage.setItem('kullanici', JSON.stringify(res.data.kullanici));
    kullaniciAyarla(res.data.kullanici);
    return res.data;
  };

  const cikisYap = () => {
    localStorage.removeItem('jeton');
    localStorage.removeItem('kullanici');
    kullaniciAyarla(null);
  };

  return (
    <KimlikBaglami.Provider value={{ kullanici, yukleniyor, girisYap, kayitOl, cikisYap }}>
      {children}
    </KimlikBaglami.Provider>
  );
};
