import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPdfAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all patients by role
    axios.get('http://localhost:8080/fetch/allpatientsbyrole')
      .then(res => {
        setUsers(res.data.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email
        })));
      })
      .catch(() => setMessage('Failed to fetch users.'));
  }, []);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !file) {
      setMessage('Please select a user and a PDF file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post(
        `http://localhost:8080/api/user-pdfs/upload/${selectedUser}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setMessage('PDF uploaded and linked to user successfully!');
    } catch (err) {
      setMessage('Failed to upload PDF.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Add PDF for User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <select value={selectedUser} onChange={handleUserChange} className="px-4 py-2 rounded border">
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
          ))}
        </select>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Link PDF</button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default AddPdfAdmin; 