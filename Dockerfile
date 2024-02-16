FROM node:21.6.2-alpine3.19

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4549
CMD ["npm", "start"]