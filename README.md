# FIUBER-BackOffice
FIUBER’s Back Office

# Local installation & usage
1. Install dependencies: `npm install`
2. Start the app: `npm start`

# Local installation & usage with backend services
1. Install dependencies: `npm install`
2. Create `.env` file with the following content:
```
REACT_APP_USERS_URL=http://localhost:8001
REACT_APP_TRIPS_URL=http://localhost:8002/api
REACT_APP_METRICS_URL=http://localhost:8003
```
3. Launch backend services using Docker Compose: `docker compose up --build`
4. Start the app: `npm start`
