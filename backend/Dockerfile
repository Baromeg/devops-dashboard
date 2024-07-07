# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:19-bullseye

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install dependencies.
COPY package*.json ./
RUN npm install

# Copy local code to the container image.
COPY . .

# Install development dependencies for testing
RUN npm install --only=dev

# Run the web service on container startup.
CMD ["npm", "run", "dev"]
