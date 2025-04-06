# 🔐 Next.js Authentication App

A full-stack authentication system built with **Next.js 13+ (App Router)**, **TypeScript**, **MongoDB**, and **Nodemailer**. Features include:

- User Sign Up / Login
- Email Verification
- Password Reset via Email
- JWT-based Authentication
- MongoDB for user data storage
- Mailtrap for email testing

---

## 🚀 Tech Stack

- **Frontend**: Next.js 13+, React, Tailwind CSS
- **Backend**: Node.js (API Routes via App Router), JWT, bcryptjs
- **Database**: MongoDB (via Mongoose)
- **Email Service**: Nodemailer + Mailtrap (SMTP testing)
- **Session/Cookie**: JWT stored in HttpOnly cookies

---

## 📁 Folder Structure

/app ├── login/ ├── signup/ ├── verifyemail/ ├── forgotpassword/ └── changepassword/

/models └── userModel.ts

/api └── users/ ├── login/ ├── signup/ ├── verifyemail/ ├── forgotpassword/ └── changepassword/

/utils └── mailer.ts

/dbConfig └── dbConfig.ts

---

## 🧪 Features

### ✅ User Signup

- Registers user and sends email verification link.

### ✅ User Login

- Verifies credentials and sets JWT token in HttpOnly cookie.

### ✅ Email Verification

- Token-based verification via secure link.

### ✅ Forgot Password

- Sends reset password link to registered email.
- Password is updated securely using a hashed token.

---

## 🔧 Setup Instructions

### 1. Clone the repo

git clone https://github.com/your-username/next-auth-app.git
cd next-auth-app

### 2. Install dependencies

npm install

### 3. Set up .env.local

MONGODB_URI=mongodb+srv://<your-mongo-db-uri>
TOKEN_SECRET=your-secret-key
DOMAIN=http://localhost:3000

Use Mailtrap for email testing and configure credentials in mailer.ts.

### 4. Run the app

npm run dev

📬 Email Testing with Mailtrap
Go to Mailtrap
Create a new inbox
Get your SMTP credentials
Replace them inside /utils/mailer.ts

📸 Screens

### Page

#### /signup - Create new user and verify

#### /login - Login with email & password

#### /verifyemail - Confirms account verification

#### /forgotpassword - Sends a reset password email

#### /changepassword - Lets user enter new password

#### /profile - Protected page after login
