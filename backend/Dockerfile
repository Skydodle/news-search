# Use the official Node.js image with the exact version you are using locally
FROM node:18.18.2

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code to the working directory
COPY . .

# Expose the port your server will run on
EXPOSE 4000

# Run the setup script to set up the database
RUN npm run setup:db:log

# Command to start the backend server
CMD ["npm", "run", "start:server"]
