FROM node:12-alpine AS development
# FROM node:14-alpine
# ENV NODE_ENV development
# Add a work directory
# WORKDIR /SnakeGame
WORKDIR /snakegame
# Cache and Install dependencies
# COPY package.json .
COPY package.json .

# COPY yarn.lock .
# RUN yarn install
RUN npm install
# Copy app files
# RUN npm install nodemon --save-dev
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "run", "start-js" ]
# CMD ["nodemon", "--exec", "npm", "start"]
