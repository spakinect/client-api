# Webhook Documentation Approach

## Decision: Separate Markdown File vs. OpenAPI JSON

We've chosen to document webhooks in a **dedicated Markdown file** (`docs/webhooks.md`) rather than in the OpenAPI JSON specification. Here's why:

---

## Advantages of Markdown Approach

### 1. **Better Narrative Structure**
- Webhooks are **events that Spakinect sends TO the client**, not endpoints the client calls
- Markdown allows for better explanation of the event-driven nature of webhooks
- Can include comprehensive setup instructions, best practices, and troubleshooting

### 2. **Code Examples**
- Markdown supports rich code examples with syntax highlighting
- Can show complete webhook handler implementations in multiple languages
- Easier to maintain and update code snippets

### 3. **Clearer Documentation Flow**
- Separates "What you call" (API endpoints) from "What we send you" (webhook events)
- Prevents confusion between making API requests and receiving webhook notifications
- Better aligns with how developers think about integrations

### 4. **More Flexible Content**
- Can include detailed tables, diagrams, and formatted payload descriptions
- Easier to add sections on security, idempotency, retry logic, etc.
- Better suited for tutorial-style content

### 5. **Easier Maintenance**
- Developers and technical writers can edit Markdown more easily than OpenAPI specs
- Changes to webhook documentation don't affect API specification validation
- Simpler version control and review process

---

## Why Not OpenAPI?

### OpenAPI Limitations for Webhooks

1. **Conceptual Mismatch**: OpenAPI is designed for documenting APIs you *call*, not events you *receive*
2. **Limited Callback Support**: While OpenAPI 3.0+ supports `callbacks`, they're:
   - Verbose and complex to write
   - Not well-supported by many documentation tools
   - Harder for developers to understand
3. **No Endpoint Management**: Since webhooks are configured outside the API (by contacting Spakinect), there are no actual endpoints to document

---

## Our Implementation

### What We Kept in OpenAPI JSON
- Webhook **payload schemas** (`VisitCompletedWebhook`, `TreatmentUpdatedWebhook`)
- These schemas are referenced in the Markdown documentation
- Maintains type definitions in a single source of truth

### What We Put in Markdown
- Webhook **event descriptions** and when they're triggered
- **Configuration instructions** (contact Spakinect team)
- **Security best practices**
- **Example implementations** for webhook handlers
- **Testing and troubleshooting** guidance
- **Full payload examples** with field descriptions

---

## File Structure

```
client-api/
├── api/
│   └── client-openapi.json          # API endpoints + webhook payload schemas
├── docs/
│   ├── intro.md                     # Overview and getting started
│   └── webhooks.md                  # Webhook events documentation ⭐
└── sidebars.js                      # Navigation (includes webhooks page)
```

---

## Navigation Flow

Users can access webhook documentation through:

1. **Sidebar Navigation**: "Webhook Events" appears between "Introduction" and "API Reference"
2. **From Introduction**: Links to webhook documentation for real-time updates
3. **From Homepage**: Brief webhook section with link to full documentation

---

## Best Practices for Similar Cases

### When to Use Markdown
- Event-driven notifications (webhooks, server-sent events)
- Complex integration workflows
- Tutorial-style content
- Extensive code examples
- Setup/configuration instructions

### When to Use OpenAPI
- RESTful API endpoints
- Request/response specifications
- Authentication schemes
- Standardized error responses
- When auto-generating client libraries

---

## Alternative Approaches Considered

### 1. OpenAPI Callbacks (Rejected)
```yaml
callbacks:
  visitCompleted:
    '{$request.body#/webhook_url}':
      post:
        requestBody:
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/VisitCompletedWebhook'
```
**Why not**: Too complex, requires webhook URL in API request (which we don't have)

### 2. Fake Endpoint Documentation (Rejected)
Document webhooks as if they were POST endpoints the client calls
**Why not**: Misleading and confusing

### 3. Separate OpenAPI Spec (Rejected)
Create a second OpenAPI file just for webhook events
**Why not**: Overcomplicated, splitting documentation unnecessarily

---

## Conclusion

The **Markdown approach** provides the best developer experience for webhook documentation:
- ✅ Clear separation between API calls and events
- ✅ Rich code examples and best practices
- ✅ Easy to maintain and update
- ✅ Better narrative structure
- ✅ Keeps payload schemas in OpenAPI for consistency

This approach is commonly used by major API providers like Stripe, GitHub, and Twilio for their webhook documentation.

