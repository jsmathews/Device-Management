# Use the official Node.js LTS image
FROM node:lte

# Set the working directory inside the container
WORKDIR /app/Server

# Install dependencies
COPY Server/package*.json ./
RUN npm install

# Copy the rest of the application code
COPY Server ./

# # Copy the frontend build files
# COPY Client/build ./Client/build

# Expose the port on which the backend server will run
EXPOSE 5000

# Start the backend server
CMD [ "npm", "start" ]
