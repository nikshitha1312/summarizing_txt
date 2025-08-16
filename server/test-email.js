const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmailConfig() {
  try {
    console.log('Testing email configuration...');
    
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    console.log('Email User:', emailUser);
    console.log('Email Pass:', emailPass ? '***configured***' : 'NOT CONFIGURED');
    
    if (!emailUser || emailUser === 'your-email@gmail.com' || !emailPass || emailPass === 'your-app-password') {
      console.log('❌ Email not configured properly!');
      console.log('Please run setup-email.bat to configure email settings.');
      return;
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });
    
    // Verify connection
    await transporter.verify();
    console.log('✅ Email configuration is working!');
    console.log('You can now use the email sharing feature.');
    
  } catch (error) {
    console.log('❌ Email configuration failed:');
    console.log('Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Solution:');
      console.log('1. Enable 2FA on your Gmail account');
      console.log('2. Generate an App Password');
      console.log('3. Run setup-email.bat to configure');
    }
  }
}

testEmailConfig();
