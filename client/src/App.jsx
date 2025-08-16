import React, { useState, useRef } from 'react';
import axios from 'axios';

function App() {
  const [transcript, setTranscript] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showShareForm, setShowShareForm] = useState(false);
  const [shareData, setShareData] = useState({
    recipients: '',
    subject: '',
    message: ''
  });
  const [isSharing, setIsSharing] = useState(false);
  const fileInputRef = useRef(null);

  const promptSuggestions = [
    "Summarize in bullet points for executives",
    "Highlight only action items",
    "Create a detailed summary with key decisions",
    "Summarize for technical team members",
    "Extract main topics and discussion points"
  ];

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'text/plain') {
      setError('Please upload a .txt file only');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/upload-transcript', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setTranscript(response.data.transcript);
      setSuccess(`File "${file.name}" uploaded successfully!`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!transcript.trim() || !customPrompt.trim()) {
      setError('Please provide both transcript and custom prompt');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/generate-summary', {
        transcript: transcript.trim(),
        customPrompt: customPrompt.trim()
      });

      setSummary(response.data.summary);
      setSuccess('Summary generated successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate summary');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareSummary = async () => {
    if (!summary.trim() || !shareData.recipients.trim() || !shareData.subject.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSharing(true);
    setError('');

    try {
      const response = await axios.post('/api/share-summary', {
        summary: summary.trim(),
        recipients: shareData.recipients.trim(),
        subject: shareData.subject.trim(),
        message: shareData.message.trim()
      });

      if (response.data.demo) {
        setSuccess('📧 Demo Email Sent! (Check console for details) - For real emails, configure Gmail App Password');
      } else {
        setSuccess('✅ Email sent successfully! Check your inbox.');
      }
      
      setShowShareForm(false);
      setShareData({ recipients: '', subject: '', message: '' });
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to share summary';
      const errorDetails = err.response?.data?.details || '';
      
      if (errorMessage.includes('authentication failed')) {
        setError('🔐 Email Authentication Failed: Please use Gmail App Password (not regular password). Click "📧 Open Email Client" instead for now.');
      } else {
        setError(`${errorMessage} ${errorDetails ? `- ${errorDetails}` : ''}`);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleOpenEmailClient = () => {
    if (!summary.trim() || !shareData.recipients.trim() || !shareData.subject.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    const emailBody = `${shareData.message ? shareData.message + '\n\n' : ''}${summary}`;
    const mailtoLink = `mailto:${shareData.recipients}?subject=${encodeURIComponent(shareData.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.open(mailtoLink, '_blank');
    setSuccess('📧 Email client opened! Your email is ready to send with pre-filled content.');
    setShowShareForm(false);
    setShareData({ recipients: '', subject: '', message: '' });
  };

  const handlePromptSuggestion = (suggestion) => {
    setCustomPrompt(suggestion);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/plain') {
        const event = { target: { files: [file] } };
        handleFileUpload(event);
      } else {
        setError('Please drop a .txt file only');
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🤖 AI Meeting Summarizer</h1>
        <p>Upload your meeting transcript and get AI-powered summaries with custom instructions</p>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="grid">
        {/* Input Section */}
        <div className="card">
          <h2>📄 Upload Transcript</h2>
          
          <div className="form-group">
            <label>Upload Text File (.txt)</label>
            <div 
              className="file-upload"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
              />
              <div className="file-upload-text">
                📁 Click to upload or drag & drop a .txt file
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Or Paste Transcript Directly</label>
            <textarea
              className="form-control"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your meeting transcript here..."
            />
          </div>

          <div className="form-group">
            <label>Custom Instructions</label>
            <textarea
              className="form-control"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., Summarize in bullet points for executives"
            />
            <div className="prompt-suggestions">
              {promptSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="prompt-suggestion"
                  onClick={() => handlePromptSuggestion(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn"
            onClick={handleGenerateSummary}
            disabled={isLoading || !transcript.trim() || !customPrompt.trim()}
          >
            {isLoading ? 'Generating...' : '🚀 Generate Summary'}
          </button>
        </div>

        {/* Output Section */}
        <div className="card">
          <h2>📋 Generated Summary</h2>
          
          {isLoading && (
            <div className="loading">
              AI is analyzing your transcript...
            </div>
          )}

          {summary && (
            <>
              <div className="form-group">
                <label>Summary (Editable)</label>
                <textarea
                  className="form-control"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  style={{ minHeight: '300px' }}
                />
              </div>
              
              <div className="form-group">
                <label>Summary Preview (Formatted)</label>
                <div 
                  className="summary-preview"
                  style={{ 
                    border: '1px solid #ddd', 
                    padding: '15px', 
                    borderRadius: '5px', 
                    backgroundColor: '#f9f9f9',
                    minHeight: '200px',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'Arial, sans-serif'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: summary
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/\n/g, '<br>')
                  }}
                />
              </div>

              <div className="actions">
                <button
                  className="btn btn-success"
                  onClick={() => setShowShareForm(true)}
                >
                  📧 Share via Email
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(summary);
                    setSuccess('Summary copied to clipboard!');
                  }}
                >
                  📋 Copy to Clipboard
                </button>
              </div>
            </>
          )}

          {!summary && !isLoading && (
            <div style={{ textAlign: 'center', color: '#718096', padding: '40px' }}>
              <p>Your generated summary will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Share Form Modal */}
      {showShareForm && (
        <div className="card">
          <h2>📧 Share Summary</h2>
          
          <div style={{ 
            background: '#e3f2fd', 
            border: '1px solid #2196f3', 
            borderRadius: '8px', 
            padding: '15px', 
            marginBottom: '20px' 
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>💡 Email Options:</h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#1976d2' }}>
              <li><strong>📤 Send Email:</strong> Sends directly via the app (requires Gmail App Password)</li>
              <li><strong>📧 Open Email Client:</strong> Opens your email client with pre-filled content (works immediately)</li>
            </ul>
          </div>
          
          <div className="form-group">
            <label>Recipient Email(s) *</label>
            <input
              type="text"
              className="form-control"
              value={shareData.recipients}
              onChange={(e) => setShareData({...shareData, recipients: e.target.value})}
              placeholder="email1@example.com, email2@example.com"
            />
          </div>

          <div className="form-group">
            <label>Subject *</label>
            <input
              type="text"
              className="form-control"
              value={shareData.subject}
              onChange={(e) => setShareData({...shareData, subject: e.target.value})}
              placeholder="Meeting Summary - [Date/Topic]"
            />
          </div>

          <div className="form-group">
            <label>Additional Message (Optional)</label>
            <textarea
              className="form-control"
              value={shareData.message}
              onChange={(e) => setShareData({...shareData, message: e.target.value})}
              placeholder="Add any additional context or message..."
            />
          </div>

          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={handleOpenEmailClient}
            >
              📧 Open Email Client (Recommended)
            </button>
            <button
              className="btn btn-success"
              onClick={handleShareSummary}
              disabled={isSharing}
            >
              {isSharing ? 'Sending...' : '📤 Send via App (Requires Setup)'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowShareForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
