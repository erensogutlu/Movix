const express = require('express');
const router = express.Router();
const havuz = require('../db');
const yetki = require('../middleware/yetki');

// @route   get /api/icerikler
// @desc    giris yapili kullanici icin tum icerikleri getir
router.get('/', yetki, async (req, res) => {
  try {
    const icerikler = await havuz.query(
      'SELECT * FROM contents WHERE user_id = $1 ORDER BY created_at DESC',
      [req.kullanici.id]
    );
    const donusturulmusIcerikler = icerikler.rows.map(satir => ({
      ...satir,
      olusturulmaTarihi: satir.created_at,
      eklenmeTarihi: satir.eklenme_tarihi
    }));
    res.json(donusturulmusIcerikler);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

// @route   post /api/icerikler
// @desc    yeni icerik ekle
router.post('/', yetki, async (req, res) => {
  try {
    const { isim, tur, durum } = req.body;
    const eklenme_tarihi = new Date().toLocaleDateString('tr-TR');

    const yeniIcerik = await havuz.query(
      'INSERT INTO contents (user_id, isim, tur, durum, eklenme_tarihi) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.kullanici.id, isim, tur, durum, eklenme_tarihi]
    );

    res.json({
      ...yeniIcerik.rows[0],
      olusturulmaTarihi: yeniIcerik.rows[0].created_at,
      eklenmeTarihi: yeniIcerik.rows[0].eklenme_tarihi
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

// @route   put /api/icerikler/:id/durum
// @desc    icerik durumunu guncelle (izlenecek, izleniyor, izlendi)
router.put('/:id/status', yetki, async (req, res) => {
  try {
    const { id } = req.params;
    const { durum } = req.body;

    const icerik = await havuz.query('SELECT * FROM contents WHERE id = $1 AND user_id = $2', [id, req.kullanici.id]);
    
    if (icerik.rows.length === 0) {
      return res.status(404).json({ message: 'İçerik bulunamadı veya yetkiniz yok.' });
    }

    const guncellenenIcerik = await havuz.query(
      'UPDATE contents SET durum = $1 WHERE id = $2 RETURNING *',
      [durum, id]
    );

    res.json({
      ...guncellenenIcerik.rows[0],
      olusturulmaTarihi: guncellenenIcerik.rows[0].created_at,
      eklenmeTarihi: guncellenenIcerik.rows[0].eklenme_tarihi
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

// @route   delete /api/icerikler/:id
// @desc    icerik sil
router.delete('/:id', yetki, async (req, res) => {
  try {
    const { id } = req.params;

    const icerik = await havuz.query('SELECT * FROM contents WHERE id = $1 AND user_id = $2', [id, req.kullanici.id]);
    
    if (icerik.rows.length === 0) {
      return res.status(404).json({ message: 'İçerik bulunamadı veya yetkiniz yok.' });
    }

    await havuz.query('DELETE FROM contents WHERE id = $1', [id]);

    res.json({ message: 'İçerik silindi.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

module.exports = router;
