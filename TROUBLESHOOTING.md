# 🔧 Troubleshooting Guide - Backend Connectivity Issues

## Problem: "Backend Offline" Status in Production

If you see "🔴 Backend Offline" in the chatbot on your Render deployment, follow these steps:

---

## ✅ Quick Fixes (Try These First)

### 1. Check if Backend is Running

Visit your backend URL directly in a browser:
```
https://aditya-portfolio-backend.onrender.com/
```

**Expected Response**:
```json
{
  "status": "ok",
  "service": "Portfolio Chatbot API",
  "model": "mistralai/Mistral-7B-Instruct-v0.2",
  "api_key_status": "configured",
  "message": "Backend is running successfully"
}
```

### 2. Wait for Wake-Up (Free Tier)

If you get a **503 error** or long loading time:
- ⏰ **Wait 20-30 seconds** - Free tier services sleep after 15 minutes
- 🔄 **Refresh the page** after waiting
- ✅ Backend should respond with JSON

### 3. Check Environment Variables

In **Render Dashboard** → **Backend Service** → **Environment**:

**Required**: `HUGGINGFACE_API_KEY`
- ❌ If missing → Add it now
- ✅ If present → Check it's a valid key from https://huggingface.co/settings/tokens

**Optional**: `PYTHON_VERSION`
- Value: `3.11` (or latest)

---

## 🐛 Common Issues & Solutions

### Issue 1: 503 Service Unavailable

**Symptoms**:
- Backend URL returns 503 error
- Chatbot shows "Backend Offline"
- Frontend can't connect

**Causes**:
1. Service is sleeping (free tier)
2. Service crashed during startup
3. Missing environment variables
4. Build failed

**Solutions**:

**A. Check Render Logs**:
1. Go to Render Dashboard
2. Click on `aditya-portfolio-backend`
3. Click "Logs" tab
4. Look for errors in the latest deployment

**B. Verify Environment Variables**:
```bash
# Check if HUGGINGFACE_API_KEY is set
# In Render Dashboard → Backend Service → Environment
# Add if missing:
Key: HUGGINGFACE_API_KEY
Value: hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**C. Manual Redeploy**:
1. Go to backend service
2. Click "Manual Deploy" → "Deploy latest commit"
3. Wait for deployment to complete (3-5 minutes)

---

### Issue 2: CORS Errors

**Symptoms**:
- Browser console shows CORS error
- Frontend can reach backend but requests fail

**Solutions**:

The backend is now configured to allow all origins. If you still see CORS errors:

1. **Clear browser cache**:
   - Press `Ctrl+Shift+Delete` (Windows/Linux) or `Cmd+Shift+Delete` (Mac)
   - Clear "Cached images and files"

2. **Hard refresh**:
   - Press `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)

3. **Check backend logs** for CORS-related errors

---

### Issue 3: Invalid API Key

**Symptoms**:
- Backend responds with "API key authentication failed"
- Chatbot messages show authentication error
- Backend status: "api_key_status": "missing" or "configured" but still fails

**Solutions**:

**A. Get a New Hugging Face API Key**:
1. Go to https://huggingface.co/settings/tokens
2. Click "New token"
3. Name: `portfolio-backend`
4. Type: **Read**
5. Click "Generate token"
6. Copy the token (starts with `hf_`)

**B. Update in Render**:
1. Render Dashboard → Backend Service
2. Environment tab
3. Edit `HUGGINGFACE_API_KEY`
4. Paste new token
5. Click "Save"
6. Service will redeploy automatically

---

### Issue 4: Model Loading Timeout

**Symptoms**:
- First chatbot message takes very long
- Error: "The AI model is currently loading"

**Solutions**:

This is normal for free Hugging Face Inference API:
- First request can take 20-60 seconds (model cold start)
- Subsequent requests are faster (2-5 seconds)
- Wait and retry after 30 seconds

---

### Issue 5: Frontend Can't Find Backend URL

**Symptoms**:
- Frontend tries to connect to `http://localhost:8000`
- Works locally but not in production

**Solutions**:

**A. Check Frontend Environment Variable**:
1. Render Dashboard → Frontend Service
2. Environment tab
3. Verify:
   ```
   VITE_BACKEND_URL = https://aditya-portfolio-backend.onrender.com
   ```
