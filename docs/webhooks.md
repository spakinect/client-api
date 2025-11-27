---
id: webhooks
title: Webhook Events
sidebar_position: 2
---

# Webhook Events

Spakinect can send webhook notifications to your system when specific events occur. This allows you to receive real-time updates about visits and treatments without polling the API.

---

## Configuration

To receive webhook notifications, you need to:

1. **Contact the Spakinect team** to configure webhook URLs for your Client account
2. **Provide your endpoint URLs** for each event type you want to subscribe to
3. **Implement webhook handlers** that can receive and process POST requests from Spakinect

---

## Webhook Security

All webhook requests from Spakinect include:

- **Content-Type**: `application/json`
- **User-Agent**: `Spakinect-Webhook/1.0`

Your webhook endpoint should:
- Respond with a `200 OK` status code to acknowledge receipt
- Process the webhook asynchronously to avoid timeouts
- Implement retry logic in case of temporary failures on your end

---

## Supported Events

### 1. Visit Completed (`visit.completed`)

Triggered when a Good Faith Exam (GFE) visit is completed and all treatment decisions have been made.

#### Payload Structure

```json
{
  "event": "visit.completed",
  "timestamp": 1714675200000,
  "success": true,
  "data": {
    "location_id": "loc_12345",
    "gfe_id": "gfe_abc123xyz789",
    "status": "Completed",
    "pdf_link": "https://example-cdn.com/gfe/gfe_abc123xyz789.pdf",
    "requested_treatments": [
      "Botox Injection",
      "Dermal Filler"
    ],
    "approved_treatments": [
      "Botox Injection"
    ],
    "conditionally_approved_treatments": [
      "Dermal Filler"
    ],
    "deferred_treatments": [],
    "patient_details": {
      "name": "Jane Smith",
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "jane.smith@example.com"
    }
  }
}
```

#### Payload Fields

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | Always `"visit.completed"` |
| `timestamp` | integer | Unix timestamp in milliseconds when the event occurred |
| `success` | boolean | Indicates if the data retrieval was successful |
| `data.location_id` | string | The ID of the location where the visit took place |
| `data.gfe_id` | string | Unique identifier for the GFE visit |
| `data.status` | string | Visit status (always `"Completed"` for this event) |
| `data.pdf_link` | string | URL to download the GFE PDF (if available) |
| `data.requested_treatments` | array | List of treatment names originally requested |
| `data.approved_treatments` | array | List of treatment names that were approved |
| `data.conditionally_approved_treatments` | array | List of treatment names with conditional approval |
| `data.deferred_treatments` | array | List of treatment names that were deferred |
| `data.patient_details` | object | Patient information |
| `data.patient_details.name` | string | Patient's full name |
| `data.patient_details.first_name` | string | Patient's first name |
| `data.patient_details.last_name` | string | Patient's last name |
| `data.patient_details.email` | string | Patient's email address |

#### Example Handler (Node.js/Express)

