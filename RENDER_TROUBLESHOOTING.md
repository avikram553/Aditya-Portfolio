# Render Deployment Troubleshooting Guide

## Current Issue: Backend Returns 404

Your backend service exists on Render but is returning 404 errors instead of FastAPI responses. This means the FastAPI application is not running correctly.

## ✅ What We've Fixed

1. **Frontend Configuration**: Added `VITE_BACKEND_URL` environment variable to render.yaml
2. **Backend Command**: Fixed startCommand syntax in render.yaml
3. **Dependencies**: Removed unused LangChain packages
4. **Local Environment**: Added `VITE_BACKEND_URL=http://localhost:8000` to .env.local

## 🔍 Diagnostic Steps for Render Dashboard

### Step 1: Check Backend Service Logs

1. Go to: https://dashboard.render.com
2. Click on `aditya-portfolio-backend` service
3. Click on "Logs" tab
4. Look for these indicators:

**✅ GOOD SIGNS:**
```
✓ Hugging Face API key loaded: hf_ANKRtTa...
INFO:     Started server process [xxxxx]
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:10000 (or similar port)
```

**❌ BAD SIGNS:**
```
WARNING: HUGGINGFACE_API_KEY not found in environment variables!
Error: <any error messages>
ModuleNotFoundError: No module named 'xxx'
Application startup failed
```

### Step 2: Verify Environment Variable

1. In backend service, go to "Environment" tab
2. Check for `HUGGINGFACE_API_KEY`
3. **Value should be:** `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`
4. If missing, add it and click "Save Changes" (this will trigger a redeploy)

### Step 3: Check Build Logs

1. Go to "Events" tab
2. Find the most recent deploy
3. Click "View build logs"
4. Look for:
   - ✅ `Successfully installed fastapi uvicorn...`
   - ❌ Any error messages during pip install

### Step 4: Manual Deploy

If the service is not deploying automatically:
1. Click "Manual Deploy" button (top right)
2. Select "Deploy latest commit"
3. Wait 2-3 minutes for deployment
4. Check logs for the startup message

## 🧪 Testing the Backend

### Test 1: Health Check
```bash
curl https://aditya-portfolio-backend.onrender.com/
```

**Expected Response:**
```json
{
  "status": "online",
  "service": "Portfolio Chatbot API",
  "model": "mistralai/Mistral-7B-Instruct-v0.2",
  "framework": "Hugging Face Inference API + FastAPI",
  "api_key_status": "configured",
  "api_key_preview": "hf_ANKRtTa...",
  "python_version": "3.9.x ..."
}
```

**Current Response (ERROR):**
```json
{
  "status": "fail",
  "message": "Can't find / on this server"
}
```

### Test 2: Chat Endpoint
Once health check works, test the chat:
```bash
curl -X POST https://aditya-portfolio-backend.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hi"}]}'
```

**Expected:**
```json
{"message":"Hi! How can I help you?"}
```

## 🚨 Common Issues & Solutions

### Issue 1: Environment Variable Not Set
**Symptoms:** Backend starts but shows API key warnings in logs
**Solution:** 
1. Go to Environment tab
2. Add `HUGGINGFACE_API_KEY` = `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`
3. Save (triggers redeploy)

### Issue 2: Build Path Issues
**Symptoms:** Can't find requirements.txt or app.py
**Solution:** Check render.yaml paths:
- buildCommand: `pip install -r backend/requirements.txt`
- startCommand: `cd backend && uvicorn app:app --host 0.0.0.0 --port $PORT`

### Issue 3: Port Binding
**Symptoms:** Application starts but not accessible
**Solution:** Ensure startCommand includes `--port $PORT` (Render provides this)

### Issue 4: Python Version
**Symptoms:** Dependency installation fails
**Solution:** Check `PYTHON_VERSION` env var is set to `3.9.18`

### Issue 5: Free Tier Limitations
**Symptoms:** Service spins down after 15 minutes of inactivity
**Solution:** 
- First request will take 30-60 seconds to wake up
- Keep service warm with periodic health checks
- Upgrade to paid plan for always-on service

## 📋 Frontend Configuration

The frontend needs to know the backend URL at **build time**:

**In render.yaml (for production):**
```yaml
envVars:
  - key: VITE_BACKEND_URL
    value: https://aditya-portfolio-backend.onrender.com
```

**In .env.local (for local development):**
```bash
VITE_BACKEND_URL=http://localhost:8000
```

## 🔄 Deployment Workflow

1. **Push to GitHub** → Triggers auto-deploy (if enabled)
2. **Render pulls latest code** → Runs buildCommand
3. **Install dependencies** → pip install from requirements.txt
4. **Start service** → Runs startCommand
5. **Health check** → Render pings healthCheckPath: /
6. **Service live** → If health check passes

## 📞 What to Share for Help

If still having issues, share:
1. **Build logs** (from most recent deploy)
2. **Runtime logs** (last 50 lines)
3. **Environment variables list** (hide values)
4. **Service status** (from dashboard)
5. **Any error messages**

## ✅ Success Checklist

- [ ] Backend service created on Render
- [ ] `HUGGINGFACE_API_KEY` environment variable set
- [ ] Latest code deployed (check commit hash in Events)
- [ ] Build completed successfully (no errors in build logs)
- [ ] Service shows "Live" status (green dot)
- [ ] Logs show: "Uvicorn running on..."
- [ ] Health check passes: `curl https://aditya-portfolio-backend.onrender.com/`
- [ ] Frontend service has `VITE_BACKEND_URL` set
- [ ] Frontend deployed after backend URL was added
- [ ] Chat endpoint responds: test with curl
- [ ] Chatbot in browser shows "Backend Online"

## 🎯 Next Steps

1. **Check the backend logs NOW** - Look for the specific error
2. **Verify HUGGINGFACE_API_KEY** - Must be set correctly
3. **Share the error logs** - So we can diagnose the exact issue
4. **Wait for redeploy** - After pushing latest changes
5. **Test again** - Use curl commands above

---

**Remember:** Render free tier services spin down after 15 minutes of inactivity. First request after spindown will take 30-60 seconds.
