FROM node:16.14.0

# Declaring all arg to use for env in build time
ARG REACT_APP_API_URL
ARG PORT
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV PORT=${PORT}

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN yarn install --force

# Copying source files
COPY . .

# Building app
RUN yarn build

EXPOSE ${PORT}

# Running the app
CMD [ "yarn", "serve" ]