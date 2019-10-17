FROM node AS installer

# --- CONTAINER ENVIRONMENT --- #
ENV NODE_ENV=production

# --- INSTALL --- #
COPY ./package.json /
RUN npm install

# --- BUILD --- #
FROM installer AS builder

WORKDIR /clubgo
COPY ./clubgo /clubgo

RUN npm run build

# --- RUN --- #
EXPOSE 3333
CMD [ "node", "build/Server.js" ]