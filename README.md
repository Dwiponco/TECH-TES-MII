# TECH-TES-MII

# Instruksi Menjalankan Program


```bash
# Masuk ke folder proyek
cd PROJECT_FOLDER

# Jalankan Docker Compose
docker-compose up

# Instal dependensi
npm install

# Migrasi basis data
npx sequelize-cli db:migrate

# Jalankan seed
npx sequelize-cli db:seed:all

# Jalankan program
npm run start:dev
