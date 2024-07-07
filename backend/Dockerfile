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

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Run the web service on container startup.
CMD ["npm", "run", "dev"]
