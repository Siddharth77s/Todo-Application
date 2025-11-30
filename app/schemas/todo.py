from pydantic import BaseModel
from typing import Optional

class TodoBase(BaseModel):
    title: str

class TodoCreate(TodoBase):
    pass

class Todo(TodoBase):
    id: int
    completed: bool
    user_id: int

    class Config:
        from_attributes = True

class TodoUpdate(BaseModel):
    completed: Optional[bool] = None