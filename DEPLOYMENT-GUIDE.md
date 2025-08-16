# 🚀 Deployment Guide for AI Meeting Summarizer

## 📋 **What We're Deploying**

- **Frontend**: React app → Netlify (free hosting)
- **Backend**: Node.js server → Render (free hosting)

## 🌐 **Step 1: Deploy Frontend to Netlify**

### **Option A: Drag & Drop (Easiest)**

1. **Build your frontend**:
   ```bash
   cd client
   npm run build
   ```

2. **Go to [Netlify](https://netlify.com)** and sign up/login

3. **Drag the `client/dist` folder** to Netlify's deploy area

4. **Your site will be live** at a random URL like `https://random-name.netlify.app`

### **Option B: Connect GitHub (Recommended)**

1. **Push your changes** to GitHub:
   ```bash
   git add .
   git commit -m "Add deployment files"
   git push origin main
   ```

2. **In Netlify**: New Site → Import from Git → GitHub

3. **Select your repo**: `nikshitha1312/summarizing_txt`

4. **Build settings**:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`

5. **Deploy!** ✅

## 🔧 **Step 2: Deploy Backend to Render**

1. **Go to [Render](https://render.com)** and sign up/login

2. **New Web Service** → Connect GitHub repo

3. **Select your repo**: `nikshitha1312/summarizing_txt`

4. **Configure**:
   - Name: `mangodesk-backend`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

5. **Environment Variables** (Add these):
   ```
   GROQ_API_KEY=your-groq-api-key-here
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   NODE_ENV=production
   ```

6. **Deploy!** ✅

## 🔗 **Step 3: Connect Frontend to Backend**

1. **Copy your Render backend URL** (e.g., `https://mangodesk-backend.onrender.com`)

2. **In Netlify**: Site Settings → Environment Variables

3. **Add**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

4. **Redeploy** your frontend

## 🎯 **Step 4: Test Your Deployed App**

1. **Frontend**: Visit your Netlify URL
2. **Upload a transcript** and test summarization
3. **Test email sharing** (use "Open Email Client" option)

## 🔧 **Troubleshooting**

### **Frontend Issues**
- **Page Not Found**: Make sure `_redirects` file is in `client/public/`
- **API Errors**: Check `VITE_API_URL` environment variable

### **Backend Issues**
- **Build Failures**: Check `package.json` has all dependencies
- **Runtime Errors**: Check environment variables are set correctly

## 📱 **Your Final URLs**

- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-backend.onrender.com`

## 🎉 **Success!**

Your AI Meeting Summarizer is now live on the internet! Share the frontend URL with your MangoDesk internship application.

---

**Need Help?** Check the error logs in both Netlify and Render dashboards.
