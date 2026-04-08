const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ara katman
app.use(cors());
app.use(express.json());

// rotalar
app.use('/api/kimlik', require('./routes/kimlik'));
app.use('/api/icerikler', require('./routes/icerik'));
app.use('/api/yonetici', require('./routes/yonetici'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
