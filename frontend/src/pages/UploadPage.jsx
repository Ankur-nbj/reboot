import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  MenuItem,
  TextField,
  Snackbar,
  Card,
  CardContent,
  Stack,
  Avatar,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { extractDetails } from '../api/ocr';

const idTypes = ['Driving License', 'Passport', 'NINOs Card'];

function UploadPage() {
  const [idType, setIdType] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

const handleSubmit = async () => {
  if (!idType || !file) {
    setError('Please select ID type and upload a file');
    return;
  }

  const formData = new FormData();
  formData.append('idType', idType);
  formData.append('file', file);

  const response = await extractDetails(formData);
  
  console.log(response);
  if (response?.dummyData?.isValid) {
    navigate('/form', { state: { data: response.data } });
  } else {
    setError('User is invalid. Please try again.');

    // Clear all fields if invalid
    setIdType('');
    setFile(null);
    setPreview(null);
  }
};


  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Card elevation={4} sx={{ width: '100%', maxWidth: 320, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom sx={{ mb: 2 }}>
            Upload Your ID
          </Typography>

          <Stack spacing={3}>
            {/* Dropdown */}
            <TextField
              select
              label="Select Identity Type"
              fullWidth
              size="small"
              value={idType}
              onChange={(e) => {
                setIdType(e.target.value);
                // Clear file if identity type changes
                setFile(null);
                setPreview(null);
              }}
            >
              {idTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            {/* Upload button with preview */}
            <Button
              variant="outlined"
              component="label"
              startIcon={
                preview ? (
                  <Avatar
                    src={preview}
                    alt="preview"
                    sx={{ width: 24, height: 24 }}
                  />
                ) : (
                  <CloudUpload />
                )
              }
              fullWidth
              disabled={!idType}
            >
              {file ? file.name : 'Upload Image'}
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>

            {/* Submit */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={!idType || !file}
            >
              Submit
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={() => setError('')}
        message={error}
      />
    </Box>
  );
}

export default UploadPage;
