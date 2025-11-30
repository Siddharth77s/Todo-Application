from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.todo import Todo as TodoModel  # Alias for clarity
from app.schemas.todo import Todo, TodoCreate, TodoUpdate
from app.utils.jwt import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=Todo)
def create_todo(todo: TodoCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_todo = TodoModel(**todo.dict(), user_id=current_user.id)  # Fixed: Use 'user_id' to match model
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@router.get("/", response_model=List[Todo])
def read_todos(skip: int = 0, limit: int = 100, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    todos = db.query(TodoModel).filter(TodoModel.user_id == current_user.id).offset(skip).limit(limit).all()  # Fixed: Use 'user_id'
    return todos

@router.put("/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, todo_update: TodoUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_todo = db.query(TodoModel).filter(TodoModel.id == todo_id, TodoModel.user_id == current_user.id).first()  # Fixed: Use 'user_id'
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    for field, value in todo_update.dict(exclude_unset=True).items():
        setattr(db_todo, field, value)
    db.commit()
    db.refresh(db_todo)
    return db_todo