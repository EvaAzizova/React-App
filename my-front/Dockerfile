FROM node:14 as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the React app
RUN npm run build

# Serve the app using a lightweight node server
FROM node:14-slim

# Install serve
RUN npm install -g serve

# Copy build files from build image
COPY --from=build-stage /app/build /app/build

# The port on which the app will run
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "app/build", "-l", "3000"]
