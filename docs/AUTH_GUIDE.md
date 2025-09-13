# Absterco Web - Complete Project Guide# Absterco Web - Complete Authentication & Project Guide# Absterco Web - Complete Authentication & Project Guide# Absterco Web Authentication Guide



This comprehensive guide consolidates all essential details for authentication, admin management, blog system, and project configuration in Absterco Web. It replaces scattered documentation files for a lean, world-class developer experience.



---This comprehensive guide consolidates all essential details for authentication, admin management, blog system, and project configuration in Absterco Web. It replaces scattered documentation files for a lean, world-class developer experience.



## Project Overview



**Absterco Website** - The Art of Digital Purity---This comprehensive guide consolidates all essential details for authentication, admin management, blog system, and project configuration in Absterco Web. It replaces scattered documentation files for a lean, world-class developer experience.## Overview



A premium Next.js website for Absterco, a globally distributed digital engineering agency specializing in refined software solutions. Built with Next.js 15, TypeScript, Firebase, and Tailwind CSS 4.



### Tech Stack## 🔐 Firebase AuthenticationThis guide covers all essential details for authentication in Absterco Web, including setup, admin management, bypass mode, and security best practices.

- **Framework:** Next.js 15 with App Router

- **Language:** TypeScript

- **Styling:** Tailwind CSS v4

- **Authentication:** Firebase Auth + Admin SDK### Architecture Overview---

- **Database:** Firestore

- **Storage:** Firebase Storage- **Client-side:** Firebase Auth SDK for login/logout, real-time state, and error handling

- **Deployment:** Vercel (recommended)

- **Server-side:** Firebase Admin SDK for JWT verification, admin claims, and Firestore user management## 1. Firebase Authentication Setup

---

- **Admin-only access:** Only users with `{ admin: true }` custom claim can access admin routes

## 🔐 Firebase Authentication

- **Session:** Secure HttpOnly cookies, automatic refresh, and secure logout## 🔐 Firebase Authentication- Uses Firebase Auth for client-side login

### Architecture Overview

- **Client-side:** Firebase Auth SDK for login/logout, real-time state, and error handling- **Rate limiting:** 5 attempts per 15 minutes per IP

- **Server-side:** Firebase Admin SDK for JWT verification, admin claims, and Firestore user management

- **Admin-only access:** Only users with `{ admin: true }` custom claim can access admin routes- **Security headers:** XSS, Frame, Content-Type protections- Firebase Admin SDK for server-side verification

- **Session:** Secure HttpOnly cookies, automatic refresh, and secure logout

- **Rate limiting:** 5 attempts per 15 minutes per IP

- **Security headers:** XSS, Frame, Content-Type protections

### Key Files### Architecture Overview- JWT tokens managed via secure httpOnly cookies

### Environment Configuration

```env- `src/lib/auth.ts` (client authentication)

# Firebase Configuration

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key- `src/lib/auth-admin.ts` (server-side verification)- **Client-side:** Firebase Auth SDK for login/logout, real-time state, and error handling- Admin-only access enforced via custom claims

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain

NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id- `src/hooks/useAuth.tsx` (React context)

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id- `middleware.ts` (route protection)- **Server-side:** Firebase Admin SDK for JWT verification, admin claims, and Firestore user management

NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

- `src/components/auth/ProtectedRoute.tsx` (UI protection)

# Firebase Admin SDK

FIREBASE_PROJECT_ID=your_project_id- **Admin-only access:** Only users with `{ admin: true }` custom claim can access admin routes## 2. Admin User Management

FIREBASE_CLIENT_EMAIL=your_service_account_email

FIREBASE_PRIVATE_KEY=your_private_key### Environment Configuration

```

```env- **Session:** Secure HttpOnly cookies, automatic refresh, and secure logout- Admins are managed via Firebase custom claims

### Key Files

- `src/lib/auth.ts` (client authentication)# Firebase Configuration

- `src/lib/auth-admin.ts` (server-side verification)

- `src/hooks/useAuth.tsx` (React context)NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key- **Rate limiting:** 5 attempts per 15 minutes per IP- Use the scripts in `/tools` to add or promote admin users:

- `middleware.ts` (route protection)

- `src/components/auth/ProtectedRoute.tsx` (UI protection)NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain



---NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id- **Security headers:** XSS, Frame, Content-Type protections  - `setup-admin.js` — Set admin claims for a user



## 👥 Admin User ManagementNEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket



### Quick StartNEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id  - `add-admin-user.js` — Add new admin user

```bash

# Set admin claims for a userNEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

node tools/scripts/setup-admin.js <email>

### Key Files  - `set-admin-claims.js` — Set custom claims

# Test Firebase configuration

