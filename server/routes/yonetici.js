const express = require('express');
const router = express.Router();
const havuz = require('../db');
const yetki = require('../middleware/yetki');
const yoneticiYetkisi = require('../middleware/yoneticiYetkisi');

// buradaki tum rotalar yetki ve yonetici-yetkisi ile korunmaktadir
router.use(yetki, yoneticiYetkisi);

// @route   get /api/yonetici/kullanicilar
// @desc    tum kullanicilari getir (icerik sayisi ile birlikte)
router.get('/kullanicilar', async (req, res) => {
  try {
    const kullanicilar = await havuz.query(`
      SELECT u.id, u.username, u.email, u.is_admin, u.created_at, COUNT(c.id) as content_count
      FROM users u
      LEFT JOIN contents c ON u.id = c.user_id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);
    const donusturulmusKullanicilar = kullanicilar.rows.map(satir => ({
      id: satir.id,
      kullaniciAdi: satir.username,
      eposta: satir.email,
      yoneticiMi: satir.is_admin,
      olusturulmaTarihi: satir.created_at,
      icerikSayisi: satir.content_count
    }));
    res.json(donusturulmusKullanicilar);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

// @route   get /api/yonetici/icerikler
// @desc    platformdaki tum icerikleri getir
router.get('/icerikler', async (req, res) => {
  try {
    const icerikler = await havuz.query(`
      SELECT c.*, u.username, u.email
      FROM contents c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
    `);
    const donusturulmusIcerikler = icerikler.rows.map(satir => ({
      ...satir,
      kullaniciAdi: satir.username,
      eposta: satir.email,
      olusturulmaTarihi: satir.created_at
    }));
    res.json(donusturulmusIcerikler);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

// @route   delete /api/yonetici/kullanicilar/:id
// @desc    bir kullaniciyi ve tum iceriklerini sil
router.delete('/kullanicilar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.kullanici.id) {
      return res.status(400).json({ message: 'Kendinizi silemezsiniz!' });
    }

    const sonuc = await havuz.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (sonuc.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    res.json({ message: 'Kullanıcı başarıyla silindi.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

// @route   delete /api/yonetici/icerikler/:id
// @desc    birisinin icerigini genel olarak sil
router.delete('/icerikler/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sonuc = await havuz.query('DELETE FROM contents WHERE id = $1 RETURNING id', [id]);
    if (sonuc.rows.length === 0) {
      return res.status(404).json({ message: 'İçerik bulunamadı.' });
    }

    res.json({ message: 'İçerik sistemden başarıyla silindi.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

module.exports = router;
