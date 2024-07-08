# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:19-bullseye

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install dependencies.
COPY package*.json ./
RUN npm install
RUN npm install -g typescript

# Copy local code to the container image.
COPY . .

# Set environment variables
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Install development dependencies for testing
RUN npm install --only=dev

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Run the web service on container startup.
CMD ["npm", "run", "dev"]
