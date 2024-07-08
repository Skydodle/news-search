# Use the official Node.js image with the same version as your local setup
FROM node:18.18.2

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code to the working directory
COPY . .

# Expose the port your frontend dev server will run on
EXPOSE 3000

# Command to start the frontend dev server
CMD ["npm", "run", "dev"]
