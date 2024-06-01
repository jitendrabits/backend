# Use an official Node.js runtime as a parent image

FROM node:16
 
# Set the working directory in the container

WORKDIR /usr/src/app
 
# Copy package.json and package-lock.json if present

COPY package*.json ./
 
# Install dependencies

RUN npm install -f
 
# Bundle app source

COPY . .
 
# Expose port 3000 to the outside world

EXPOSE 3001


# Health check to ensure the app is running

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \

    CMD curl -f http://localhost:3000/ || exit 1
# Command to run the application

CMD ["npm", "start"]
