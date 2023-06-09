# Use the official Node.js LTS image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app/Client

# Copy package.json and package-lock.json
COPY Client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY Client .

# Build the React app
RUN npm run build

# # Use a separate Nginx container to serve the static files
# FROM nginx:alpine

# # Copy the built static files from the React container
# COPY --from=build build /usr/share/nginx/html

# # Expose port 5000 for the Nginx server
# EXPOSE 5000

# # Start the Nginx server
# CMD ["nginx", "-g", "daemon off;"]

# Expose the port on which the backend server will run
EXPOSE 3000

# Start the backend server
CMD [ "npm", "run", "host" ]