node tools/scripts/test-auth-config.js# Firebase Admin SDK



# Set claims for default admin (admin@absterco.com)FIREBASE_PROJECT_ID=your_project_id- `src/lib/auth.ts` (client authentication)# Absterco Authentication Guide

node tools/scripts/set-admin-claims.js

```FIREBASE_CLIENT_EMAIL=your_service_account_email



### Available Scripts (`tools/scripts/`)FIREBASE_PRIVATE_KEY=your_private_key- `src/lib/auth-admin.ts` (server-side verification)

- **`setup-admin.js`** - Primary admin setup script for any email

- **`set-admin-claims.js`** - Legacy script for default admin email```

- **`test-auth-config.js`** - Firebase configuration validator

- **`seed-blog-data.js`** - Initialize sample blog data- `src/hooks/useAuth.tsx` (React context)This guide consolidates all essential details for authentication, admin management, and bypass configuration in Absterco-Web. It replaces scattered documentation files for a lean, world-class developer experience.



### Programmatic Access---

- **API endpoint:** `POST /api/admin/add-user`

- **Admin dashboard:** `/admin/users` for user management- `middleware.ts` (route protection)

- **Audit trail:** Role changes and user activity tracking

## 👥 Admin User Management

---

- `src/components/auth/ProtectedRoute.tsx` (UI protection)---

## 🚀 Authentication Bypass (Development Only)

### Quick Start

### Configuration

```env```bash

# Enable bypass mode (DEVELOPMENT ONLY)

NEXT_PUBLIC_BYPASS_AUTH=true# Set admin claims for a user



# Disable for normal authenticationnode tools/scripts/setup-admin.js <email>### Environment Configuration## Firebase Authentication

NEXT_PUBLIC_BYPASS_AUTH=false

```



### Security Features# Test Firebase configuration```env

- **Environment protection:** Never enabled in production

- **Visual warnings:** Clear bypass mode indicatorsnode tools/scripts/test-auth-config.js

- **Console alerts:** Development-only notifications

- **Mock user injection:** Automatic admin user simulation# Firebase Configuration- **Client-side:** Uses Firebase Auth SDK for login/logout, real-time state, and error handling.



### Key Files# Set claims for default admin (admin@absterco.com)

- `src/lib/auth-bypass.ts` - Bypass logic

- `src/components/auth/AuthBypassWarning.tsx` - UI warningsnode tools/scripts/set-admin-claims.jsNEXT_PUBLIC_FIREBASE_API_KEY=your_api_key- **Server-side:** Uses Firebase Admin SDK for JWT verification, admin claims, and Firestore user management.



---```



## 📝 Blog Management SystemNEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain- **Admin-only access:** Only users with `{ admin: true }` custom claim or whitelisted email can access admin routes.



### Features Overview### Available Scripts (`tools/scripts/`)

✅ **Firebase Integration** - Firestore for data, Storage for images  

✅ **Rich Text Editor** - TipTap editor with full formatting toolbar  - **`setup-admin.js`** - Primary admin setup script for any emailNEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id- **Session:** Secure HttpOnly cookies, automatic refresh, and secure logout.

✅ **Image Upload** - Drag & drop with Firebase Storage  

✅ **SEO Optimization** - Meta titles, descriptions, canonical URLs  - **`set-admin-claims.js`** - Legacy script for default admin email

✅ **Featured Posts** - Highlight important content  

✅ **Draft/Published Workflow** - Complete content management  - **`test-auth-config.js`** - Firebase configuration validatorNEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket- **Rate limiting:** 5 attempts per 15 minutes per IP.

✅ **Real-time Statistics** - Live blog metrics  

✅ **Advanced Filtering** - Search and category filters  

✅ **Responsive Design** - Premium user experience  

✅ **Clean Text Display** - World-class anchor tag removal from descriptions### Programmatic AccessNEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id- **Security headers:** XSS, Frame, Content-Type protections.



### Quick Start- **API endpoint:** `POST /api/admin/add-user`

```bash

# Initialize sample data- **Admin dashboard:** `/admin/users` for user managementNEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

cd tools/scripts

node seed-blog-data.js- **Audit trail:** Role changes and user activity tracking



# Access blog management### Key Files

# Navigate to /admin/blog (requires admin authentication)

```---



### Architecture# Firebase Admin SDK- `src/lib/auth.ts` (client)

- **Frontend:** `/blog` - Enhanced BlogPageClient with Firebase integration

- **Admin Interface:** `/admin/blog` - Complete CRUD operations## 🚀 Authentication Bypass (Development Only)

- **API Routes:** `/api/admin/blog` - Blog management endpoints

- **Data Service:** `src/lib/blog-service.ts` - Firebase abstraction layerFIREBASE_PROJECT_ID=your_project_id- `src/lib/auth-admin.ts` (server)



### Database Schema### Configuration

```typescript

