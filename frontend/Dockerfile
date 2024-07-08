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

# Set environment variables
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Build the application
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["serve", "-s", "build"]