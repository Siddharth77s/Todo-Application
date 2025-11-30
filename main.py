import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.routes import auth, todos, profile
from app.core.database import engine, Base # Import Base from here too

app = FastAPI(title="Todo API", version="1.0.0")

# CORS for React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to app domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Routes
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(todos.router, prefix="/todos", tags=["todos"])
app.include_router(profile.router, prefix="/profile", tags=["profile"])
# Root endpoint (optional)
@app.get("/")
async def root():
    return {"message": "Welcome to Todo API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)