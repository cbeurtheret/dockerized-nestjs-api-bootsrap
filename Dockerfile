FROM node:14-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./


FROM base AS development

RUN npm ci

COPY . .

RUN npm run build

FROM base AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm ci --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
