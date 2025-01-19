# Stage 1: Build the React application
FROM node:16 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Copy the environment variables file and make it available for the build
ARG REACT_APP_ENV=.env
COPY ${REACT_APP_ENV} /app/.env

# Build the React application
RUN npm run build

# Stage 2: Serve the built application using a lightweight web server
FROM nginx:alpine as production

# Copy the built React files from the first stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the default NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port on which the app will run
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
