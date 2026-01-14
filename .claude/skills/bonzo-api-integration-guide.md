# Bonzo API Integration Guide

Create prospects directly into pipeline stages to trigger automatic SMS/email campaigns.

## How It Works

1. **You send:** Prospect info + Pipeline Stage ID
2. **Bonzo does:** Creates prospect → Assigns to stage → Starts linked campaign → Sends automated outreach

One API call triggers the entire automation.

## Endpoint

```
POST https://app.getbonzo.com/api/v3/prospects/pipeline/{pipelineStageId}
```

## Authentication

```
Authorization: Bearer YOUR_API_KEY
```

## Minimum Required

| Field | Type | Description |
|-------|------|-------------|
| `first_name` | string | Prospect's first name |

## Common Fields

| Field | Type | Description |
|-------|------|-------------|
| `last_name` | string | Last name |
| `email` | string | Email address |
| `phone` | string | Phone number |
| `address` | string | Street address |
| `city` | string | City |
| `prospect_state` | string | State |
| `prospect_zip` | string | ZIP code |
| `external_id` | string | Your system's ID for the prospect |

## Assigning to Team Members

Use the `On-Behalf-Of` header to assign prospects to specific users:

```
On-Behalf-Of: user@company.com
```

## Example

```bash
curl -X POST \
  "https://app.getbonzo.com/api/v3/prospects/pipeline/12345" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "On-Behalf-Of: loanofficer@company.com" \
  -d '{
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@example.com",
    "phone": "555-123-4567",
    "address": "123 Main St",
    "city": "Phoenix",
    "prospect_state": "AZ",
    "prospect_zip": "85001"
  }'
```

## What Happens Automatically

1. Prospect created and assigned to specified user
2. Placed in pipeline stage
3. Linked campaign starts
4. SMS/email sends per campaign schedule

No additional calls needed.

## Notes

- **Unique phone/email:** Bonzo merges on these fields
- **Stage IDs:** Found in pipeline settings in Bonzo admin
- **On-Behalf-Of:** Accepts user email, Bonzo ID, or external ID (prefixed with `ex:`)
