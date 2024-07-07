# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:19-bullseye

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install production dependencies.
COPY package*.json ./
RUN npm install

# Copy local code to the container image.
COPY . .

# Start the development server with hot-reloading.
CMD ["npm", "start"]
