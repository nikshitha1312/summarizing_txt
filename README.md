# 🤖 AI Meeting Summarizer - MangoDesk Internship Project

A full-stack AI-powered meeting notes summarizer and sharer application built with React, Node.js, and Groq AI.

## 🚀 Features

- **📄 File Upload**: Upload .txt transcript files or paste text directly
- **🤖 AI Summarization**: Generate structured summaries using Groq AI
- **📝 Custom Instructions**: Provide custom prompts for different summary styles
- **✏️ Editable Summaries**: Edit generated summaries before sharing
- **📧 Email Sharing**: Share summaries via email with multiple recipients
- **💡 Prompt Suggestions**: Quick-select common summary instructions
- **📱 Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling with modern gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **Nodemailer** - Email functionality
- **Axios** - HTTP client for API calls

### AI Service
- **Groq API** - Fast AI inference for text summarization

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Groq API key
- Gmail account (for email functionality)

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

### 2. Environment Setup

Create a `.env` file in the `server` directory:

```bash
# Copy the example file
cp server/env.example server/.env
```

Edit `server/.env` with your credentials:

```env
# Groq API Configuration
GROQ_API_KEY=your-actual-groq-api-key

# Email Configuration (Gmail)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password

# Server Configuration
PORT=5000
```

### 3. Get API Keys

#### Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up/Login and create an API key
3. Add the key to your `.env` file

#### Email Setup (Required for Email Sharing)
**Option 1: Quick Setup**
1. Run `setup-email.bat` and follow the prompts
2. Or manually edit `server/.env` with your Gmail credentials

**Option 2: Manual Setup**
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for this application
3. Update `server/.env` with your Gmail address and app password
4. See `EMAIL-SETUP.md` for detailed instructions

**Test Email Configuration:**
```bash
cd server
node ../test-email.js
```

### 4. Run the Application

```bash
# Start both frontend and backend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📁 Project Structure

```
mangodesk/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── server/                 # Node.js backend
│   ├── index.js           # Express server
│   ├── package.json       # Backend dependencies
│   └── env.example        # Environment variables template
├── package.json           # Root package.json
└── README.md              # This file
```

## 🔧 API Endpoints

### Health Check
- `GET /api/health` - Server status

### File Upload
- `POST /api/upload-transcript` - Upload .txt transcript files

### AI Summarization
- `POST /api/generate-summary` - Generate AI summary with custom prompt

### Email Sharing
- `POST /api/share-summary` - Share summary via email

## 🎯 How to Use

1. **Upload Transcript**: Either upload a .txt file or paste your meeting transcript
2. **Add Custom Instructions**: Enter specific instructions for the AI (e.g., "Summarize in bullet points for executives")
3. **Generate Summary**: Click "Generate Summary" to get AI-powered results
4. **Edit Summary**: Modify the generated summary as needed
5. **Share**: Send the summary via email to recipients

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
npm run build
```

2. Deploy the `client/dist` folder to your preferred platform

### Backend Deployment (Railway/Render/Heroku)

1. Set environment variables on your hosting platform
2. Deploy the `server` folder
3. Update the frontend API base URL to point to your deployed backend

### Environment Variables for Production

```env
GROQ_API_KEY=your-groq-api-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
NODE_ENV=production
```

## 🔒 Security Considerations

- API keys are stored in environment variables
- File uploads are validated for type and size
- Email addresses are validated before sending
- CORS is configured for security

## 🐛 Troubleshooting

### Common Issues

1. **"Failed to generate summary"**
   - Check your Groq API key
   - Ensure you have sufficient API credits

2. **"Failed to share summary"**
   - Verify Gmail credentials
   - Check if 2FA is enabled and app password is correct

3. **File upload issues**
   - Ensure file is .txt format
   - Check file size (max 10MB)

### Development Commands

```bash
# Run only backend
npm run server

# Run only frontend
npm run client

# Run both (development)
npm run dev

# Build for production
npm run build
```

## 📝 License

This project is created for MangoDesk internship application.

## 🤝 Contributing

This is a demonstration project for internship application. For questions or issues, please contact the developer.

---

**Built with ❤️ for MangoDesk Internship Application**
