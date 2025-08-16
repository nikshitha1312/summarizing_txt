const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/plain' || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only .txt and .pdf files are allowed'), false);
    }
  }
});

// Groq API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || 'your-groq-api-key-here';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Generate summary endpoint
app.post('/api/generate-summary', async (req, res) => {
  try {
    const { transcript, customPrompt } = req.body;

    if (!transcript || !customPrompt) {
      return res.status(400).json({ 
        error: 'Transcript and custom prompt are required' 
      });
    }

    // Prepare the prompt for Groq
    const systemPrompt = `You are an expert meeting summarizer. Generate a structured summary based on the user's custom instructions. Always maintain professional tone and ensure the summary is well-organized.`;

    const userPrompt = `Transcript: ${transcript}\n\nCustom Instructions: ${customPrompt}\n\nPlease generate a structured summary following the custom instructions.`;

    const response = await axios.post(GROQ_API_URL, {
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const summary = response.data.choices[0].message.content;

    res.json({ 
      success: true, 
      summary,
      originalTranscript: transcript,
      customPrompt 
    });

  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      details: error.message 
    });
  }
});

// File upload endpoint
app.post('/api/upload-transcript', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let transcript = '';
    
    if (req.file.mimetype === 'text/plain') {
      transcript = req.file.buffer.toString('utf-8');
    } else {
      // For PDF files, you would need a PDF parser library
      // For now, we'll return an error
      return res.status(400).json({ 
        error: 'PDF parsing not implemented yet. Please upload a .txt file.' 
      });
    }

    res.json({ 
      success: true, 
      transcript,
      filename: req.file.originalname 
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ 
      error: 'Failed to upload file',
      details: error.message 
    });
  }
});

// Share summary via email
app.post('/api/share-summary', async (req, res) => {
  try {
    const { summary, recipients, subject, message } = req.body;

    if (!summary || !recipients || !subject) {
      return res.status(400).json({ 
        error: 'Summary, recipients, and subject are required' 
      });
    }

    // Validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const recipientList = recipients.split(',').map(email => email.trim());
    
    for (const email of recipientList) {
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: `Invalid email address: ${email}` 
        });
      }
    }

    // Check if email credentials are configured
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    // For demonstration purposes, if email is not configured, return success with mock response
    if (!emailUser || emailUser === 'your-email@gmail.com' || !emailPass || emailPass === 'your-app-password') {
      console.log('📧 Mock Email Sent (for demonstration):');
      console.log('To:', recipientList);
      console.log('Subject:', subject);
      console.log('Message:', message);
      console.log('Summary length:', summary.length, 'characters');
      
      return res.json({ 
        success: true, 
        message: 'Summary shared successfully (Demo Mode)',
        recipients: recipientList,
        demo: true,
        emailContent: {
          to: recipientList,
          subject: subject,
          message: message,
          summary: summary.substring(0, 200) + '...'
        }
      });
    }

    // Prepare email content
    const emailContent = `
      <h2>Meeting Summary</h2>
      <p><strong>Subject:</strong> ${subject}</p>
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      <hr>
      <div style="white-space: pre-wrap;">${summary}</div>
    `;

    // Send email
    const mailOptions = {
      from: emailUser,
      to: recipientList.join(', '),
      subject: subject,
      html: emailContent
    };

    console.log('Attempting to send email to:', recipientList);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    res.json({ 
      success: true, 
      message: 'Summary shared successfully',
      recipients: recipientList 
    });

  } catch (error) {
    console.error('Error sharing summary:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to share summary';
    let errorDetails = error.message;
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed';
      errorDetails = 'Please check your Gmail credentials and ensure 2FA is enabled with App Password';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Email connection failed';
      errorDetails = 'Please check your internet connection';
    }
    
    res.status(500).json({ 
      error: errorMessage,
      details: errorDetails 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: error.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
