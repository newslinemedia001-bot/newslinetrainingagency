# 🎨 Cloudinary Setup Guide

## ✅ Phase 1 Complete - Quick Fixes Done:

### Styling Updates:
- ✅ Removed purple background accents from hero
- ✅ Reduced hero logo size (now 192x192px / 12rem)
- ✅ Changed nav to BLACK background with white text
- ✅ Changed footer to BLACK (already was gray-900)
- ✅ All buttons now RED (no purple)
- ✅ Added consent checkbox to application form
- ✅ Added WhatsApp link to Contact section and Footer

---

## 📦 Cloudinary Configuration

### Add to `.env.local`:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dlvgrs5vp
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=newslinetrainingagency
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

### Your Cloudinary Details:
- **Cloud Name:** `dlvgrs5vp`
- **Upload Preset:** `newslinetrainingagency` (unsigned)
- **Folder:** `newslineagency` (all files go here)

### Where to Find API Credentials:
1. Go to: https://console.cloudinary.com/
2. Login
3. Go to **Settings** → **API Keys**
4. Copy:
   - API Key
   - API Secret

---

## 🚀 Next Steps - Phase 2: Authentication & Dashboards

### What We Need to Build:

#### 1. **Sign Up/Sign In System**
   - Choice: Individual (Student) OR Company
   - Google Sign-In + Email/Password
   - Firebase Authentication (already enabled)

#### 2. **Student Dashboard** (`/dashboard`)
   - View application status
   - Receive messages from admin
   - Upload documents (CV, certificates)
   - Track application progress

#### 3. **Company Dashboard** (`/company`)
   - View assigned students
   - Approve/Reject students
   - Send decisions to admin

#### 4. **Enhanced Admin Dashboard** (`/admin`)
   - Manage students: Applied → Review → Approved/Rejected
   - Assign students to companies
   - Send messages (saves to dashboard + emails student)
   - Manage company approvals
   - Upload images to Cloudinary

#### 5. **New Pages**
   - For Students page
   - For Companies page
   - Programs & Departments page
   - International Attachments page
   - Gallery page

---

## 📋 Database Structure (Firestore)

### Collections Needed:

```
users/
  - userId
    - email
    - name
    - role: "student" | "company" | "admin"
    - createdAt
    - ...studentData or ...companyData

applications/
  - applicationId
    - userId (reference)
    - status: "applied" | "review" | "approved" | "rejected"
    - assignedCompany (optional)
    - ...application fields
    - cvUrl (Cloudinary)
    - consent: true/false

companies/
  - companyId
    - userId (reference)
    - companyName
    - status: "pending" | "approved" | "rejected"
    - ...company details

messages/
  - messageId
    - from: userId (admin)
    - to: userId (student/company)
    - subject
    - body
    - createdAt
    - read: boolean

gallery/
  - imageId
    - url (Cloudinary)
    - title
    - category
    - uploadedBy
    - createdAt
```

---

## 🔧 Files to Create:

### Authentication:
- `app/auth/signin/page.tsx`
- `app/auth/signup/page.tsx`
- `components/AuthForm.tsx`
- `lib/auth-context.tsx`

### Student:
- `app/dashboard/page.tsx`
- `app/dashboard/applications/page.tsx`
- `app/dashboard/messages/page.tsx`

### Company:
- `app/company/page.tsx`
- `app/company/students/page.tsx`

### New Public Pages:
- `app/students/page.tsx`
- `app/companies/page.tsx`
- `app/programs/page.tsx`
- `app/international/page.tsx`
- `app/gallery/page.tsx`

### Components:
- `components/ImageUpload.tsx` (Cloudinary)
- `components/CVUpload.tsx` (Cloudinary)
- `components/MessageBox.tsx`
- `components/StatusBadge.tsx`

---

## 🎯 Ready to Proceed?

1. **Add Cloudinary credentials** to `.env.local`
2. **Push current changes** to GitHub
3. **Start Phase 2** - Authentication system

Should I start building the authentication system next?
