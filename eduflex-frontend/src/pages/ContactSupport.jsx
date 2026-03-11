import React, { useState } from 'react';
import colors from '@/utils/colors.js';

const ContactSupport = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const submit = (e) => {
    e.preventDefault();
    // Replace with real submit logic
    alert('Message sent to support');
    setMessage('');
    setEmail('');
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 style={{ color: colors.primary.main }} className="text-3xl font-semibold mb-4">Contact Support Team</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <button type="submit" style={{ background: colors.primary.main }} className="text-white px-4 py-2 rounded">
            Send to Support
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactSupport;