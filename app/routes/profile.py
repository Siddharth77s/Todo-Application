from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.user import UserResponse  # Response schema for user
from app.utils.jwt import get_current_user  # Function that extracts user from JWT
from app.models.user import User

router = APIRouter()

# Route for the logged-in user's profile
@router.get("/", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized"
        )
    return current_user

# Optional debug route
@router.get("/debug-user/{user_id}")
def debug_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    return {"id": user.id, "email": user.email} if user else {"error": "No user"}
