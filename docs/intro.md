---
id: intro
title: Introduction
sidebar_position: 1
---

# Introduction to the Spakinect Client API

This documentation provides a comprehensive guide for **Client systems** (medspas, clinics) to integrate with the **Spakinect telemedicine platform**. Our API enables seamless data exchange for managing patient appointments, treatments, and visit status.

---

## Getting Started

To begin the integration process, your Client system must first contact the Spakinect team. Upon registration, we will provide you with a unique API key, which is required for secure authentication on all API requests.

This key serves as a **secure authentication token** for your system, ensuring that only authorized requests can access our platform.

---

## Staging Environment

For all your testing and development needs, you can use our **staging environment**. This environment is separate from our production system and is designed to allow you to test your integration without affecting live data. 

**Staging Server**: `https://us-central1-spakinect-staging.cloudfunctions.net/client`

Spakinect will provide you a Staging Account along with an API key. This key allows you to test all available endpoints, including those for creating appointments, retrieving treatments, and checking visit status.

---

## Authentication

All API requests must include your API key in the request headers. The API key should be sent using the `x-api-key` header:

```bash
curl -X GET \
  https://us-central1-spakinect-app.cloudfunctions.net/client/treatments \
  -H 'x-api-key: YOUR_API_KEY'
```

Without proper authentication, API requests will be rejected with a `401 Unauthorized` response.

---

## Available Endpoints

The Client API provides the following main endpoints:

### Core Endpoints

- **POST /appointments** - Create new at-home appointments (Good Faith Exams)
- **GET /treatments** - Retrieve list of available treatments
- **GET /visits/{gfe_id}** - Check the status and details of a visit

For detailed information about each endpoint, including request/response formats and examples, please refer to the **[API Reference](/docs)** section.

### Real-Time Updates

The Client API also supports **webhook notifications** to push real-time updates to your system:

- **visit.completed** - Triggered when a GFE visit is completed with treatment decisions
- **treatment.updated** - Triggered when treatment information is updated

For webhook payload structures and implementation guidelines, see the **[Webhook Events](./webhooks)** documentation.

---

## Integration Flow

### 1. Create an Appointment

When a patient schedules an appointment at your facility, create a Good Faith Exam appointment through the API:

```javascript
POST /appointments
{
  "patient_details": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890"
  },
  "location_id": "loc_12345",
  "appointment_time": 1640995200,
  "requested_treatments": ["Botox Injection", "Dermal Filler"]
}
```

You'll receive a `gfe_id` in response, which uniquely identifies this appointment.

### 2. Patient Completes Visit

The patient will receive an email from Spakinect to complete their visit intake and schedule a telehealth appointment with a Spakinect provider.

### 3. Check Visit Status

You can poll for visit status updates using the `gfe_id`:

```javascript
GET /visits/{gfe_id}
```

### 4. Receive Webhook Notification (Recommended)

Instead of polling, configure webhooks to receive automatic notifications when a visit is completed. The webhook payload will include all treatment decisions:

- Approved treatments
- Conditionally approved treatments
- Deferred treatments

See the [Webhook Events](./webhooks) documentation for implementation details.

---

## API Servers

### Production
```
https://us-central1-spakinect-app.cloudfunctions.net/client
```

### Staging
```
https://us-central1-spakinect-staging.cloudfunctions.net/client
```

---

## Rate Limits

There are currently no strict rate limits on the API. However, we recommend implementing reasonable request intervals to ensure optimal performance:

- Polling for visit status: No more than once per minute
- Creating appointments: Standard business volume

If you need higher throughput, please contact the Spakinect team.

---

## Support

If you have any questions or need assistance with the integration, please contact the Spakinect support team:

- **Email**: support@spakinect.com
- **Documentation Issues**: Please report any documentation errors or suggestions to our support team

