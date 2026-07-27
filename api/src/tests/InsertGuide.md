# Academic Calendar API - Test Guide

## Test Users

### Administrator - Queila Lima

**Endpoint**

```http
POST /api/auth/login
```

**Request**

```json
{
  "edv": 92906898,
  "password": "queila123"
}
```

---

### Apprentice - Fernanda Fialho

**Endpoint**

```http
POST /api/auth/login
```

**Request**

```json
{
  "edv": 92906815,
  "password": "fefito123"
}
```

---

## Seeded Event

The seed creates the following event automatically.

| Property           | Value                   |
| ------------------ | ----------------------- |
| Event ID           | **1**                   |
| Title              | Aula de Python          |
| Subject Instructor | 1                       |
| Creator            | Queila Lima (User ID 4) |
| Start              | 2026-07-27 13:30        |
| End                | 2026-07-27 17:30        |

---

# Add Participants

## Endpoint

```http
POST /api/event/participants
```

Participants are created with the default status **PENDING**.

---

### Add Fernanda Fialho

(User ID **2**)

```json
{
  "userId": 2,
  "eventId": 1
}
```

---

### Add Jhenifer Halma

(User ID **1**)

```json
{
  "userId": 1,
  "eventId": 1
}
```

---

## Verify Participants

```http
GET /api/event/participants/1
```

---

# Accept Invitation

Login as the invited user.

## Endpoint

```http
PUT /api/user/event/confirm/{participationId}
```

Example:

```http
PUT /api/user/event/confirm/1
```

Request body

```json
{
  "status": "CONFIRMED"
}
```

---

# Reject Invitation

```http
PUT /api/user/event/confirm/{participationId}
```

Example:

```http
PUT /api/user/event/confirm/2
```

Request body

```json
{
  "status": "DECLINED"
}
```

---

# Other Valid Status Values

```text
PENDING
CONFIRMED
DECLINED
ATTENDED
CANCELLED
```

---

# Suggested Test Flow

## Authentication

* [ ] Login as Administrator (Queila Lima)
* [ ] Login as Apprentice (Fernanda Fialho)

---

## Participants

* [ ] Add Fernanda to Event 1
* [ ] Add Jhenifer to Event 1
* [ ] Verify both participants were added
* [ ] Try adding Fernanda again (must fail)
* [ ] Remove a participant
* [ ] Try removing the same participant twice (must fail)

---

## Invitation Workflow

* [ ] Login as Fernanda
* [ ] Accept the invitation
* [ ] Login as Jhenifer
* [ ] Reject the invitation
* [ ] Verify participant statuses

---

## Expected Status Flow

```text
PENDING
      │
      ├────────► CONFIRMED
      │
      ├────────► DECLINED
      │
      ├────────► CANCELLED
      │
      └────────► ATTENDED
```
