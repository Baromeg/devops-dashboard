# DevOps Dashboard

A real-time dashboard application to monitor server statuses and key metrics using WebSockets.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (for local development)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (for deployment)

## Setup

### Clone the Repository

```sh
git clone https://github.com/your-username/devops-dashboard.git
cd devops-dashboard
```

### Environment Variables

Create the following `.env` files in the root directories of the backend and frontend.

**Backend `.env` file:**

```
PORT=4000
```

**Frontend `.env` file:**

```
REACT_APP_API_URL=http://localhost:4000
```

For production, you can set environment variables in the Heroku config.

### Docker Setup

To build and run the entire application using Docker, you can use Docker Compose.

This command will start both the frontend and backend services.

## Development

To build and run the entire application using Docker, you can use Docker Compose during development.

```sh
docker-compose -f docker-compose.dev.yml up --build
```

### Running Backend Locally

To run the backend service locally, follow these steps:

```sh
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:4000`.

### Running Frontend Locally

To run the frontend service locally, follow these steps:

```sh
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`.

## Testing

To run tests for the backend service, use the following command:

```sh
cd backend
npm test
```

## Deployment

### Heroku Deployment

Ensure you have the Heroku CLI installed and you are logged in. Run these commands from the root folder.

To build the production image run

```
docker-compose -f docker-compose.yml up --build
```

1. **Deploy the Backend**

```sh
build-backend
push-backend
release-backend
```

2. **Deploy the Frontend**

```sh
build-frontend
push-frontend
release-frontend
```

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Docker](https://www.docker.com/)
- [Heroku](https://www.heroku.com/)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
