import sqlite3

# Connect to the DB
conn = sqlite3.connect('todos.db')
cursor = conn.cursor()

# Query for table names
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print("Tables in todos.db:")
for table in tables:
    print(f"- {table[0]}")

# Check row counts
for table in [t[0] for t in tables]:
    cursor.execute(f"SELECT COUNT(*) FROM {table};")
    count = cursor.fetchone()[0]
    print(f"  Rows in {table}: {count}")

# Print users table details
cursor.execute("SELECT id, email FROM users;")
users = cursor.fetchall()
print("\nUsers in DB:")
for user in users:
    print(f"- ID: {user[0]}, Email: {user[1]}")

conn.close()
