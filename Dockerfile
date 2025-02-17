# Use Node.js LTS image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000 for Express
EXPOSE 3000

# Wait for the database, then run migrations and start the server
CMD ["sh", "-c", "sleep 5 && npm run migrate && npm run start"]