// Collections```envFIREBASE_CLIENT_EMAIL=your_service_account_email- `src/hooks/useAuth.tsx` (context)

blog-posts     // All blog post data

authors        // Author profiles and information  # Enable bypass mode (DEVELOPMENT ONLY)

categories     // Blog categories with metadata

NEXT_PUBLIC_BYPASS_AUTH=trueFIREBASE_PRIVATE_KEY=your_private_key- `middleware.ts` (route protection)

// Sample Data Included

3 Author profiles (Developer, Designer, DevOps)

6 Blog categories (Web Development, Design, Technology, etc.)

3 Sample blog posts (published and draft examples)# Disable for normal authentication```- `src/components/auth/ProtectedRoute.tsx` (UI protection)

```

NEXT_PUBLIC_BYPASS_AUTH=false

### Text Cleaning Implementation

Enhanced blog descriptions with world-class anchor tag removal:```



**Before:** `"Learn about <a href='/design' class='link'>modern design</a> principles"`

**After:** `"Learn about modern design principles"`

### Security Features------

- Removes all anchor tags while preserving text content

- Handles complex attributes (`target`, `rel`, `class`, etc.)- **Environment protection:** Never enabled in production

- Decodes HTML entities (`&quot;` → `"`, `&amp;` → `&`)

- Normalizes whitespace for clean presentation- **Visual warnings:** Clear bypass mode indicators

- Applied automatically across all blog components

- **Console alerts:** Development-only notifications

### Error Handling & Fallbacks

- **Zero Configuration:** Works immediately without Firebase indexes- **Mock user injection:** Automatic admin user simulation## 👥 Admin User Management## Admin User Management

- **Automatic Fallback:** Sample data when Firebase is unavailable  

- **Error Recovery:** Graceful handling of connectivity issues

- **Development Indicators:** Clear feedback about data sources

### Key Files

---

- `src/lib/auth-bypass.ts` - Bypass logic

## 🛠 Development Environment

- `src/components/auth/AuthBypassWarning.tsx` - UI warnings### Quick Start- **Add admin users:** Use `node tools/scripts/setup-admin.js <email>` to set admin claims for users.

### Build Process

```bash

# Development server

npm run dev---```bash- **API endpoint:** `POST /api/admin/add-user` for programmatic admin creation.



# Production build

npm run build

## 📝 Blog Management System# Set admin claims for a user- **UI:** Admin dashboard provides user management, role changes, and audit trail.

# Type checking

npm run type-check



# Linting### Features Overviewnode tools/scripts/setup-admin.js <email>

npm run lint

```✅ **Firebase Integration** - Firestore for data, Storage for images  



### Debug Tools✅ **Rich Text Editor** - TipTap editor with full formatting toolbar  ### Quick Start

- `/debug/firebase` - Firebase connection status

- `/debug/auth` - Authentication state✅ **Image Upload** - Drag & drop with Firebase Storage  

- `/debug/blog` - Blog system testing

- `/debug/system` - System information✅ **SEO Optimization** - Meta titles, descriptions, canonical URLs  # Test Firebase configuration```bash



### Image Configuration✅ **Featured Posts** - Highlight important content  

```typescript

// next.config.ts - Firebase Storage support✅ **Draft/Published Workflow** - Complete content management  node tools/scripts/test-auth-config.jsnode tools/scripts/setup-admin.js <email>

images: {

  remotePatterns: [✅ **Real-time Statistics** - Live blog metrics  

    {

      protocol: 'https',✅ **Advanced Filtering** - Search and category filters  ```

      hostname: 'firebasestorage.googleapis.com',

      port: '',✅ **Responsive Design** - Premium user experience  

      pathname: '/v0/b/*/o/**',

    },# Set claims for default admin (admin@absterco.com)

  ],

}### Quick Start

```

```bashnode tools/scripts/set-admin-claims.js---

---

# Initialize sample data

## 🔒 Security Best Practices

cd tools/scripts```

### Authentication Security

- **Environment isolation:** Separate `.env` files for dev/test/prodnode seed-blog-data.js

- **Never enable bypass in production**

- **Regular admin claim audits**## Authentication Bypass (Development Only)

- **Secure cookie configuration**

- **HTTPS enforcement**# Access blog management



### Firebase Security Rules# Navigate to /admin/blog (requires admin authentication)### Available Scripts (`tools/scripts/`)

```javascript

// Firestore rules example```

rules_version = '2';

