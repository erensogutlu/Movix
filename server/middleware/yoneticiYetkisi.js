const havuz = require('../db');

const yoneticiYetkisi = async (req, res, next) => {
  try {
    // req.kullanici yetkiden geliyor
    if (!req.kullanici || !req.kullanici.id) {
      return res.status(401).json({ message: 'Yetkisiz erişim.' });
    }

    const kullanici = await havuz.query('SELECT is_admin FROM users WHERE id = $1', [req.kullanici.id]);
    
    if (kullanici.rows.length === 0 || !kullanici.rows[0].is_admin) {
      return res.status(403).json({ message: 'Erişim reddedildi. Sadece Adminler girebilir.' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
};

module.exports = yoneticiYetkisi;
