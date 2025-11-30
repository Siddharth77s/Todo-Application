# Todo App Backend - FastAPI

This is the backend for the Todo Mobile Application assignment for GrowEasy.ai.

## Tech Stack

- Python 3.11
- FastAPI
- SQLAlchemy (PostgreSQL or SQLite)
- JWT Authentication

## Features

- User Authentication (Signup / Login with JWT)
- Todo Management (CRUD)
- Profile retrieval

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/YourUsername/todo-app-backend.git
cd todo-app-backend
```
2. create a virtual environment and activate it:

python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate


3. Install dependencies:

pip install -r requirements.txt


4. Run the server:

uvicorn main:app --host 0.0.0.0 --port 8000 --reload


The API will be available at: http://localhost:8000

## API Endpoints
Auth

1. Signup
POST /auth/signup
Request body:

{
  "email": "test@test.com",
  "password": "password123"
}


2. Login
POST /auth/login
Request body:

{
  "email": "test@test.com",
  "password": "password123"
}


3. Response:

{
  "access_token": "<JWT>",
  "token_type": "bearer"
}

4. Profile

Get current user
GET /profile
Headers:

Authorization: Bearer <JWT>


Response:

{
  "id": 1,
  "email": "test@test.com"
}

## Todos

1. Get all todos
GET /todos
Headers: Authorization: Bearer <JWT>

2. Create todo
POST /todos
Request body:

{
  "title": "New Task"
}


3. Update todo
PUT /todos/{id}
Request body:

{
  "completed": true
}

## cURL Examples

1. Login

curl -X POST "http://localhost:8000/auth/login" \
-H "Content-Type: application/json" \
-d '{"email":"test@test.com","password":"password123"}'


2. Fetch Todos

curl -X GET "http://localhost:8000/todos" \
-H "Authorization: Bearer <JWT>"