service cloud.firestore {- **`setup-admin.js`** - Primary admin setup script for any email- **Enable:** Set `NEXT_PUBLIC_BYPASS_AUTH=true` in `.env`.

  match /databases/{database}/documents {

    // Blog posts - read public, write admin only### Architecture

    match /blog-posts/{document} {

      allow read: if true;- **Frontend:** `/blog` - Enhanced BlogPageClient with Firebase integration- **`set-admin-claims.js`** - Legacy script for default admin email- **Effect:** All authentication is bypassed, mock admin user is injected, and warning banners are shown.

      allow write: if request.auth != null && request.auth.token.admin == true;

    }- **Admin Interface:** `/admin/blog` - Complete CRUD operations

  }

}- **API Routes:** `/api/admin/blog` - Blog management endpoints- **`test-auth-config.js`** - Firebase configuration validator- **Disable:** Set `NEXT_PUBLIC_BYPASS_AUTH=false` for normal authentication.

```

- **Data Service:** `src/lib/blog-service.ts` - Firebase abstraction layer

### Content Security

- **Input sanitization:** Safe HTML content handling- **Security:** Never enable in production. Visible warnings and console alerts are provided.

- **Image compression:** Automatic optimization

- **XSS protection:** Proper escaping and validation### Database Schema

- **Rate limiting:** API endpoint protection

```typescript### Programmatic Access

---

// Collections

## 📊 Performance Optimizations

blog-posts     // All blog post data- **API endpoint:** `POST /api/admin/add-user`### Key Files

### Frontend Optimizations

- **Image compression:** Progressive JPEG conversionauthors        // Author profiles and information  

- **Lazy loading:** Efficient data loading

- **Code splitting:** Dynamic imports for admin componentscategories     // Blog categories with metadata- **Admin dashboard:** `/admin/users` for user management- `src/lib/auth-bypass.ts`

- **Optimistic updates:** Immediate UI feedback



### Build Optimizations

- **Turbopack:** `npm run dev --turbopack` for faster development// Sample Data Included- **Audit trail:** Role changes and user activity tracking- `src/hooks/useAuth.tsx`

- **Bundle analysis:** Next.js built-in analyzer

- **Tree shaking:** Automatic dead code elimination3 Author profiles (Developer, Designer, DevOps)

- **Static generation:** Pre-rendered pages where possible

6 Blog categories (Web Development, Design, Technology, etc.)- `src/components/auth/ProtectedRoute.tsx`

---

3 Sample blog posts (published and draft examples)

## 🎨 Design System Integration

```---- `src/app/admin/login/page.tsx`

### Brand Colors

```css

primary: { 500: '#25306c', 600: '#1e2657' }    // Deep navy

secondary: { 500: '#f0591c', 600: '#ea580c' }  // Warm orange  ### Error Handling & Fallbacks

accent: { 500: '#00ffab' }                      // Bright green

neutral: { 50: '#fafafa', 100: '#f5f5f5' }     // Light grays- **Zero Configuration:** Works immediately without Firebase indexes

```

- **Automatic Fallback:** Sample data when Firebase is unavailable  ## 🚀 Authentication Bypass (Development Only)---

### Typography Hierarchy

- **Headlines:** Inter font with gradient effects- **Error Recovery:** Graceful handling of connectivity issues

- **Body:** Optimized line-height (1.6) for readability

- **UI Elements:** Semantic scaling with text-balance utility- **Development Indicators:** Clear feedback about data sources

- **Code:** JetBrains Mono for technical content



### Component Patterns

```typescript---### Configuration## Security Best Practices

// Glass morphism cards

className="bg-white/90 backdrop-blur-sm border border-white/20 

           rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"

## 🛠 Development Environment```env

// Responsive grids

className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"



// Framer Motion animations### Build Process# Enable bypass mode (DEVELOPMENT ONLY)- **Environment isolation:** Use separate `.env` files for dev, test, and prod.

initial={{ opacity: 0, y: 20 }}

animate={{ opacity: 1, y: 0 }}```bash

transition={{ duration: 0.6, ease: "easeOut" }}

```# Development serverNEXT_PUBLIC_BYPASS_AUTH=true- **Never enable bypass in production.**



---npm run dev



## 🚨 Troubleshooting- **Audit admin claims regularly.**



### Common Issues# Production build

- **Missing env vars:** Check `.env` for all required Firebase variables

- **Bypass not working:** Restart dev server after changing `.env`npm run build# Disable for normal authentication- **Use secure cookies and headers.**

- **Admin claim issues:** Use `node tools/scripts/setup-admin.js <email>`

- **Build errors:** Check TypeScript errors and dependency versions

- **Firebase permissions:** Verify authentication and Firestore rules

# Type checkingNEXT_PUBLIC_BYPASS_AUTH=false