```javascript
app.post('/webhooks/visit-completed', async (req, res) => {
  try {
    const { event, data } = req.body;
    
    // Verify event type
    if (event !== 'visit.completed') {
      return res.status(400).json({ error: 'Invalid event type' });
    }
    
    // Process the webhook data
    console.log(`Visit ${data.gfe_id} completed for location ${data.location_id}`);
    console.log(`Approved treatments:`, data.approved_treatments);
    
    // Update your system with the results
    await updateVisitInYourSystem(data);
    
    // Respond quickly to acknowledge receipt
    res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

---

### 2. Treatment Updated (`treatment.updated`)

Triggered when treatment information is updated in the Spakinect system (e.g., a new treatment is added, an existing treatment is modified, or a treatment is removed).

#### Payload Structure

```json
{
  "event": "treatment.updated",
  "timestamp": 1714675200000,
  "success": true,
  "data": {
    "treatment_id": "treatment_001",
    "treatment_name": "Botox Injection",
    "action": "updated"
  }
}
```

#### Payload Fields

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | Always `"treatment.updated"` |
| `timestamp` | integer | Unix timestamp in milliseconds when the event occurred |
| `success` | boolean | Indicates if the update was successful |
| `data.treatment_id` | string | Unique identifier for the treatment |
| `data.treatment_name` | string | Name of the treatment |
| `data.action` | string | Type of update: `"created"`, `"updated"`, or `"deleted"` |

#### Example Handler (Node.js/Express)

```javascript
app.post('/webhooks/treatment-updated', async (req, res) => {
  try {
    const { event, data } = req.body;
    
    // Verify event type
    if (event !== 'treatment.updated') {
      return res.status(400).json({ error: 'Invalid event type' });
    }
    
    // Process the webhook data based on action
    switch (data.action) {
      case 'created':
        console.log(`New treatment added: ${data.treatment_name}`);
        await addTreatmentToYourSystem(data);
        break;
      case 'updated':
        console.log(`Treatment updated: ${data.treatment_name}`);
        await updateTreatmentInYourSystem(data);
        break;
      case 'deleted':
        console.log(`Treatment removed: ${data.treatment_name}`);
        await removeTreatmentFromYourSystem(data);
        break;
    }
    
    // Respond quickly to acknowledge receipt
    res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

---

## Best Practices

### 1. Idempotency

Your webhook handlers should be idempotent. Spakinect may send the same webhook multiple times in case of delivery failures or retries. Use the `gfe_id` or `treatment_id` along with the `timestamp` to detect and ignore duplicate events.

```javascript
const processedEvents = new Set();

app.post('/webhooks/visit-completed', async (req, res) => {
  const eventKey = `${req.body.data.gfe_id}-${req.body.timestamp}`;
  
  if (processedEvents.has(eventKey)) {
    return res.status(200).json({ received: true, duplicate: true });
  }
  
  processedEvents.add(eventKey);
  
  // Process webhook...
});
```

### 2. Async Processing

Process webhooks asynchronously to ensure you respond quickly and avoid timeouts:

```javascript
app.post('/webhooks/visit-completed', async (req, res) => {
  // Immediately acknowledge receipt
  res.status(200).json({ received: true });
  
  // Process webhook asynchronously
  processWebhookAsync(req.body).catch(error => {
    console.error('Async webhook processing error:', error);
    // Implement your own retry/error handling logic
  });
});
```

### 3. Error Handling

Implement proper error handling and logging:

```javascript
app.post('/webhooks/visit-completed', async (req, res) => {
  try {
    // Validate payload
    if (!req.body.data?.gfe_id) {
      return res.status(400).json({ error: 'Missing gfe_id' });
    }
    
    // Process webhook
    await processWebhook(req.body);
    
    res.status(200).json({ received: true });
    
  } catch (error) {
    // Log error with context
    console.error('Webhook processing failed:', {
      error: error.message,
      event: req.body.event,
      gfe_id: req.body.data?.gfe_id,
      timestamp: new Date().toISOString()
    });
    
    // Still acknowledge receipt to avoid retries
    res.status(200).json({ received: true, error: true });
  }
});
```

### 4. Testing

Test your webhook handlers in the staging environment before deploying to production. Contact the Spakinect team to configure test webhook URLs that point to your staging/development environment.

---

## Troubleshooting

### Not Receiving Webhooks?

1. **Verify Configuration**: Contact Spakinect support to confirm your webhook URLs are correctly configured
2. **Check Endpoint Accessibility**: Ensure your webhook endpoint is publicly accessible and accepts POST requests
3. **Review Logs**: Check your server logs for incoming requests and any errors
4. **Test Manually**: Use tools like `curl` or Postman to manually send test payloads to your endpoint

### Common Issues

- **Timeouts**: Ensure your webhook handler responds within 10 seconds
- **SSL/TLS Errors**: Make sure your webhook endpoint has a valid SSL certificate
- **Firewall Rules**: Verify that your firewall allows incoming requests from Spakinect servers
- **Port Configuration**: Ensure your webhook endpoint is listening on the correct port (typically 443 for HTTPS)

---

## Need Help?

If you have questions about webhook implementation or need assistance with configuration, please contact the Spakinect support team.

