# Google OAuth Setup Guide

## 🔧 Step-by-Step Configuration

### **1. Google Cloud Console Setup**

1. **Go to Google Cloud Console:** [https://console.cloud.google.com](https://console.cloud.google.com)
2. **Create or select a project**
3. **Enable Google+ API:**
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - **Name:** Dandi Authentication
   - **Authorized JavaScript origins:** 
     - `http://localhost:3000` (for development)
     - `https://dandi-blush.vercel.app` (for production)
   - **Authorized redirect URIs:**
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://dandi-blush.vercel.app/api/auth/callback/google` (for production)
5. **Copy Client ID and Client Secret**

### **2. Environment Variables**

Add these variables to your `.env.local` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here_min_32_chars

# Generate NEXTAUTH_SECRET with:
# openssl rand -base64 32
```

### **3. For Production (Vercel)**

In your Vercel project settings, add these environment variables:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=https://dandi-blush.vercel.app
NEXTAUTH_SECRET=your_generated_secret
```

## 🔗 Authentication Flow

1. **Sign In:** User clicks "Continue with Google" → Redirected to Google OAuth
2. **Authorization:** User grants permissions → Google redirects back with auth code
3. **Token Exchange:** NextAuth exchanges code for access token
4. **Session Creation:** User session is created and stored
5. **Redirect:** User is redirected to `/dashboards`

## 📋 Available Routes

- **Sign In:** `/auth/signin`
- **Sign Out:** Handled automatically by NextAuth
- **Error Page:** `/auth/error`
- **API Routes:** `/api/auth/*` (handled by NextAuth)

## 🔐 Security Features

- **JWT Strategy:** Secure token-based sessions
- **CSRF Protection:** Built-in CSRF protection
- **Secure Cookies:** httpOnly, secure, and sameSite cookies
- **Callback URL Validation:** Prevents redirect attacks

## 🧪 Testing

1. **Start dev server:** `npm run dev`
2. **Visit:** `http://localhost:3000`
3. **Click "Continue with Google"**
4. **Complete OAuth flow**
5. **Should redirect to dashboard**

## 🐛 Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch"**
   - Check Google Console redirect URIs match exactly
   - Include both development and production URLs

2. **"invalid_client"**
   - Verify GOOGLE_CLIENT_ID is correct
   - Check environment variables are loaded

3. **"Configuration error"**
   - Ensure NEXTAUTH_SECRET is set
   - Verify NEXTAUTH_URL matches your domain

4. **Session not persisting**
   - Check browser cookies are enabled
   - Verify NEXTAUTH_URL is correct

### Debug Mode:

Add to `.env.local` for debugging:
```env
NEXTAUTH_DEBUG=true
``` 