### Firebase Index Errors

The blog system is designed to work without composite indexes:npm run type-check

```typescript

// ❌ OLD: Required composite index```---

query(collection, where('isPublished', '==', true), orderBy('updatedAt', 'desc'))

# Linting

// ✅ NEW: Simple query + client filtering

query(collection, orderBy('updatedAt', 'desc'), limit(150))npm run lint

// Then filter client-side for published status

``````



### Image Upload Issues### Security Features## Troubleshooting

- **Storage configuration:** Verify Firebase Storage bucket setup

- **CORS settings:** Configure proper CORS for web uploads### Debug Tools

- **File size limits:** Check compression settings in `imageCompression.ts`

- `/debug/firebase` - Firebase connection status- **Environment protection:** Never enabled in production

---

- `/debug/auth` - Authentication state

## 📁 Project Structure Reference

- `/debug/blog` - Blog system testing- **Visual warnings:** Clear bypass mode indicators- **Missing env vars:** Check `.env` for all required Firebase and admin variables.

```

├── src/- `/debug/system` - System information

│   ├── app/                    # Next.js App Router pages

│   │   ├── admin/             # Admin dashboard and management- **Console alerts:** Development-only notifications- **Bypass not working:** Restart dev server after changing `.env`.

│   │   ├── auth/              # Authentication pages

│   │   ├── blog/              # Blog listing and posts### Image Configuration

│   │   └── api/               # API routes

│   ├── components/            # React components```typescript- **Mock user injection:** Automatic admin user simulation- **Admin claim issues:** Use `node tools/scripts/setup-admin.js <email>` to set claims.

│   │   ├── admin/             # Admin-specific components

│   │   ├── auth/              # Authentication components// next.config.ts - Firebase Storage support

│   │   ├── blog/              # Blog-related components

│   │   └── ui/                # Reusable UI componentsimages: {

│   ├── lib/                   # Utility libraries and services

│   ├── hooks/                 # Custom React hooks  remotePatterns: [

│   ├── types/                 # TypeScript type definitions

│   └── data/                  # Static data and constants    {### Key Files---

├── tools/                     # Admin scripts and utilities

│   └── scripts/               # Firebase admin scripts      protocol: 'https',

└── public/                    # Static assets

```      hostname: 'firebasestorage.googleapis.com',- `src/lib/auth-bypass.ts` - Bypass logic



---      port: '',



## 🎯 Production Deployment      pathname: '/v0/b/*/o/**',- `src/components/auth/AuthBypassWarning.tsx` - UI warnings## File Structure Reference



### Deployment Checklist    },

✅ Environment variables configured  

✅ Firebase project set up in production    ],

✅ Security rules properly configured  

✅ Admin users created and verified  }

✅ Image optimization enabled  

✅ Error monitoring configured  ```---```

✅ Performance monitoring enabled  

✅ HTTPS enforced  



### Environment Variables---src/

Ensure all production environment variables are set:

- Firebase configuration (all `NEXT_PUBLIC_FIREBASE_*`)

- Firebase Admin SDK credentials

- Next.js security configurations## 🔒 Security Best Practices## 📝 Blog Management System  lib/

- Never set `NEXT_PUBLIC_BYPASS_AUTH=true` in production



### Monitoring

- **Firebase Console:** Authentication, Firestore, Storage usage### Authentication Security  hooks/

- **Vercel Analytics:** Performance metrics and user insights  

- **Error Tracking:** Console errors and API failures- **Environment isolation:** Separate `.env` files for dev/test/prod

- **Security Monitoring:** Failed authentication attempts

- **Never enable bypass in production**### Features Overview  components/

---

- **Regular admin claim audits**

## 💡 Development Tips

- **Secure cookie configuration**✅ **Firebase Integration** - Firestore for data, Storage for images    app/

### Best Practices

- **Type Safety:** Use TypeScript strictly for all components- **HTTPS enforcement**

- **Error Boundaries:** Implement proper error handling

- **Loading States:** Provide feedback for all async operations✅ **Rich Text Editor** - TipTap editor with full formatting toolbar  tools/

- **Responsive Design:** Mobile-first approach with progressive enhancement

- **Accessibility:** WCAG AA compliance for all components### Firebase Security Rules



### Code Quality```javascript✅ **Image Upload** - Drag & drop with Firebase Storage    README.md

- **ESLint Configuration:** Strict linting rules enforced

- **Prettier Integration:** Consistent code formatting// Firestore rules example

- **Component Architecture:** Domain-driven organization

- **State Management:** Zustand for client state, Firebase for server staterules_version = '2';✅ **SEO Optimization** - Meta titles, descriptions, canonical URLs    scripts/



