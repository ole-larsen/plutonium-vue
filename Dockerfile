FROM node:alpine AS build
WORKDIR /server
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install -g npm@latest && npm install
COPY . .
RUN npm run build

FROM node:alpine AS production
EXPOSE 3010
WORKDIR /app
COPY package.json .
COPY --from=build /server/dist ./build
COPY --from=build /server/node_modules ./node_modules
RUN npm install -g npm@latest
ENTRYPOINT npm run preview
