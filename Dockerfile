FROM keymetrics/pm2:latest-alpine

WORKDIR /app

COPY . /app

CMD ["pm2-runtime", "start", "./pm2.json"]

EXPOSE 4242
