# Newsline Training Agency Website

A modern Next.js website for managing attachment/internship applications.

## 🎉 Recent Updates

### ✅ Fixed Issues:
1. **Netlify Build Error** - Removed firebase-admin dependency and fixed webpack configuration
2. **Color Scheme** - Updated from purple-heavy to red-focused design matching newsline.co.ke
3. **Logo Integration** - Added logo image to header, hero, and footer sections

### 🎨 Design Updates:
- Primary color: **Red (#DC2626)**
- Accent color: **Dark Red (#B91C1C)** 
- Removed excessive purple - now using red throughout
- Logo displays in navigation bar (top left corner)
- Cleaner, more professional look matching Newsline brand

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Logo Image
**IMPORTANT:** You need to add your logo image:
1. Place your `logo.png` file in the `/public` folder
2. Make sure it's named exactly `logo.png`

### 3. Create Environment Variables
Create `.env.local` file:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDFWrH8TOK2XqftYt5aA1vflRMdBX9VzTA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=newslinetrainingagency.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=newslinetrainingagency
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=newslinetrainingagency.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=943261558505
NEXT_PUBLIC_FIREBASE_APP_ID=1:943261558505:web:8e9dd779df750a560c7278
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-E4BB0WX0XZ

# Email (Gmail)
EMAIL_USER=newslinemedia001@gmail.com
EMAIL_APP_PASSWORD=your_google_app_password_here
RECIPIENT_EMAIL=newslinedigitaltv@gmail.com
```

### 4. Setup Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/project/newslinetrainingagency)
2. Enable **Firestore Database** (Production mode)
3. Enable **Authentication** → Email/Password
4. Create an admin user

### 5. Get Google App Password
1. Visit https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Generate App Password for Mail
4. Add to `.env.local` as `EMAIL_APP_PASSWORD`

### 6. Run Locally
```bash
npm run dev
```
Visit http://localhost:3000

---

## 📦 Deploy to Netlify

### Build Settings:
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 18.17.0 (set automatically)

### Environment Variables to Add in Netlify:
Add all variables from `.env.local` in:
**Site settings → Environment variables**

### Deployment Steps:
1. Push code to GitHub
2. Connect repository to Netlify
3. Add environment variables
4. Deploy!

---

## 📂 Project Structure

```
newslinetrainingagency/
├── app/
│   ├── admin/page.tsx              # Admin dashboard
│   ├── api/submit-application/     # Form API
│   ├── globals.css                 # Global styles
│   └── page.tsx                    # Home page
├── components/
│   ├── ApplicationForm.tsx         # Application form
│   ├── Categories.tsx              # Categories display
│   ├── Contact.tsx                 # Contact section
│   ├── Footer.tsx                  # Footer with logo
│   ├── Header.tsx                  # Header with logo
│   └── Hero.tsx                    # Hero with logo
├── lib/
│   ├── categories.ts               # Category definitions
│   └── firebase.ts                 # Firebase config
├── public/
│   └── logo.png                    # YOUR LOGO HERE
├── .env.local                      # Environment variables (create this)
└── package.json                    # Dependencies
```

---

## 🎨 Features

### Public Features:
- Modern, responsive design (red-focused color scheme)
- Logo integration in header, hero, and footer
- 8 professional categories
- Easy application form with validation
- Real-time Firebase data storage
- Automated email notifications
- Google Maps integration
- Mobile-friendly design

### Admin Features:
- Secure email/password authentication
- View all applications
- Filter by status (Pending/Reviewed/Contacted)
- Update application status
- View detailed applicant info
- Export to CSV
- Direct contact links

---

## 📧 Contact Information

- **Email:** newslinedigitaltv@gmail.com
- **Phone:** 0742577038
- **Map:** https://maps.app.goo.gl/zQvUsuzZiEQoodvS6

---

## 🐛 Troubleshooting

### Build fails on Netlify
- Ensure Node version is 18.17.0+
- Check all environment variables are added
- Remove `node_modules` and reinstall: `npm ci`

### Logo not showing
- Make sure `logo.png` exists in `/public` folder
- Check file name is exactly `logo.png` (case-sensitive)
- Clear browser cache

### Emails not sending
- Verify Google App Password is correct (no spaces)
- Check 2-Step Verification is enabled
- Regenerate App Password if needed

### Admin login not working
- Confirm admin user exists in Firebase Authentication
- Check Firebase Auth is enabled
- Verify email/password are correct

---

## 📝 Categories Available

1. Media
2. Public Relations
3. Film Production
4. Graphic and Design
5. Animation and Video Editing
6. Scripting
7. Photography
8. Computer Science / IT
   - Cybersecurity
   - Mobile Development (Android)
   - Mobile Development (iOS)
   - Web Development
   - Web Design
   - Networking
   - Graphic Design

---

## 🔒 Security

- Firebase rules need to be configured for production
- Environment variables protected via `.gitignore`
- Admin authentication required for dashboard
- Email passwords use App Passwords (not main password)

---

## 📄 License

© 2024 Newsline Training Agency. All rights reserved.

---

## 🆘 Support

For issues or questions, contact: newslinedigitaltv@gmail.com
