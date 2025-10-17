# Newsline Training Agency - Complete Setup Guide

This guide will walk you through setting up and running the Newsline Training Agency website locally and deploying it to Netlify.

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] Node.js 18 or higher installed
- [ ] npm installed
- [ ] A Firebase project (already created: newslinetrainingagency)
- [ ] A Gmail account (newslinemedia001@gmail.com)
- [ ] Access to Firebase Console
- [ ] A code editor (VS Code recommended)

---

## 🚀 Step 1: Install Dependencies

1. Open your terminal/command prompt
2. Navigate to the project directory:
   ```bash
   cd c:\Users\PC\Documents\projects\newslinetrainingagency
   ```

3. Install all required packages:
   ```bash
   npm install
   ```

This will install Next.js, React, Firebase, Tailwind CSS, and all other dependencies.

---

## 🔥 Step 2: Firebase Setup

### 2.1 Enable Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **newslinetrainingagency**
3. Click **Firestore Database** in the left sidebar
4. Click **Create database**
5. Select **Start in production mode**
6. Choose your preferred location (e.g., us-central)
7. Click **Enable**

### 2.2 Enable Authentication

1. In Firebase Console, click **Authentication** in the left sidebar
2. Click **Get started**
3. Click on **Email/Password** under Sign-in providers
4. Toggle **Enable** to ON
5. Click **Save**

### 2.3 Create Admin User

1. Still in **Authentication**, click the **Users** tab
2. Click **Add user**
3. Enter your admin email (e.g., admin@newsline.co.ke)
4. Enter a strong password
5. Click **Add user**

**Important**: Save these credentials - you'll need them to access the admin dashboard!

---

## 📧 Step 3: Get Google App Password

To send emails, you need a Google App Password:

1. Go to https://myaccount.google.com/
2. Click **Security** in the left menu
3. Under "How you sign in to Google", find **2-Step Verification**
   - If not enabled, click it and follow the setup process
   - If already enabled, continue to next step
4. Scroll down and click **App passwords**
5. In the dropdown, select:
   - **App**: Mail
   - **Device**: Windows Computer (or your device)
6. Click **Generate**
7. Copy the 16-character password (remove any spaces)
8. Save it securely - you'll use it in the next step

**Example App Password format**: `abcd efgh ijkl mnop` → Use as `abcdefghijklmnop`

---

## 🔐 Step 4: Create Environment Variables File

1. In the project root directory, create a new file named `.env.local`
2. Copy and paste the following content:

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
EMAIL_APP_PASSWORD=paste_your_google_app_password_here
RECIPIENT_EMAIL=linkcontentdevelopers@gmail.com
```

3. Replace `paste_your_google_app_password_here` with the App Password you generated in Step 3
4. Save the file

**Important**: Never commit this file to Git! It's already in .gitignore.

---

## 🧪 Step 5: Test Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. You should see output like:
   ```
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Ready in 3.2s
   ```

3. Open your browser and go to http://localhost:3000

4. Test the following:
   - [ ] Homepage loads correctly with Newsline branding
   - [ ] Categories section displays all 8 categories
   - [ ] Application form is visible
   - [ ] Contact section shows correct contact information
   - [ ] Footer displays properly

5. Test the application form:
   - [ ] Fill out all required fields
   - [ ] Select a category
   - [ ] Submit the form
   - [ ] Check if you receive a success message
   - [ ] Check if email arrives at linkcontentdevelopers@gmail.com

6. Test the admin dashboard:
   - [ ] Go to http://localhost:3000/admin
   - [ ] Login with the admin credentials you created in Step 2.3
   - [ ] Verify you can see the submitted application
   - [ ] Try changing the application status
   - [ ] Test the export to CSV feature

---

## 🌐 Step 6: Deploy to Netlify

### 6.1 Prepare for Deployment

1. Make sure all your code is working locally
2. Create a Git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Newsline Training Agency website"
   ```

3. Push to GitHub (create a new repository on GitHub first):
   ```bash
   git remote add origin https://github.com/yourusername/newslinetrainingagency.git
   git push -u origin main
   ```

### 6.2 Deploy on Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Sign up or log in
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **GitHub** (or your Git provider)
5. Authorize Netlify to access your repositories
6. Select the **newslinetrainingagency** repository
7. Configure build settings:
   - **Branch to deploy**: main
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
8. Click **"Show advanced"** → **"New variable"**
9. Add all environment variables from your `.env.local` file:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID
   - NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
   - EMAIL_USER
   - EMAIL_APP_PASSWORD
   - RECIPIENT_EMAIL
10. Click **"Deploy site"**

### 6.3 Wait for Deployment

- Netlify will build and deploy your site (takes 2-5 minutes)
- You'll get a URL like: `https://random-name-123456.netlify.app`
- You can change this to a custom domain later

### 6.4 Test Deployed Site

1. Visit your Netlify URL
2. Test the application form
3. Test the admin dashboard at `your-url.netlify.app/admin`
4. Verify emails are being sent

---

## 📱 Step 7: Optional - Custom Domain

1. In Netlify dashboard, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., training.newsline.co.ke)
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

---

## 🎨 Website Features

### For Applicants:
- Modern, responsive design
- Easy-to-use application form
- 8 categories with subcategories (for IT/Computer Science)
- Real-time form validation
- Email confirmation

### For Admins:
- Secure login with email/password
- View all applications
- Filter by status (Pending, Reviewed, Contacted)
- Update application status
- View detailed applicant information
- Export data to CSV
- Direct email and phone contact links

---

## 🔧 Troubleshooting

### Issue: "Module not found" errors
**Solution**: Run `npm install` again

### Issue: Firebase errors on startup
**Solution**: 
- Check that all Firebase environment variables are correct
- Make sure Firestore is enabled in Firebase Console
- Verify Authentication is enabled

### Issue: Emails not sending
**Solution**:
- Verify your Google App Password is correct (no spaces)
- Make sure 2-Step Verification is enabled on Gmail
- Check that EMAIL_USER and EMAIL_APP_PASSWORD are set correctly
- Try generating a new App Password

### Issue: Admin login not working
**Solution**:
- Verify you created an admin user in Firebase Authentication
- Check that you're using the correct email and password
- Make sure Firebase Authentication is enabled

### Issue: Build fails on Netlify
**Solution**:
- Check that all environment variables are added in Netlify
- Review the build logs for specific errors
- Make sure your local build works: `npm run build`

---

## 📞 Need Help?

If you encounter any issues:
1. Check the error message carefully
2. Review this guide again
3. Check the README.md file
4. Contact: linkcontentdevelopers@gmail.com

---

## ✅ Final Checklist

Before considering the setup complete, verify:
- [ ] Website runs locally without errors
- [ ] Application form successfully submits
- [ ] Emails are received at linkcontentdevelopers@gmail.com
- [ ] Admin can login to dashboard
- [ ] Applications are saved in Firestore
- [ ] Admin can view, update, and delete applications
- [ ] Website is deployed on Netlify
- [ ] Deployed website works correctly
- [ ] All environment variables are set on Netlify

---

## 🎉 Success!

Your Newsline Training Agency website is now live! Users can apply for attachments, and you can manage applications through the admin dashboard.

**Important URLs:**
- Local development: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin (or your-domain.netlify.app/admin)
- Firebase Console: https://console.firebase.google.com/project/newslinetrainingagency

**Credentials to Save:**
- Admin email: (the one you created in Firebase)
- Admin password: (the one you set)
- Google App Password: (for email sending)
