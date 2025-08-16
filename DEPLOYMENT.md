# 🚀 Deployment Guide - AI Meeting Summarizer

This guide will help you deploy the AI Meeting Summarizer application to production.

## 📋 Prerequisites

- Node.js v16 or higher
- Git repository access
- Groq API key
- Gmail account with app password
- Deployment platform accounts (Vercel, Railway, etc.)

## 🎯 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended

#### Frontend Deployment (Vercel)

1. **Prepare for Deployment**
   ```bash
   # Build the frontend
   npm run build
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Connect your GitHub repository
   - Set build settings:
     - Framework Preset: Vite
     - Build Command: `cd client && npm run build`
     - Output Directory: `client/dist`
     - Install Command: `npm run install-all`

3. **Environment Variables (Vercel)**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend-url.railway.app`

#### Backend Deployment (Railway)

1. **Deploy to Railway**
   - Go to [Railway](https://railway.app)
   - Connect your GitHub repository
   - Set deployment settings:
     - Root Directory: `server`
     - Build Command: `npm install`
     - Start Command: `npm start`

2. **Environment Variables (Railway)**
   ```env
   GROQ_API_KEY=your-groq-api-key
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=5000
   NODE_ENV=production
   ```

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend Deployment (Netlify)

1. **Build and Deploy**
   ```bash
   npm run build
   ```
   - Upload `client/dist` folder to Netlify
   - Or connect GitHub repository

2. **Environment Variables**
   - Add `VITE_API_URL=https://your-backend-url.onrender.com`

#### Backend Deployment (Render)

1. **Deploy to Render**
   - Go to [Render](https://render.com)
   - Create new Web Service
   - Connect GitHub repository
   - Set Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables**
   - Same as Railway configuration

### Option 3: Heroku (Full Stack)

1. **Prepare for Heroku**
   ```bash
   # Create Procfile in root directory
   echo "web: cd server && npm start" > Procfile
   ```

2. **Deploy to Heroku**
   ```bash
   heroku create your-app-name
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set GROQ_API_KEY=your-key
   heroku config:set EMAIL_USER=your-email
   heroku config:set EMAIL_PASS=your-password
   ```

## 🔧 Configuration Updates

### Update API Base URL

After deploying the backend, update the frontend API calls:

1. **For Vercel/Netlify**: Set environment variable `VITE_API_URL`
2. **For local development**: Update `vite.config.js` proxy settings

### CORS Configuration

The backend is already configured with CORS, but you may need to update it for production:

```javascript
// In server/index.js
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
  credentials: true
}));
```

## 🔒 Security Checklist

- [ ] API keys are in environment variables
- [ ] CORS is properly configured
- [ ] File upload size limits are set
- [ ] Email validation is implemented
- [ ] HTTPS is enabled (automatic on most platforms)

## 📊 Monitoring and Logs

### Railway
- View logs in Railway dashboard
- Set up alerts for errors

### Vercel
- View function logs in Vercel dashboard
- Monitor performance metrics

### Render
- View logs in Render dashboard
- Set up health checks

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS configuration in backend
   - Verify frontend URL is in allowed origins

2. **API Key Issues**
   - Verify environment variables are set correctly
   - Check Groq API key validity

3. **Email Not Sending**
   - Verify Gmail app password
   - Check if 2FA is enabled
   - Review email service logs

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

### Debug Commands

```bash
# Check environment variables
echo $GROQ_API_KEY

# Test API endpoints
curl https://your-backend-url.com/api/health

# View logs
heroku logs --tail  # For Heroku
railway logs        # For Railway
```

## 📈 Performance Optimization

1. **Frontend**
   - Enable gzip compression
   - Use CDN for static assets
   - Implement lazy loading

2. **Backend**
   - Enable caching for API responses
   - Optimize database queries (if applicable)
   - Use connection pooling

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

For deployment issues:
1. Check platform-specific documentation
2. Review error logs
3. Verify environment variables
4. Test locally first

---

**Ready to deploy! 🚀**
