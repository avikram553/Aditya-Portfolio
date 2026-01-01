# EmailJS Setup Guide for Contact Form

## ✉️ How to Set Up Email Notifications

Your contact form is configured to send you email notifications using **EmailJS** - a free service that sends emails directly from your website.

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. Go to [Email Services](https://dashboard.emailjs.com/admin)
2. Click "Add New Service"
3. Choose **Gmail** (recommended) or any other email provider
4. Follow the instructions to connect your Gmail account (vkrm.aditya553@gmail.com)
5. Click "Create Service"
6. **Copy your Service ID** (looks like: `service_xxxxxxx`)

### Step 3: Create Email Template

1. Go to [Email Templates](https://dashboard.emailjs.com/admin/templates)
2. Click "Create New Template"
3. Use this template:

**Subject:**
```
New Contact from {{from_name}} - Portfolio
```

**Content:**
```
You have a new message from your portfolio contact form!

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Reply to: {{from_email}}
```

4. Click "Save"
5. **Copy your Template ID** (looks like: `template_xxxxxxx`)

### Step 4: Get Your Public Key

1. Go to [Account Settings](https://dashboard.emailjs.com/admin/account)
2. Find the **Public Key** section
3. **Copy your Public Key** (looks like: `xxxxxxxxxxxxxxx`)

### Step 5: Update Your .env.local File

Open `/Users/adityavikram/Downloads/Aditya-Portfolio-main/.env.local` and replace:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

With your actual IDs:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### Step 6: Restart Your Dev Server

1. Stop the frontend server (Ctrl+C in the terminal running npm)
2. Start it again:
```bash
cd /Users/adityavikram/Downloads/Aditya-Portfolio-main
export PATH="/opt/homebrew/bin:$PATH"
npm run dev
```

### Step 7: Test the Contact Form

1. Open [http://localhost:8081](http://localhost:8081)
2. Scroll to "Get In Touch" section
3. Fill in the form with test data
4. Click "Send Message"
5. Check your email (vkrm.aditya553@gmail.com) for the notification!

---

## 🎯 What Happens When Someone Submits the Form

1. User fills out:
   - Name
   - Email  
   - Message

2. Clicks "Send Message"

3. EmailJS sends an email to **vkrm.aditya553@gmail.com** with:
   - Subject: "New Contact from [Name] - Portfolio"
   - The person's name, email, and message
   - Reply-to address set to their email

4. User sees success message: "Message Sent! ✉️"

5. You receive the email notification in your Gmail inbox!

---

## 📧 Email Features

✅ **Free**: 200 emails/month on free plan (more than enough for a portfolio)  
✅ **Instant**: Emails arrive in seconds  
✅ **No Backend**: Works directly from the browser  
✅ **Secure**: No sensitive credentials in frontend code  
✅ **Reliable**: 99.9% uptime  
✅ **Reply-Ready**: Reply-to address is automatically set to sender's email

---

## 🔧 Troubleshooting

### "Configuration Error" message
- Make sure you've updated `.env.local` with your actual EmailJS IDs
- Restart the dev server after updating `.env.local`

### "Failed to send message" error
- Check your EmailJS dashboard to ensure:
  - Service is connected to Gmail
  - Template is saved and active
  - Public key is correct
- Check browser console for detailed error messages

### Email not arriving
- Check your spam/junk folder
- Verify the template has the correct recipient email
- Test the template directly in EmailJS dashboard

### Rate limit reached
- Free plan: 200 emails/month
- If needed, upgrade to EmailJS paid plan ($9/month for 2000 emails)

---

## 🚀 Alternative: EmailJS Template Variables

You can customize the template with these variables:

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - Their message
- `{{to_email}}` - Your email (vkrm.aditya553@gmail.com)

---

## 📱 Mobile Testing

The contact form works perfectly on mobile devices too! Test it on your phone to see how visitors will use it.

---

## 🎉 That's it!

Your contact form will now send you email notifications whenever someone reaches out through your portfolio!

For more information: [EmailJS Documentation](https://www.emailjs.com/docs/)
