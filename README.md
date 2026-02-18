# ERP Aero API

Simple REST API with authentication and file management.

---

## Setup & Run

1. **Install dependencies:**

```bash
npm install


2. Create `.env` in the project root with:

PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=erp_user
DB_PASSWORD=erp_pass
DB_NAME=erp_aero

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=3600
REFRESH_EXPIRE=86400



3. Start MySQL (Docker only for DB):

docker-compose up -d

4. Run the server:

npm run dev


Server will be available at `http://localhost:3000`.

---

## API Endpoints

**Auth:**

- `POST /signup` – register new user  
- `POST /signin` – login  
- `POST /new_token` – refresh access token  
- `POST /logout` – logout  
- `GET /info` – get user id 

**Files:**

- `POST /file/upload` – upload file  
- `GET /file/list?page=1&list_size=10` – list files with pagination  
- `GET /file/:id` – file info  
- `GET /file/download/:id` – download file  
- `PUT /file/update/:id` – update file  
- `DELETE /file/delete/:id` – delete file  

---

**Notes:**

- Node.js runs locally, Docker is used only for MySQL.  
- Database persists in Docker volume `db_data`.  
- Ensure `.env` matches credentials in `docker-compose.yml`.
