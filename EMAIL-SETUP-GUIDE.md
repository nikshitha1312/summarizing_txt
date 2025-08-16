# 🔐 Gmail App Password Setup Guide

## 🚨 **Why You're Getting "Email Authentication Failed"**

You're using your **regular Gmail password** instead of an **App Password**. Gmail requires a special 16-character App Password for applications.

## ✅ **Quick Fix (2 Minutes):**

### **Step 1: Enable 2-Factor Authentication**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click "Security" in the left sidebar
3. Click "2-Step Verification" and enable it

### **Step 2: Generate App Password**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click "Security" in the left sidebar
3. Click "App passwords"
4. Select "Mail" and "Other"
5. Enter "AI Meeting Summarizer" as name
6. Click "Generate"
7. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### **Step 3: Update Your App**
1. Run this command: `.\setup-real-email.bat`
2. Enter your Gmail address: `nikshitha1312@gmail.com`
3. Enter the 16-character App Password (not your regular password)
4. Restart the application

## 🎯 **Alternative: Use Email Client (Works Immediately)**

If you don't want to set up App Password right now:
1. Click "📧 Open Email Client" instead of "📤 Send Email"
2. This opens your email client with pre-filled content
3. You can review and send from there

## 🔧 **Troubleshooting:**

- **"Invalid login"**: You're using regular password instead of App Password
- **"2FA not enabled"**: Enable 2-Factor Authentication first
- **"App Password not working"**: Make sure there are no spaces in the password

## 📧 **Your Options:**

1. **Setup App Password** (2 minutes) → Use "📤 Send Email"
2. **Use Email Client** (immediate) → Use "📧 Open Email Client"

---

**The "📧 Open Email Client" option works immediately without any setup!** 🎉
