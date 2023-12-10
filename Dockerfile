FROM node:16 as builder
WORKDIR '/usr/src/app'
COPY package.json ./
RUN npm install
COPY . .
COPY interfaces.d.ts ./node_modules/@angular/fire/compat/firestore
RUN ["npm", "run", "build"]
CMD ["bash"]
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/inventory .
RUN ls -al /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
