import React, { useState } from 'react';
import axios from 'axios';

const AddPdf = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a PDF file.');
      return;
    }
    // Placeholder: You should update this to send the file to your backend
    setMessage('PDF upload feature coming soon!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Add PDF</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Upload</button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default AddPdf; 