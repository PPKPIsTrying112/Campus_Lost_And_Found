## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/PLACEHOLDER
cd my-post-app
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
