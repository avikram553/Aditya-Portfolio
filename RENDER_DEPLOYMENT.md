# 🚀 Render Deployment Guide - Quick Start

Your portfolio is ready to deploy! Follow these simple steps.

## 📋 What You Need

- ✅ GitHub repository (already pushed)
- ✅ Render account (free at https://render.com)
- ✅ Hugging Face API key
- ✅ EmailJS credentials (already in .env.local)

---

## 🎯 Deployment Steps (5 minutes)

### Step 1: Sign Up for Render

1. Go to **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub account**
4. Authorize Render to access your repositories

### Step 2: Deploy Using Blueprint (Easiest Method)

1. **Go to Render Dashboard**: https://dashboard.render.com

2. **Click "New +" → "Blueprint"**

3. **Connect Repository**:
   - Select `avikram553/Aditya-Portfolio`
   - Click "Connect"

4. **Render will detect `render.yaml` and show**:
   - ✅ Backend service: `aditya-portfolio-backend`
   - ✅ Frontend service: `aditya-portfolio-frontend`

5. **Add Environment Variables**:
   
   For **aditya-portfolio-backend**:
   - Click "Add Environment Variable"
   - Key: `HUGGINGFACE_API_KEY`
   - Value: 
   - Click "Save"

6. **Click "Apply"** at the bottom

7. **Wait for Deployment** (5-10 minutes):
   - Backend will deploy first
   - Frontend will deploy after backend
   - You'll see "Live" status when ready

---

## 🎉 Your Portfolio is Live!

After deployment completes:

**Frontend URL**: `https://aditya-portfolio-frontend.onrender.com`
**Backend URL**: `https://aditya-portfolio-backend.onrender.com`

---

## 🔧 Manual Deployment (Alternative Method)

If you prefer manual setup:

### Deploy Backend First:

1. **New → Web Service**
2. Select repository: `avikram553/Aditya-Portfolio`
3. Configure:
   ```
   Name: aditya-portfolio-backend
   Region: Frankfurt
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app:app --host 0.0.0.0 --port $PORT
   Instance Type: Free
   ```
4. Add environment variable:
   - `HUGGINGFACE_API_KEY` 
5. Click **"Create Web Service"**
6. **Copy the backend URL** (e.g., `https://aditya-portfolio-backend.onrender.com`)

### Deploy Frontend Second:

1. **New → Static Site**
2. Select repository: `avikram553/Aditya-Portfolio`
3. Configure:
   ```
   Name: aditya-portfolio-frontend
   Branch: main
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```
4. Add environment variable:
   - `VITE_BACKEND_URL` = (paste your backend URL from above)
5. Click **"Create Static Site"**

---

## ⚡ Important Notes

### Free Tier Limitations:
- ⚠️ **Backend sleeps after 15 minutes** of inactivity
  - First request after sleep: ~20-30 seconds
  - Subsequent requests: 2-5 seconds
- ✅ **Frontend is always fast** (CDN-served)
- ✅ **750 hours/month** backend uptime (free)
- ✅ **100 GB bandwidth/month** for frontend

### Keep Backend Awake (Optional):
Use **UptimeRobot** (free) to ping your backend every 14 minutes:
1. Sign up at https://uptimerobot.com
2. Add monitor: `https://aditya-portfolio-backend.onrender.com/`
3. Interval: 14 minutes

---

## 🔗 Update Frontend to Use Render Backend

The code is already configured! The frontend automatically uses:
- **Development**: `http://localhost:8000`
- **Production**: `VITE_BACKEND_URL` environment variable

No code changes needed! ✅

---

## 🐛 Troubleshooting

### Backend Shows "Offline" in Chatbot:
1. Visit backend URL directly: `https://aditya-portfolio-backend.onrender.com/`
2. Check if it returns JSON (backend is working)
3. Wait 20-30 seconds if it's waking from sleep
4. Check Render dashboard logs for errors

### Chatbot Not Responding:
1. Open browser console (F12)
2. Look for CORS or network errors
3. Verify `HUGGINGFACE_API_KEY` is set in Render backend
4. Check backend logs in Render dashboard

### Build Failed:
1. Check logs in Render dashboard
2. Common issues:
   - Missing dependencies in `requirements.txt` or `package.json`
   - Wrong Python/Node version
   - Typo in build command

### CORS Error:
1. Verify backend CORS includes your frontend URL
2. Redeploy backend after any code changes
3. Check backend logs for CORS-related errors

---

## 📊 Monitor Your Deployment

**Check Backend Health**:
```bash
curl https://aditya-portfolio-backend.onrender.com/
```

**View Logs**:
1. Go to Render Dashboard
2. Click service name
3. Click "Logs" tab
4. See real-time logs

---

## 🔄 Auto-Deploy (Already Configured!)

When you push to GitHub, Render automatically redeploys:

```bash
# Make changes locally
git add .
git commit -m "Update portfolio"
git push origin main

# Render detects push and redeploys automatically ✨
```

---

## 🎨 Add Custom Domain (Optional)

### For Frontend:

1. Go to frontend service in Render
2. Click **"Settings" → "Custom Domain"**
3. Add domain: `adityavikram.com`
4. Update DNS records:
   ```
   Type: CNAME
   Name: www (or @)
   Value: aditya-portfolio-frontend.onrender.com
   ```
5. Wait for SSL certificate (automatic, ~5 minutes)

### For Backend (if needed):

Same process, but add backend custom domain like `api.adityavikram.com`

---

## 💰 Upgrade Options

**Free Tier**: Perfect for portfolio
- Backend: 750 hours/month
- Frontend: 100 GB bandwidth

**Paid Tier** ($7/month per service):
- ✅ No sleep time
- ✅ Faster builds
- ✅ More resources
- ✅ Priority support

---

## ✅ Post-Deployment Checklist

- [ ] Frontend loads successfully
- [ ] Backend health check works
- [ ] Chatbot status shows "🟢 Online"
- [ ] Chatbot responds to messages
- [ ] Contact form sends emails (EmailJS)
- [ ] All sections render correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] SSL certificate active (https://)
- [ ] Custom domain added (optional)

---

## 🎯 What's Next?

1. **Share Your Portfolio**:
   - LinkedIn: https://linkedin.com/in/avikram553
   - GitHub: https://github.com/avikram553
   - Email signature

2. **Analytics** (Optional):
   - Add Google Analytics
   - Add Plausible Analytics
   - Monitor visitor stats

3. **SEO Optimization**:
   - Update meta tags
   - Add sitemap.xml
   - Submit to Google Search Console

4. **Resume PDF**:
   - Add downloadable resume link
   - Update contact section

---

## 📧 Need Help?

**Render Documentation**: https://render.com/docs
**Render Community**: https://community.render.com
**Your Email**: vkrm.aditya553@gmail.com

---

## 🎉 Congratulations!

Your portfolio is now live on the internet! 🚀

**Frontend**: Professional portfolio with AI chatbot
**Backend**: Python FastAPI with Mistral 7B AI
**Free Hosting**: Thanks to Render's generous free tier

Share your portfolio with the world! 🌍

---

**Deployed with ❤️ on Render**
