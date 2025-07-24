import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function AutoFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data, navigate]);

  const [formData, setFormData] = useState({
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    dob: data?.dob ? new Date(data.dob) : null,
    insuranceNo: data?.insuranceNo || "",
    employerId: data?.employerId || "",
    schemeId: data?.schemeId || "",
    paycenterId: data?.paycenterId || "",
    employmentStartDate: data?.employmentStartDate || "",
    contributionDetails: data?.contributionDetails || "",
    planType: data?.planType || "",
    communicationPref: data?.communicationPref || "",
    nomineeDetails: data?.nomineeDetails || "",
  });

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    // You can send it to your API or navigate as needed.
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        elevation={4}
        sx={{ width: "100%", maxWidth: 700, borderRadius: 3, padding: 1 }}
      >
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Auto-Filled Member Details
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 4, md: 5 }}
              justifyContent="space-around"
            >
              <Grid size={{ xs: 8, sm: 6 }}>
                <TextField
                  label="First Name"
                  value={formData.name}
                  onChange={handleChange("firstName")}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 8, sm: 6 }}>
                <TextField
                  label="Last Name"
                  value={formData.name}
                  onChange={handleChange("lastName")}
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 8, sm: 6 }}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dob}
                  onChange={(newValue) =>
                    setFormData((prev) => ({ ...prev, dob: newValue }))
                  }
                  slotProps={{
                    textField: { sx: { width: "100%" } },
                  }}
                />
              </Grid>

              {[
                ["National Insurance Number", "insuranceNo"],
                ["Employer ID", "employerId"],
                ["Scheme ID", "schemeId"],
                ["Paycenter ID", "paycenterId"],
                ["Start Date of Employment", "employmentStartDate"],
                [
                  "Contribution Details ",
                  "contributionDetails",
                  "e.g. 5% / 10%",
                ],
                ["Plan Type", "planType", "e.g. GPP, GSIPP"],
                [
                  "Communication Preferences",
                  "communicationPref",
                  "e.g. Email, SMS",
                ],
                ["Nominee", "nomineeDetails","enter your nominee details"],
              ].map(([label, key, placeholder]) => (
                <Grid size={{ xs: 8, sm: 6 }} key={key}>
                  <TextField
                    label={label}
                    value={formData[key]}
                    onChange={handleChange(key)}
                    placeholder={placeholder}
                    fullWidth
                  />
                </Grid>
              ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 1 }}>
              Submit
            </Button>
          </LocalizationProvider>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AutoFormPage;
