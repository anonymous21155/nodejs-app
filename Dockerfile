FROM node:20-alpine
WORKDIR /app
COPY . . 
RUN npm install
EXPOSE 3600
CMD ["node", "index.js"]