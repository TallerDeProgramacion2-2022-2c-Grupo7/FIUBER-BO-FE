FROM node
WORKDIR /app
COPY . .
RUN npm install -g serve && npm install
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "build"]
