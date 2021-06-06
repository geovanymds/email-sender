FROM node:14.15.0-alpine3.10 AS base
RUN mkdir /app && chown -R node:node /app 
WORKDIR /app 
COPY --chown=node:node package.json yarn.lock ./
RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean
COPY --chown=node:node . .
ENV PATH=/app/node_modules/.bin:$PATH
RUN yarn install --only=development
USER node
CMD ["yarn", "dev"]