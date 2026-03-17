# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Running the Backend (Node/Express)

A simple backend has been added under `backend/` to support the AI chat assistant and provide basic endpoints for profile, academic, financials, attendance and faculty data.

### 1) Install & start the backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:5000`.

### 2) Run the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173`.

### 3) API Endpoints

- `GET /api/profile`
- `GET /api/academic`
- `GET /api/financials`
- `GET /api/attendance`
- `GET /api/faculty`
- `GET /api/students?batch=231|241|251&limit=100` (student list for a given registration prefix; max 100 records)
- `POST /api/send-otp` (body: `{ email }`)
- `POST /api/verify-otp` (body: `{ email, code }`)
- `POST /api/chat` (body: `{ message }`)

### 4) Configuring Nodemailer (SMTP, required for real emails)

The backend now sends OTPs via email using Nodemailer. Configure your SMTP server in `backend/.env`. When no SMTP credentials are provided, the server automatically creates an Ethereal test account and prints the OTP/credentials in the console for development.

Example `.env`:

```ini
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_smtp_username
EMAIL_PASS=your_smtp_password
EMAIL_FROM="EduParent" <no-reply@eduparent.com>
```

> ✅ **Notes:**
> - `EMAIL_PORT` should match the port offered by your SMTP provider (typically `587` for TLS or `465` for SSL).
> - Set `EMAIL_SECURE=true` only if your SMTP server requires a secure connection on port `465`.
> - `EMAIL_FROM` is the *From* header that appears in the OTP email.
> - If credentials are missing or invalid, the backend falls back to the Ethereal test account and writes the OTP to the console; no real email will be delivered.