4. If missing or wrong, update it
5. **Important**: Redeploy frontend after changing environment variables

**B. Redeploy Frontend**:
```bash
# In Render Dashboard:
# Frontend Service → Manual Deploy → Deploy latest commit
```

---

## 🔍 Diagnostic Commands

### Test Backend Health

```bash
# Test root endpoint
curl https://aditya-portfolio-backend.onrender.com/

# Test health endpoint
curl https://aditya-portfolio-backend.onrender.com/health

# Test chat endpoint (requires POST)
curl -X POST https://aditya-portfolio-backend.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hi"}]}'
```

### Check CORS

```bash
# Test CORS preflight
curl -X OPTIONS https://aditya-portfolio-backend.onrender.com/api/chat \
  -H "Origin: https://aditya-portfolio-frontend.onrender.com" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

---

## 📊 Health Check Checklist

Run through this checklist to diagnose issues:

- [ ] **Backend URL responds**: Visit `https://aditya-portfolio-backend.onrender.com/`
- [ ] **Returns JSON with "status": "ok"**
- [ ] **api_key_status shows "configured"**
- [ ] **No 503, 500, or 404 errors**
- [ ] **Frontend env var VITE_BACKEND_URL is correct**
- [ ] **Browser console shows no CORS errors**
- [ ] **Render logs show no startup errors**
- [ ] **HUGGINGFACE_API_KEY is set in Render**

---

## 🚨 Emergency Fixes

### Nuclear Option 1: Redeploy Everything

```bash
# 1. In local repository
git commit --allow-empty -m "Trigger redeploy"
git push origin main

# 2. In Render Dashboard
# Both services will auto-redeploy
# Wait 5-10 minutes
```

### Nuclear Option 2: Delete and Recreate

**Backend**:
1. Delete `aditya-portfolio-backend` service
2. Create new Web Service
3. Use manual deployment steps from RENDER_DEPLOYMENT.md
4. Don't forget to set `HUGGINGFACE_API_KEY`!

**Frontend**:
1. Wait for backend to be live
2. Copy backend URL
3. Delete `aditya-portfolio-frontend` service
4. Create new Static Site
5. Set `VITE_BACKEND_URL` to backend URL

---

## 📝 Recent Fixes Applied

The following fixes have been applied to resolve common issues:

### 1. CORS Configuration
**Changed**: CORS now allows all origins
**Why**: Eliminates CORS-related connectivity issues
**File**: `backend/app.py:15-22`

### 2. Health Check Endpoint
**Changed**: Health check path updated to `/health`
**Why**: More reliable health monitoring
**File**: `render.yaml:14`

### 3. Python Version
**Changed**: Updated from Python 3.9.18 to 3.11
**Why**: Better performance and compatibility
**File**: `render.yaml:13`

### 4. Uvicorn Timeout
**Changed**: Added `--timeout-keep-alive 120`
**Why**: Prevents premature connection timeouts
**File**: `render.yaml:8`

### 5. Build Command
**Changed**: Added `pip install --upgrade pip`
**Why**: Ensures latest pip for dependency installation
**File**: `render.yaml:7`

---

## 🆘 Still Having Issues?

### Check Render Status
Visit https://status.render.com to check for platform outages

### Contact Support
- **Render Community**: https://community.render.com
- **Email**: vkrm.aditya553@gmail.com

### Alternative: Run Locally
If Render is down, run the backend locally:

```bash
# Terminal 1: Start backend
cd backend
pip install -r requirements.txt
uvicorn app:app --reload

# Terminal 2: Start frontend
npm run dev

# Visit: http://localhost:8080
```

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ **Backend URL** returns JSON with `"status": "ok"`
2. ✅ **Chatbot header** shows "🟢 Connected to Mistral 7B AI"
3. ✅ **Test message** "Hi" gets response "Hi! How can I help you?"
4. ✅ **No red errors** in browser console (F12)
5. ✅ **Render logs** show no errors

---

**Last Updated**: Based on render.yaml and app.py fixes
**Priority**: CORS, Environment Variables, Wake-up Time
