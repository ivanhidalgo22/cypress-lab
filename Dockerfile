# Node as base image
FROM node:18-alpine
# Arguments that might need to pass
#ARG APPLICATION_PORT=3004
#ARG USER=app
#ARG GROUP=app
EXPOSE 3000
EXPOSE 3001
EXPOSE 80
EXPOSE 443

ARG WORKING_DIRECTORY=/app

# App will run under workspace folder
WORKDIR ${WORKING_DIRECTORY}

COPY package.json yarn.lock ./

RUN yarn install

# Copy the executables as well as application code
COPY . .

#ENV PORT=${APPLICATION_PORT}
# The user in charge of the execution
#USER ${USER}
# Entrypoint
CMD [ "yarn", "dev" ] 