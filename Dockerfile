FROM node:14.7.0-buster

ENV APPDIR=/app/
WORKDIR $APPDIR

COPY . $APPDIR
RUN npm i

CMD ["npm", "start"]