---service cloud.firestore {



## 📞 Support & Resources  match /databases/{database}/documents {✅ **Featured Posts** - Highlight important content      setup-admin.js



### Documentation    // Blog posts - read public, write admin only

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

- **Firebase Docs:** [firebase.google.com/docs](https://firebase.google.com/docs)    match /blog-posts/{document} {✅ **Draft/Published Workflow** - Complete content management      set-admin-claims.js

- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

      allow read: if true;

### Project Resources

- **Design System:** `.github/copilot-instructions.md`      allow write: if request.auth != null && request.auth.token.admin == true;✅ **Real-time Statistics** - Live blog metrics      test-auth-config.js

- **Component Library:** `src/components/ui/`

- **Firebase Services:** `src/lib/firebase.ts`    }

- **Type Definitions:** `src/types/`

  }✅ **Advanced Filtering** - Search and category filters  ```

---

}

**Built with:** Next.js 15, TypeScript, Firebase, React 19, Tailwind CSS 4, Framer Motion

```✅ **Responsive Design** - Premium user experience  

*Last updated: September 2025*


### Content Security---

- **Input sanitization:** Safe HTML content handling

- **Image compression:** Automatic optimization### Quick Start

- **XSS protection:** Proper escaping and validation

- **Rate limiting:** API endpoint protection```bashFor more details, see inline comments in the codebase and the `tools/scripts/` directory for admin management.



---# Initialize sample data

cd tools/scripts

## 📊 Performance Optimizationsnode seed-blog-data.js



### Frontend Optimizations# Access blog management

- **Image compression:** Progressive JPEG conversion# Navigate to /admin/blog (requires admin authentication)

- **Lazy loading:** Efficient data loading```

- **Code splitting:** Dynamic imports for admin components

- **Optimistic updates:** Immediate UI feedback### Architecture

- **Frontend:** `/blog` - Enhanced BlogPageClient with Firebase integration

### Build Optimizations- **Admin Interface:** `/admin/blog` - Complete CRUD operations

- **Turbopack:** `npm run dev --turbopack` for faster development- **API Routes:** `/api/admin/blog` - Blog management endpoints

- **Bundle analysis:** Next.js built-in analyzer- **Data Service:** `src/lib/blog-service.ts` - Firebase abstraction layer

- **Tree shaking:** Automatic dead code elimination

- **Static generation:** Pre-rendered pages where possible### Database Schema

```typescript

---// Collections

blog-posts     // All blog post data

## 🎨 Design System Integrationauthors        // Author profiles and information  

categories     // Blog categories with metadata

### Brand Colors

```css// Sample Data Included

primary: { 500: '#25306c', 600: '#1e2657' }    // Deep navy3 Author profiles (Developer, Designer, DevOps)

secondary: { 500: '#f0591c', 600: '#ea580c' }  // Warm orange  6 Blog categories (Web Development, Design, Technology, etc.)

accent: { 500: '#00ffab' }                      // Bright green3 Sample blog posts (published and draft examples)

neutral: { 50: '#fafafa', 100: '#f5f5f5' }     // Light grays```

```

### Error Handling & Fallbacks

### Typography Hierarchy- **Zero Configuration:** Works immediately without Firebase indexes

- **Headlines:** Inter font with gradient effects- **Automatic Fallback:** Sample data when Firebase is unavailable  

- **Body:** Optimized line-height (1.6) for readability- **Error Recovery:** Graceful handling of connectivity issues

- **UI Elements:** Semantic scaling with text-balance utility- **Development Indicators:** Clear feedback about data sources

- **Code:** JetBrains Mono for technical content

---

### Component Patterns

```typescript## 🛠 Development Environment

// Glass morphism cards

className="bg-white/90 backdrop-blur-sm border border-white/20 ### Build Process

           rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"```bash

# Development server

// Responsive gridsnpm run dev

className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"

# Production build

// Framer Motion animationsnpm run build

initial={{ opacity: 0, y: 20 }}

animate={{ opacity: 1, y: 0 }}# Type checking

transition={{ duration: 0.6, ease: "easeOut" }}npm run type-check

```

# Linting

---npm run lint

```

## 🚨 Troubleshooting

### Debug Tools

### Common Issues- `/debug/firebase` - Firebase connection status

- **Missing env vars:** Check `.env` for all required Firebase variables- `/debug/auth` - Authentication state

- **Bypass not working:** Restart dev server after changing `.env`- `/debug/blog` - Blog system testing

- **Admin claim issues:** Use `node tools/scripts/setup-admin.js <email>`- `/debug/system` - System information

- **Build errors:** Check TypeScript errors and dependency versions

- **Firebase permissions:** Verify authentication and Firestore rules### Image Configuration

