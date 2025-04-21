# Flashcard API Documentation

Welcome to the Flashcard API documentation! This API allows you to manage folders and cards for a flashcard application.

---

## Base URL

For local development:  
`http://localhost:3000`

For production (replace with your production URL):  
`https://your-production-url.com`

---

## Endpoints

### 1. **GET `/`**
Provides a welcome message to confirm that the API is running.

#### Response
```json
{
  "message": "Welcome to the Flashcard API!"
}
```

---

### 2. **POST `/folders`**
Create a new folder.

#### Request Body
| Field         | Type   | Required | Description                    |
|---------------|--------|----------|--------------------------------|
| `name`        | String | Yes      | The name of the folder.        |
| `description` | String | No       | A description of the folder.   |

#### Example Request
```json
{
  "name": "Science",
  "description": "Flashcards for science topics"
}
```

#### Example Response
**Status Code**: `201 Created`
```json
{
  "id": 1,
  "name": "Science",
  "description": "Flashcards for science topics",
  "created_at": "2025-04-21T11:30:00.000Z"
}
```

#### Error Responses
- **400 Bad Request**: If required fields are missing.
- **500 Internal Server Error**: If the folder could not be created.

---

### 3. **DELETE `/folders/:id`**
Delete a folder by its ID. This will **cascade delete all cards** in the folder.

#### Path Parameters
| Field | Type   | Required | Description            |
|-------|--------|----------|------------------------|
| `id`  | Number | Yes      | The ID of the folder.  |

#### Example Request
```http
DELETE /folders/1
```

#### Example Response
**Status Code**: `200 OK`
```json
{
  "message": "Folder deleted successfully"
}
```

#### Error Responses
- **404 Not Found**: If the folder ID does not exist.
- **500 Internal Server Error**: If the folder could not be deleted.

---

### 4. **POST `/cards`**
Create a new card under a folder using the folder name.

#### Request Body
| Field         | Type   | Required | Description                    |
|---------------|--------|----------|--------------------------------|
| `folder_name` | String | Yes      | The name of the folder.        |
| `front`       | String | Yes      | The front side of the card.    |
| `back`        | String | Yes      | The back side of the card.     |

#### Example Request
```json
{
  "folder_name": "Science",
  "front": "What is the chemical symbol for water?",
  "back": "H2O"
}
```

#### Example Response
**Status Code**: `201 Created`
```json
{
  "id": 1,
  "folder_id": 1,
  "front": "What is the chemical symbol for water?",
  "back": "H2O",
  "created_at": "2025-04-21T11:35:00.000Z"
}
```

#### Error Responses
- **404 Not Found**: If the folder name does not exist.
- **500 Internal Server Error**: If the card could not be created.

---

### 5. **DELETE `/cards/:id`**
Delete a card by its ID.

#### Path Parameters
| Field | Type   | Required | Description        |
|-------|--------|----------|--------------------|
| `id`  | Number | Yes      | The ID of the card.|

#### Example Request
```http
DELETE /cards/1
```

#### Example Response
**Status Code**: `200 OK`
```json
{
  "message": "Card deleted successfully"
}
```

#### Error Responses
- **404 Not Found**: If the card ID does not exist.
- **500 Internal Server Error**: If the card could not be deleted.

---

## Error Handling

All error responses follow this format:
```json
{
  "error": "Error message here"
}
```

### Common Status Codes
- **200 OK**: The request was successful.
- **201 Created**: A resource was successfully created.
- **400 Bad Request**: The request was invalid or missing parameters.
- **404 Not Found**: The requested resource does not exist.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---

## Example Usage

### Create a Folder
#### Request
```http
POST /folders
Content-Type: application/json

{
  "name": "Math",
  "description": "Flashcards for math topics"
}
```

#### Response
```json
{
  "id": 2,
  "name": "Math",
  "description": "Flashcards for math topics",
  "created_at": "2025-04-21T11:30:00.000Z"
}
```

---

### Create a Card
#### Request
```http
POST /cards
Content-Type: application/json

{
  "folder_name": "Math",
  "front": "What is 2 + 2?",
  "back": "4"
}
```

#### Response
```json
{
  "id": 2,
  "folder_id": 2,
  "front": "What is 2 + 2?",
  "back": "4",
  "created_at": "2025-04-21T11:40:00.000Z"
}
```

---

### Delete a Folder
#### Request
```http
DELETE /folders/2
```

#### Response
```json
{
  "message": "Folder deleted successfully"
}
```

---

### Delete a Card
#### Request
```http
DELETE /cards/2
```

#### Response
```json
{
  "message": "Card deleted successfully"
}
```

---

## Notes
- Ensure you replace `localhost:3000` with your production URL when deploying.
- Always validate input on the client side before sending requests to the API.
- Use the `folder_name` for creating cards, but remember that folder names must be unique.

---

If you have any questions or need further assistance, feel free to reach out!
