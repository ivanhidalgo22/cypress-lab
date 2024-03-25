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

ENV SEED_USERBASE_SIZE=5
ENV SEED_CONTACTS_PER_USER=3
ENV SEED_PAYMENTS_PER_USER=15
ENV SEED_REQUESTS_PER_USER=10
ENV SEED_BANK_ACCOUNTS_PER_USER=1
ENV SEED_LIKES_PER_USER=2
ENV SEED_COMMENTS_PER_USER=2
ENV SEED_NOTIFICATIONS_PER_USER=5
ENV SEED_BANK_TRANSFERS_PER_USER=5
ENV SEED_DEFAULT_USER_PASSWORD=s3cret
ENV PAGINATION_PAGE_SIZE=10

# Ports used by React (frontend) and Express (backend)
ENV PORT=3000
ENV VITE_BACKEND_PORT=3001

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