```typescript

### Firebase Index Errors// next.config.ts - Firebase Storage support

The blog system is designed to work without composite indexes:images: {

```typescript  remotePatterns: [

// ❌ OLD: Required composite index    {

query(collection, where('isPublished', '==', true), orderBy('updatedAt', 'desc'))      protocol: 'https',

      hostname: 'firebasestorage.googleapis.com',

// ✅ NEW: Simple query + client filtering      port: '',

query(collection, orderBy('updatedAt', 'desc'), limit(150))      pathname: '/v0/b/*/o/**',

// Then filter client-side for published status    },

```  ],

}

### Image Upload Issues```

- **Storage configuration:** Verify Firebase Storage bucket setup

- **CORS settings:** Configure proper CORS for web uploads---

- **File size limits:** Check compression settings in `imageCompression.ts`

## 🔒 Security Best Practices

---

### Authentication Security

## 📁 Project Structure Reference- **Environment isolation:** Separate `.env` files for dev/test/prod

- **Never enable bypass in production**

```- **Regular admin claim audits**

├── src/- **Secure cookie configuration**

│   ├── app/                    # Next.js App Router pages- **HTTPS enforcement**

│   │   ├── admin/             # Admin dashboard and management

│   │   ├── auth/              # Authentication pages### Firebase Security Rules

│   │   ├── blog/              # Blog listing and posts```javascript

│   │   └── api/               # API routes// Firestore rules example

│   ├── components/            # React componentsrules_version = '2';

│   │   ├── admin/             # Admin-specific componentsservice cloud.firestore {

│   │   ├── auth/              # Authentication components  match /databases/{database}/documents {

│   │   ├── blog/              # Blog-related components    // Blog posts - read public, write admin only

│   │   └── ui/                # Reusable UI components    match /blog-posts/{document} {

│   ├── lib/                   # Utility libraries and services      allow read: if true;

│   ├── hooks/                 # Custom React hooks      allow write: if request.auth != null && request.auth.token.admin == true;

│   ├── types/                 # TypeScript type definitions    }

│   └── data/                  # Static data and constants  }

├── tools/                     # Admin scripts and utilities}

│   └── scripts/               # Firebase admin scripts```

├── docs/                      # Project documentation

└── public/                    # Static assets### Content Security

```- **Input sanitization:** Safe HTML content handling

- **Image compression:** Automatic optimization

---- **XSS protection:** Proper escaping and validation

- **Rate limiting:** API endpoint protection

## 🎯 Production Deployment

---

### Deployment Checklist

✅ Environment variables configured  ## 📊 Performance Optimizations

✅ Firebase project set up in production  

✅ Security rules properly configured  ### Frontend Optimizations

✅ Admin users created and verified  - **Image compression:** Progressive JPEG conversion

✅ Image optimization enabled  - **Lazy loading:** Efficient data loading

✅ Error monitoring configured  - **Code splitting:** Dynamic imports for admin components

✅ Performance monitoring enabled  - **Optimistic updates:** Immediate UI feedback

✅ HTTPS enforced  

### Build Optimizations

### Environment Variables- **Turbopack:** `npm run dev --turbopack` for faster development

Ensure all production environment variables are set:- **Bundle analysis:** Next.js built-in analyzer

- Firebase configuration (all `NEXT_PUBLIC_FIREBASE_*`)- **Tree shaking:** Automatic dead code elimination

- Firebase Admin SDK credentials- **Static generation:** Pre-rendered pages where possible

- Next.js security configurations

- Never set `NEXT_PUBLIC_BYPASS_AUTH=true` in production---



### Monitoring## 🎨 Design System Integration

- **Firebase Console:** Authentication, Firestore, Storage usage

- **Vercel Analytics:** Performance metrics and user insights  ### Brand Colors

- **Error Tracking:** Console errors and API failures```css

- **Security Monitoring:** Failed authentication attemptsprimary: { 500: '#25306c', 600: '#1e2657' }    // Deep navy

secondary: { 500: '#f0591c', 600: '#ea580c' }  // Warm orange  

---accent: { 500: '#00ffab' }                      // Bright green

neutral: { 50: '#fafafa', 100: '#f5f5f5' }     // Light grays

## 💡 Development Tips```



### Best Practices### Typography Hierarchy

- **Type Safety:** Use TypeScript strictly for all components- **Headlines:** Inter font with gradient effects

- **Error Boundaries:** Implement proper error handling- **Body:** Optimized line-height (1.6) for readability

- **Loading States:** Provide feedback for all async operations- **UI Elements:** Semantic scaling with text-balance utility

- **Responsive Design:** Mobile-first approach with progressive enhancement- **Code:** JetBrains Mono for technical content

- **Accessibility:** WCAG AA compliance for all components

### Component Patterns

### Code Quality```typescript

- **ESLint Configuration:** Strict linting rules enforced// Glass morphism cards

- **Prettier Integration:** Consistent code formattingclassName="bg-white/90 backdrop-blur-sm border border-white/20 

- **Component Architecture:** Domain-driven organization           rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"

- **State Management:** Zustand for client state, Firebase for server state

// Responsive grids

---className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"



## 📞 Support & Resources// Framer Motion animations

initial={{ opacity: 0, y: 20 }}

### Documentationanimate={{ opacity: 1, y: 0 }}

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)transition={{ duration: 0.6, ease: "easeOut" }}

