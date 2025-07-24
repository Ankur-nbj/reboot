import axios from 'axios';

export const extractDetails = async (formData) => {
  try {
    const res = await axios.post('http://localhost:8080/api/gov-id/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data; // Should be { isValid: true/false, data: {...} }
  } catch (err) {
    console.error('Upload failed:', err.response);
    return { isValid: false };
  }
};
