FROM node:22-alpine

ENV MONGODB_URI='<< URI >>'
ENV JWT_SECRET='<< secret >>'
ENV ACCESS_TOKEN_EXPIRATION=2h
ENV REFRESH_TOKEN_EXPIRATION=24h

WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000
RUN npm run build
CMD ["node", "dist/main.js"]
