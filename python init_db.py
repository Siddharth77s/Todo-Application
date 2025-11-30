import sys
sys.path.insert(0, '.')
from main import app  # Triggers imports
from app.core.database import engine, Base
Base.metadata.create_all(bind=engine)
print("Database initialized!")