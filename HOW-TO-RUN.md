# 🚀 How to Run the AI Meeting Summarizer

## ✅ Quick Start (Recommended)

### Option 1: Using the Batch File (Windows)
1. **Double-click** `start-app.bat` in the project folder
2. **Wait** for both servers to start
3. **Open** http://localhost:3000 in your browser

### Option 2: Using PowerShell Script
1. **Right-click** `start-app.ps1` and select "Run with PowerShell"
2. **Wait** for both servers to start
3. **Open** http://localhost:3000 in your browser

## 🔧 Manual Setup

### Step 1: Install Dependencies
```bash
# Install all dependencies
npm run install-all
```

### Step 2: Set Up Environment Variables
1. **Copy** `server/env.example` to `server/.env`
2. **Edit** `server/.env` with your credentials:
   ```env
   GROQ_API_KEY=your-actual-groq-api-key
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=5000
   ```

### Step 3: Get API Keys

#### Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up/Login and create an API key
3. Add the key to your `.env` file

#### Gmail App Password
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for this application
3. Use this password in the `EMAIL_PASS` field

### Step 4: Run the Application

#### Method 1: Run Both Together
```bash
npm run dev
```

#### Method 2: Run Separately
**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📝 How to Use

1. **Upload Transcript**: Either upload a .txt file or paste your meeting transcript
2. **Add Custom Instructions**: Enter specific instructions for the AI (e.g., "Summarize in bullet points for executives")
3. **Generate Summary**: Click "Generate Summary" to get AI-powered results
4. **Edit Summary**: Modify the generated summary as needed
5. **Share**: Send the summary via email to recipients

## 🐛 Troubleshooting

### Common Issues

1. **"Port already in use"**
   - Close other applications using ports 3000 or 5000
   - Or change ports in the configuration

2. **"Failed to generate summary"**
   - Check your Groq API key in `.env`
   - Ensure you have sufficient API credits

3. **"Failed to share summary"**
   - Verify Gmail credentials in `.env`
   - Check if 2FA is enabled and app password is correct

4. **"Module not found"**
   - Run `npm run install-all` to install all dependencies

### Test the Application

1. **Test File Upload**: Use the provided `sample-transcript.txt`
2. **Test AI Summarization**: Try different custom prompts
3. **Test Email Sharing**: Use your own email address for testing

## 🎯 Success Indicators

✅ Backend server running on port 5000
✅ Frontend server running on port 3000
✅ Can upload .txt files
✅ Can generate AI summaries
✅ Can edit summaries
✅ Can share via email

---

**Your AI Meeting Summarizer is now ready to use! 🎉**
