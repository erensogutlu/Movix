const jwt = require('jsonwebtoken');

const yetkiKatmani = (req, res, next) => {
  const jeton = req.header('Authorization')?.split(' ')[1]; // Bearer <jeton>

  if (!jeton) {
    return res.status(401).json({ message: 'Yetkilendirme reddedildi, jeton bulunamadı.' });
  }

  try {
    const cozulmus = jwt.verify(jeton, process.env.JWT_SECRET);
    req.kullanici = cozulmus; // req.kullanici.id
    next();
  } catch (err) {
    res.status(401).json({ message: 'Jeton geçersiz.' });
  }
};

module.exports = yetkiKatmani;
