## Setup Instructions

## Prerequisites

Please have this installed on ur computer
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

## Stack Used

### Frontend
- React 18
- Vite (build tool)

### Backend
- Express.js (web framework)
- better-sqlite3 (database)
- CORS (middleware)

### Database
- SQLite

### How to Install

1. **Clone the repository**
```bash
git clone https://github.com/PPKPIsTrying112/Campus_Lost_And_Found.git
cd Campus_Lost_And_Found
```

2. **Install ALL dependencies** (one command per folder)
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. **Run the application** (Alrdy configured to run frontend and backend at once)

```bash
cd client
npm run dev #vite wwill be in action
```

4. **Open your browser**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/posts

### In case anyone adds a new dependency, rerun this 
```bash 
git pull origin main

cd server
npm install

cd ../client 
npm install 
```

ojwpfjweofijweofjweofjweofiwjeofjeo