FROM node:12.16.2
WORKDIR /world-map-api

COPY . .
RUN npm install

RUN apt-get update
RUN apt-get install -y postgresql-client

RUN chmod +x ./entrypoint.sh
CMD ./entrypoint.sh