import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyReports = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const email = sessionStorage.getItem('email');
        if (!email) {
          setError('User not logged in.');
          setLoading(false);
          return;
        }
        // Fetch userId by email
        const userRes = await axios.get(`http://localhost:8080/fetch/userid?email=${email}`);
        const userId = userRes.data.userId;
        // Fetch PDFs for this user
        const pdfRes = await axios.get(`http://localhost:8080/api/user-pdfs/list/${userId}`);
        setPdfs(pdfRes.data);
      } catch (err) {
        setError('Failed to fetch reports.');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // For now, download links will just point to a static folder or show the filename
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">My Reports</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul className="w-full max-w-lg">
          {pdfs.length === 0 ? (
            <li>No reports found.</li>
          ) : (
            pdfs.map((pdf) => (
              <li key={pdf.id} className="flex items-center justify-between p-2 border-b">
                <span>{pdf.pdfFilename}</span>
                {/* Adjust the download link as needed to match your backend/static file serving */}
                <a
                  href={`http://localhost:8080/static/uploads/${pdf.pdfFilename}`}
                  download
                  className="px-3 py-1 bg-primary text-white rounded hover:bg-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default MyReports; 