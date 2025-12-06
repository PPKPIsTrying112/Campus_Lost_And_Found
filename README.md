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
- IMPORTANT ASSUMPTIONS: only works as intended when first post is already claimed by user
and the posts have 3 security questions
```bash
npm run test:claimTest
```

### Diagrams
![Entity Relationship Diagram and Component Diagram for Project](diagram.svg)

Our component diagram shows the REST API calls between the client and the server. The diagram also shows how the server interacts with the database and our local filesystem storage through the assumptions our database makes about our storage systems.

Our entity relationship diagram shows how the user, found items, and claims interact with each other. Our diagram shows the aspects each of our main topics should have, as well as the relations each topic has with each other including cardinality and the type of relation they have with each other.

### 3 Distinct Features of Our App
1. Claims

In our app, users are able to claim lost items posted by other users. While claiming, the users will have to answer the three security questions made by the finder.

On the finder's end, the user is able to access these claims and see the supposed owner's answers to the security questions and decide whether to approve or deny the claim.

If approved, the post will be moved to the archive page. If denied, the post will stay in the found items page.


2. Posting and viewing details of items

In our app, users are able to post lost items they found. To post an item, users will need to fill out a form detailing the item description, the location it was found, the date it was found, as well as 3 security questions that only a owner of the item would know (i.e the contents of a wallet or the background of a phone screen)

Once an item is posted, these item details can be found in the item's specific item details page, which is accessible by clicking the individual item boxes on the main found items page. 

3. Profile page and its features

In our app, users are able to view their own profile as well as other user profiles. Profiles display the user profile picture, name, email, and posts.

Users can change their own profile picture by clicking their icon on the profile page, where they can upload local files on their computer with instant uploads and changes to their picture. 

