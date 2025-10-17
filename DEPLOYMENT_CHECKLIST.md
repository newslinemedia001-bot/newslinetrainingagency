# 🚀 Deployment Checklist

## ✅ What I've Fixed

### 1. **Netlify Build Error** ✅
- Removed `firebase-admin` dependency (caused webpack errors)
- Updated `next.config.js` with proper webpack configuration
- Set Node.js version to 18.17.0 in `netlify.toml`
- Fixed import issues with Firebase client SDK

### 2. **Color Scheme** ✅
- Changed from **purple-heavy** to **red-focused** design
- Updated ALL components to use red (#DC2626) instead of purple
- Matches newsline.co.ke branding
- Components updated:
  - Header
  - Hero
  - Footer  
  - Categories
  - Application Form
  - Contact Section
  - Admin Dashboard

### 3. **Logo Integration** ✅
- Added logo image support in:
  - **Header** (top left navigation)
  - **Hero** (center of homepage)
  - **Footer** (bottom of pages)
- Uses Next.js Image component for optimization
- Logo path: `/public/logo.png`

---

## 📋 What You Need to Do

### STEP 1: Add Your Logo Image 🎨
```
1. Take the logo image I showed you (the one you uploaded)
2. Save it as: logo.png
3. Place it in: /public/logo.png
```
**Important:** The file MUST be named exactly `logo.png` (lowercase)

### STEP 2: Create .env.local File 🔐
Create a file named `.env.local` in the project root with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDFWrH8TOK2XqftYt5aA1vflRMdBX9VzTA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=newslinetrainingagency.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=newslinetrainingagency
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=newslinetrainingagency.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=943261558505
NEXT_PUBLIC_FIREBASE_APP_ID=1:943261558505:web:8e9dd779df750a560c7278
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-E4BB0WX0XZ

# Email Configuration
EMAIL_USER=newslinemedia001@gmail.com
EMAIL_APP_PASSWORD=<YOUR_GOOGLE_APP_PASSWORD_HERE>
RECIPIENT_EMAIL=linkcontentdevelopers@gmail.com
```

### STEP 3: Get Google App Password 📧
```
1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification" (if not enabled)
3. Click "App passwords"
4. Generate password for "Mail" + "Windows Computer"
5. Copy the 16-character password (no spaces)
6. Paste into .env.local as EMAIL_APP_PASSWORD
```

### STEP 4: Setup Firebase 🔥
```
1. Go to: https://console.firebase.google.com/project/newslinetrainingagency
2. Click "Firestore Database" → "Create database"
   - Choose "Production mode"
   - Select location (us-central or closest to Kenya)
3. Click "Authentication" → "Get started"
   - Enable "Email/Password" sign-in method
4. Click "Authentication" → "Users" → "Add user"
   - Email: admin@newsline.co.ke (or your choice)
   - Password: (create a strong password)
   - Save these credentials!
```

### STEP 5: Test Locally 🧪
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit: http://localhost:3000

**Test:**
- ✅ Logo appears in header, hero, footer
- ✅ Colors are red (not purple)
- ✅ Fill out application form
- ✅ Check email arrives at linkcontentdevelopers@gmail.com
- ✅ Visit /admin and login
- ✅ View submitted application in dashboard

### STEP 6: Deploy to Netlify 🌐
```
1. Push code to GitHub:
   git init
   git add .
   git commit -m "Newsline Training Agency website"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main

2. Go to: https://app.netlify.com
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub → Select your repository
5. Build settings:
   - Build command: npm run build
   - Publish directory: .next
   - Node version: 18.17.0 (auto-set)
6. Add environment variables (same as .env.local):
   - Site settings → Environment variables → Add variable
   - Add ALL variables from your .env.local file
7. Click "Deploy site"
```

---

## 🎯 Final Checks

Before going live, verify:

- [ ] Logo displays correctly on all pages
- [ ] All colors are red (no purple anywhere)
- [ ] Application form works
- [ ] Emails are sent to linkcontentdevelopers@gmail.com
- [ ] Admin can login at /admin
- [ ] Applications appear in admin dashboard
- [ ] Can update application status
- [ ] Can export to CSV
- [ ] Mobile responsive design works
- [ ] Contact information is correct
- [ ] Google Maps link works

---

## 📞 Contact Info Displayed

- **Email:** linkcontentdevelopers@gmail.com
- **Phone:** +254 720 933350  
- **Location:** https://maps.app.goo.gl/zQvUsuzZiEQoodvS6

---

## 🐛 Troubleshooting

### Logo not showing?
- Ensure file is named exactly `logo.png` (lowercase)
- Check it's in `/public` folder
- Clear browser cache (Ctrl + Shift + R)

### Build fails on Netlify?
- Check all environment variables are added
- Verify Node version is 18.17.0+
- Check build logs for specific errors

### Emails not sending?
- Verify Google App Password (no spaces)
- Check 2-Step Verification is ON
- Regenerate App Password if needed

### Admin login fails?
- Confirm user exists in Firebase Authentication
- Check email/password are correct
- Verify Firebase Auth is enabled

---

## 📦 Project Stats

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Firebase Firestore  
- **Auth:** Firebase Authentication
- **Email:** Nodemailer (Gmail SMTP)
- **Deployment:** Netlify
- **Build Time:** ~2-3 minutes

---

## ✨ Features

- Modern red-themed UI
- Logo in header, hero, footer
- 8 professional categories
- Smart application form
- Real-time data storage
- Email notifications
- Admin dashboard
- Status tracking
- CSV export
- Mobile responsive
- Google Maps integration

---

## 🎉 You're Ready!

Everything is configured and ready to deploy. Just:
1. Add your logo
2. Set up environment variables  
3. Configure Firebase
4. Test locally
5. Deploy to Netlify

**Good luck!** 🚀

---

Questions? Contact: linkcontentdevelopers@gmail.com
