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

3. **Run the application** (Already configured to run frontend and backend at once)

```bash
cd client
npm run dev #vite will be in action
cd ..
cd server
node index.js
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
**In order to run Tests with Cucumber and Playwright**
```bash
npm install --save dev @cucumber/cucumber
npx playwright install
```
### Running End to End Tests
**Relies on Cucumber and Playwright**
```bash
cd ./Campus_Lost_And_Found
cd client
npm run dev 
```

1. **Open another bash terminal**
```bash
cd ./Campus_Lost_And_Found
cd server
node index.js
```

2. **Open another bash terminal**
```bash
cd ./Campus_Lost_And_Found
```

3. **first test: Logs in, creates a post, Logs out**
```bash
npm run test:postTest
```

4. **second test: Logs in, tries to claim post, gets hit with claim error, Logs out**
- IMPORTANT ASSUMPTION: only works as intended when first post is already claimed by user
```bash
npm run test:claimTest
```

### Diagrams
![Entity Relationship Diagram and Component Diagram for Project](diagram.svg)