- **Firebase Docs:** [firebase.google.com/docs](https://firebase.google.com/docs)```

- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

### Project Resources

- **Design System:** `.github/copilot-instructions.md`## 🚨 Troubleshooting

- **Component Library:** `src/components/ui/`

- **Firebase Services:** `src/lib/firebase.ts`### Common Issues

- **Type Definitions:** `src/types/`- **Missing env vars:** Check `.env` for all required Firebase variables

- **Bypass not working:** Restart dev server after changing `.env`

---- **Admin claim issues:** Use `node tools/scripts/setup-admin.js <email>`

- **Build errors:** Check TypeScript errors and dependency versions

**Built with:** Next.js 15, TypeScript, Firebase, React 19, Tailwind CSS 4, Framer Motion- **Firebase permissions:** Verify authentication and Firestore rules



*Last updated: September 2025*### Firebase Index Errors
The blog system is designed to work without composite indexes:
```typescript
// ❌ OLD: Required composite index
query(collection, where('isPublished', '==', true), orderBy('updatedAt', 'desc'))

// ✅ NEW: Simple query + client filtering
query(collection, orderBy('updatedAt', 'desc'), limit(150))
// Then filter client-side for published status
```

### Image Upload Issues
- **Storage configuration:** Verify Firebase Storage bucket setup
- **CORS settings:** Configure proper CORS for web uploads
- **File size limits:** Check compression settings in `imageCompression.ts`

---

## 📁 Project Structure Reference

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard and management
│   │   ├── auth/              # Authentication pages
│   │   ├── blog/              # Blog listing and posts
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── admin/             # Admin-specific components
│   │   ├── auth/              # Authentication components
│   │   ├── blog/              # Blog-related components
│   │   └── ui/                # Reusable UI components
│   ├── lib/                   # Utility libraries and services
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   └── data/                  # Static data and constants
├── tools/                     # Admin scripts and utilities
│   └── scripts/               # Firebase admin scripts
├── docs/                      # Project documentation
└── public/                    # Static assets
```

---

## 🎯 Production Deployment

### Deployment Checklist
✅ Environment variables configured  
✅ Firebase project set up in production  
✅ Security rules properly configured  
✅ Admin users created and verified  
✅ Image optimization enabled  
✅ Error monitoring configured  
✅ Performance monitoring enabled  
✅ HTTPS enforced  

### Environment Variables
Ensure all production environment variables are set:
- Firebase configuration (all `NEXT_PUBLIC_FIREBASE_*`)
- Firebase Admin SDK credentials
- Next.js security configurations
- Never set `NEXT_PUBLIC_BYPASS_AUTH=true` in production

### Monitoring
- **Firebase Console:** Authentication, Firestore, Storage usage
- **Vercel Analytics:** Performance metrics and user insights  
- **Error Tracking:** Console errors and API failures
- **Security Monitoring:** Failed authentication attempts

---

## 💡 Development Tips

### Best Practices
- **Type Safety:** Use TypeScript strictly for all components
- **Error Boundaries:** Implement proper error handling
- **Loading States:** Provide feedback for all async operations
- **Responsive Design:** Mobile-first approach with progressive enhancement
- **Accessibility:** WCAG AA compliance for all components

### Code Quality
- **ESLint Configuration:** Strict linting rules enforced
- **Prettier Integration:** Consistent code formatting
- **Component Architecture:** Domain-driven organization
- **State Management:** Zustand for client state, Firebase for server state

---

## 📞 Support & Resources

### Documentation
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Firebase Docs:** [firebase.google.com/docs](https://firebase.google.com/docs)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

### Project Resources
- **Design System:** `.github/copilot-instructions.md`
- **Component Library:** `src/components/ui/`
- **Firebase Services:** `src/lib/firebase.ts`
- **Type Definitions:** `src/types/`

---

**Built with:** Next.js 15, TypeScript, Firebase, React 19, Tailwind CSS 4, Framer Motion

*Last updated: September 2025*