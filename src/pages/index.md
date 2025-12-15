---
id: introduction
title: Introduction to the Spakinect Client API
sidebar_position: 1
---

# Introduction to the Spakinect Client API

The Spakinect Client Integration API enables medspas and clinics to integrate with the Spakinect telemedicine platform for managing aesthetic treatment appointments.

---

## What You Can Do

- **Create Appointments**: Book Good Faith Exam (GFE) appointments for patients
- **Retrieve Treatments**: Get a list of available treatments
- **Check Visit Status**: Monitor appointment progress and retrieve treatment decisions
- **Receive Webhooks**: Get real-time notifications when visits are completed

---

## Getting Started

### 1. Generate Your API Key

1. Log into the **Spakinect Client Portal**
2. Navigate to **Manage Account** tab
3. Click **Generate API Key**
4. Store your API key securely

### 2. Authentication

Include your API key in the `x-api-key` header for all requests:
```bash
curl -X GET "https://us-central1-spakinect-app.cloudfunctions.net/client/treatments" \
  -H "x-api-key: your_api_key_here"
```

### 3. Configure Webhooks (Optional)

To receive real-time notifications:

1. Go to **Client Portal** → **Manage Account** → **Webhooks**
2. Enter your webhook endpoint URL
3. Save your configuration

---

## Environment

### Production
- **URL**: `https://us-central1-spakinect-app.cloudfunctions.net/client`
- Use for live patient appointments



---

## Quick Example
```javascript
// Create an appointment
const response = await fetch(
  'https://us-central1-spakinect-app.cloudfunctions.net/client/appointments',
  {
    method: 'POST',
    headers: {
      'x-api-key': 'your_api_key_here',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      patient_details: {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        phone: "+12025551234"
      },
      location_id: "loc_12345",
      appointment_time: 1640995200,
      requested_treatments: ["Botox Injection", "Dermal Filler"]
    })
  }
);

const data = await response.json();
console.log('Appointment created:', data.gfe_id);
```

---

## Integration Flow

1. **Create Appointment** - Call `/appointments` endpoint with patient details
2. **Patient Processing** - Spakinect handles consultation and GFE
3. **Get Results** - Receive webhook notification or poll `/visits/{gfe_id}` endpoint to get GFE status
4. **Process Decisions** - Update your system with approved, conditionally approved, or deferred treatments

---

## Support

- **Email**: support@spakinect.com
---

