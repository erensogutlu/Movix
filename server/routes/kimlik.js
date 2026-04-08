const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const havuz = require('../db');

// @route   post /api/kimlik/kayit
// @desc    yeni kullanici kaydet
router.post('/kayit', async (req, res) => {
  try {
    const { kullaniciAdi, eposta, sifre } = req.body;

    const kullaniciMevcutMu = await havuz.query('SELECT * FROM users WHERE email = $1', [eposta]);
    if (kullaniciMevcutMu.rows.length > 0) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor.' });
    }

    const salt = await bcrypt.genSalt(10);
    const sifrelenmisSifre = await bcrypt.hash(sifre, salt);

    const yeniKullanici = await havuz.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, is_admin',
      [kullaniciAdi, eposta, sifrelenmisSifre]
    );

    const veriYuku = { id: yeniKullanici.rows[0].id };
    const jeton = jwt.sign(veriYuku, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ 
      jeton, 
      kullanici: { 
        id: yeniKullanici.rows[0].id, 
        kullaniciAdi: yeniKullanici.rows[0].username, 
        eposta: yeniKullanici.rows[0].email, 
        yoneticiMi: yeniKullanici.rows[0].is_admin 
      } 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Sunucu hatası', detay: err.message });
  }
});

// @route   post /api/kimlik/giris
// @desc    kullaniciyi dogrula ve jeton al
router.post('/giris', async (req, res) => {
  try {
    const { eposta, sifre } = req.body;

    const kullanici = await havuz.query('SELECT * FROM users WHERE email = $1', [eposta]);
    if (kullanici.rows.length === 0) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const eslesiyorMu = await bcrypt.compare(sifre, kullanici.rows[0].password_hash);
    if (!eslesiyorMu) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const veriYuku = { id: kullanici.rows[0].id };
    const jeton = jwt.sign(veriYuku, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      jeton, 
      kullanici: { 
        id: kullanici.rows[0].id, 
        kullaniciAdi: kullanici.rows[0].username, 
        eposta: kullanici.rows[0].email, 
        yoneticiMi: kullanici.rows[0].is_admin 
      } 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Sunucu hatası', detay: err.message });
  }
});

// @route   post /api/kimlik/yonetici-yap
// @desc    gizli anahtar kullanarak bir kullaniciyi yonetici yap
router.post('/yonetici-yap', async (req, res) => {
  try {
    const { eposta, yoneticiAnahtari } = req.body;

    if (yoneticiAnahtari !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: 'Geçersiz ADMIN yetkisi şifresi.' });
    }

    const kullanici = await havuz.query('SELECT * FROM users WHERE email = $1', [eposta]);
    if (kullanici.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    await havuz.query('UPDATE users SET is_admin = true WHERE email = $1', [eposta]);

    res.json({ message: `${eposta} başarıyla Admin yapıldı!` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

module.exports = router;
