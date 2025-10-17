# Newsline Training Agency Website

A modern Next.js website for managing attachment/internship applications across various fields including Media, IT, Film Production, and more.

## Features

- 🎨 Modern, responsive UI with gradient design (Red & Purple theme)
- 📝 Application form with multiple categories and subcategories
- 🔥 Firebase integration for data storage
- 📧 Automated email notifications
- 🔐 Admin dashboard with authentication
- 📊 Application management and status tracking
- 📥 Export applications to CSV
- 🗺️ Google Maps integration for location
- 📱 Fully responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Email**: Nodemailer (Gmail)
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ and npm
- A Firebase project
- A Gmail account for sending emails

## Installation

1. Clone the repository and navigate to the project directory:
```bash
cd newslinetrainingagency
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory (see Environment Variables section below)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

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
EMAIL_APP_PASSWORD=your_google_app_password_here
RECIPIENT_EMAIL=linkcontentdevelopers@gmail.com
```

## Getting Google App Password

To send emails through Gmail, you need to generate an App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Select **Security** from the left menu
3. Under "How you sign in to Google," select **2-Step Verification** (enable it if not already enabled)
4. At the bottom of the page, select **App passwords**
5. Select **Mail** and your device
6. Click **Generate**
7. Copy the 16-character password and paste it as `EMAIL_APP_PASSWORD` in your `.env.local` file

**Note**: Remove any spaces from the generated password.

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (newslinetrainingagency)
3. Go to **Firestore Database** and create a database (start in production mode)
4. Go to **Authentication** → **Sign-in method** → Enable **Email/Password**
5. Go to **Authentication** → **Users** → **Add user** to create an admin account
6. The Firebase configuration is already included in the project

## Application Categories

The following categories are available for applicants:

1. **Media**
2. **Public Relations**
3. **Film Production**
4. **Graphic and Design**
5. **Animation and Video Editing**
6. **Scripting**
7. **Photography**
8. **Computer Science / IT** (with subcategories):
   - Cybersecurity
   - Mobile Development (Android)
   - Mobile Development (iOS)
   - Web Development
   - Web Design
   - Networking
   - Graphic Design

## Admin Dashboard

The admin dashboard is accessible at `/admin` and provides the following features:

- View all applications
- Filter applications by status (Pending, Reviewed, Contacted)
- Update application status
- View detailed application information
- Delete applications
- Export applications to CSV
- Direct email and phone contact links

**Admin Login**: Use the email/password you created in Firebase Authentication.

## Deployment to Netlify

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [Netlify](https://www.netlify.com/) and sign in

3. Click "Add new site" → "Import an existing project"

4. Connect your Git repository

5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: (leave empty)

6. Add environment variables:
   - Go to Site settings → Environment variables
   - Add all the environment variables from your `.env.local` file

7. Deploy the site

8. (Optional) Configure a custom domain

## Project Structure

```
newslinetrainingagency/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── api/
│   │   └── submit-application/
│   │       └── route.ts      # API endpoint for form submission
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── ApplicationForm.tsx   # Application form component
│   ├── Categories.tsx        # Categories section
│   ├── Contact.tsx           # Contact section
│   ├── Footer.tsx            # Footer component
│   ├── Header.tsx            # Header/navigation
│   └── Hero.tsx              # Hero section
├── lib/
│   ├── categories.ts         # Category definitions
│   └── firebase.ts           # Firebase configuration
├── public/                   # Static assets
├── .env.local               # Environment variables (create this)
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Contact Information

- **Email**: linkcontentdevelopers@gmail.com
- **Phone**: +254 720 933350
- **Location**: [View on Google Maps](https://maps.app.goo.gl/zQvUsuzZiEQoodvS6)

## Support

For any issues or questions, please contact the development team at linkcontentdevelopers@gmail.com

## License

© 2024 Newsline Training Agency. All rights reserved.
