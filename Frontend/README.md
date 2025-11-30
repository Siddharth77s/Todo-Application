
---

## **2️⃣ Frontend README (`frontend/README.md`)**

```markdown
# Todo App Frontend - React Native

This is the frontend for the Todo Mobile Application assignment for GrowEasy.ai.

## Tech Stack

- React Native
- Axios for API requests
- AsyncStorage for token storage
- React Navigation

## Screens

1. **Login / Signup**  
   - First-time users must sign up
   - Returning users must log in

2. **Dashboard**  
   - Fetch and display tasks via API
   - Users can create todos and mark completion

3. **Profile**  
   - Display user profile details

---

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/YourUsername/todo-app-frontend.git
cd todo-app-frontend
---

2.Install dependencies:
```
npm install


3. Run the app (Android):

npx react-native run-android

For iOS:

npx react-native run-ios

4. Update the backend API URL in src/utils/auth.js and src/api.js:

const API_BASE = 'http://<Your_PC_IP>:8000'; // replace <Your_PC_IP> with your computer IP

## Screenshots

Login / Signup
images/1000502945.jpg
Dashboard
![alt text](file:///c%3A/Users/Siddharth/Downloads/1000502945.jpg)

Profile
![alt text](file:///c%3A/Users/Siddharth/Downloads/1000502946.jpg)


## Features

User authentication (JWT)

Todo CRUD operations

Fetch and display user profile

AsyncStorage to persist login token

Mobile-ready responsive UI

Notes

Make sure your backend is running and accessible from your mobile device.

Replace API URL with your PC IP when testing on a mobile device.


---
