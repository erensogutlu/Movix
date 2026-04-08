/* Movix – Film & Dizi Takip Uygulaması */

Movix, izlediğin, yarım bıraktığın veya izlemek istediğin film ve dizileri tek bir yerde yönetmeni sağlayan modern bir içerik takip platformudur.

* Özellikler : 

 -> İzlenen / izlenecek / yarım kalan içerikleri takip etme
 -> Kişisel liste oluşturma
 -> JWT ile güvenli kullanıcı sistemi
 -> Tam responsive (mobil, tablet, desktop)

* Kullanılan Teknolojiler :

    Frontend : 

   -> React.js
   -> Vite
   -> Tailwind CSS

    Backend :

   -> Node.js
   -> Express.js
   -> PostgreSQL

* Geliştirici : Eren Söğütlü

-----------------------------------------------------------------------------------------------------------------

/* Movix – Movie & TV Series Tracking Application */

Movix is a modern content tracking platform that allows you to manage the movies and TV series you have watched, left unfinished or want to watch in one place.

* Features : 

 -> Keeping track of watched / to be watched / unfinished contents 
 -> Creating a personal list 
 -> Secure user system with JWT 
 -> Fully responsive (mobile, tablet, desktop)

* Technologies Used : 

Frontend : 

 -> React.js 
 -> Vite 
 -> Tailwind CSS 

Backend : 

 -> Node.js 
 -> Express.js 
 -> PostgreSQL

* Developer : Eren Söğütlü

-----------------------------------------------------------------------------------------------------------------

## Kurulum ve Çalıştırma

### 1. Gerekli Paketlerin Yüklenmesi

Ana dizinde:

```bash
npm install
```

Backend için:

```bash
cd server
npm install
```

---

### 2. Çevre Değişkenleri Ayarları (.env)

Backend için `.env` dosyasını oluştur:

```bash
cp server/.env.example server/.env
```

İçeriğini doldur:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
ADMIN_SECRET=your_admin_secret
```

Frontend için `.env.local` oluştur:

```bash
cp .env.local.example .env.local
```

```env
VITE_API_URL=http://localhost:5000
```

---

### 3. Projeyi Çalıştırma

Kurulum tamamlandıktan sonra iki ayrı terminal kullanın:

#### Backend (Arka Yüz)

```bash
cd server
npm run dev
# veya
npm start
```

> Sunucu: http://localhost:5000

---

#### Frontend (Ön Yüz)

```bash
npm run dev
```

> Uygulama: http://localhost:5173

-----------------------------------------------------------------------------------------------------------------

## Installation and Operation

### 1. Installing Required Packages

In the main directory:

```bash
npm install
```

For backend:

```bash
cd server
npm install
```

---

### 2. Environment Variables Settings (.env)

Create `.env` file for backend:

```bash
cp server/.env.example server/.env
```

Fill in the content:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
ADMIN_SECRET=your_admin_secret
```

Create `.env.local` for frontend:

```bash
cp .env.local.example .env.local
```

```env
VITE_API_URL=http://localhost:5000
```

---

### 3. Running the Project

Once the installation is complete, use two separate terminals:

#### Backend

```bash
cd server
npm run dev
# or
npm start
```

> Server: http://localhost:5000

---

#### Frontend

```bash
npm run dev
```

> Application: http://localhost:5173
