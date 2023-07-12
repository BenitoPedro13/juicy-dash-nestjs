# Base image
FROM node:19-slim

# Create app directory
WORKDIR /home/node/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Expose port(s) to other containers
EXPOSE 3000

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]

# Keeps Container Running Forever
CMD ["tail", "-f", "/dev/null"]
