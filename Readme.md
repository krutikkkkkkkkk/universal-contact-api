# 📬 Universal Contact Form API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-Frontend--Backend-black.svg)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email--Service-yellow.svg)

A minimal, reusable Node.js backend to handle **contact form submissions** across multiple websites. Built with **Next.js API routes** and Nodemailer. Perfect for portfolio sites, SaaS projects, or client websites.

---

## Features

- Dynamic body parsing — accepts **any fields** from contact forms
- Sends emails using **Gmail SMTP** with App Password
- CORS-enabled — usable from any frontend domain
- Environment-secured credentials
- Easily deployable to Vercel or other platforms supporting Next.js

---

## Setup Instructions

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/krutikkkkkkkkk/universal-contact-api.git
cd universal-contact-api
npm install
```

### 2. Create .env.local File
```env
GMAIL_USER="yourgmail@gmail.com"
APP_PASS="yourapppassword"
TO_EMAIL="recipient@gmail.com"
ACCESS_ORIGIN="http://localhost:5173,http://localhost:3000,https://yourdomain.com"
```
⚠️ Use a Gmail App Password if you have 2FA enabled.

### 3. Start the Development Server
```bash
npm run dev
```
Server runs on http://localhost:3000 by default.

---

## API Endpoint

**POST** `/api/contact`
- Content-Type: application/json

Request Body: Accepts any key-value pairs (dynamic):
```json
{
  "name": "Krutik",
  "email": "krutik@infinitylinkage.com",
  "subject": "Let's Collaborate",
  "message": "Loved your project!",
  "website": "infinitylinkage.com"
}
```

### Example Email Output
```html
<h2>Contact Form Submission</h2>
<p><strong>name:</strong> Krutik</p>
<p><strong>email:</strong> krutik@infinitylinkage.com</p>
<p><strong>subject:</strong> Let's Collaborate</p>
<p><strong>message:</strong> Loved your project!</p>
<p><strong>website:</strong> infinitylinkage.com</p>
```

### Frontend Example
```javascript
await fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "User",
    email: "user@example.com",
    message: "Hello from my site!",
  }),
});
```

---

## Deployment

You can host this API on:

- **Vercel** — Native support for Next.js
- **Render**
- **Railway**
- **Your own VPS** (PM2 + NGINX recommended)

---

## 📱 Connect with Me

Follow me on X (Twitter) for updates and more projects: [@krutikkkkkkkkk](https://x.com/krutikkkkkkkkk)
