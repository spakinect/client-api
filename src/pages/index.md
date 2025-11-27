---
id: intro
title: Introduction
---

# Introduction to the Spakinect Client API

This documentation provides a comprehensive guide for **Client systems** to integrate with the **Spakinect platform**. Our API enables seamless data exchange for managing patient appointments, treatments, and visit status.

---

## Getting Started

To begin the integration process, your Client system must first contact the Spakinect team. Upon registration, we will provide you with a unique API key, which is required for secure authentication on all API requests. 

This key serves as a **secure authentication token** for your system, ensuring that only authorized requests can access our platform.

---

## Staging Environment

For all your testing and development needs, you can use our **staging environment**. This environment is separate from our production system and is designed to allow you to test your integration without affecting live data. Spakinect will provide you a Staging Account along with an  API key.


This key allows you to test all available endpoints, including those for creating appointments, retrieving treatments, and checking visit status.

---

## Authentication

All API requests must include your API key in the request headers. The API key should be sent using the `Authorization` header with the following format:

```
Authorization: Bearer YOUR_API_KEY
```

Without proper authentication, API requests will be rejected with a `401 Unauthorized` response.

---


## Available Endpoints

The Client API provides the following main endpoints:

- **Appointments**: Create new at-home appointments
- **Treatments**: Retrieve available treatments  
- **Visits**: Check the status of a visit using GFE ID

For detailed information about each endpoint, including request/response formats and examples, please refer to the [API Reference](/docs) section.

---

## Webhooks

The Client API supports webhooks to notify your system about important events in real-time. Contact the Spakinect team to configure webhook URLs for your account.

Supported webhook events include:
- **visit.completed**: Get notified when a GFE visit is completed with treatment decisions
- **treatment.updated**: Get notified when treatment information is updated

For webhook payload details and implementation examples, see the [Webhook Events](/webhooks) documentation

---

## Support

If you have any questions or need assistance with the integration, please contact the Spakinect support team.
