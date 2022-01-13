FROM node:latest

WORKDIR /PlaylistManager

#installation angular et dépendences
COPY package*.json /PlaylistManager/
RUN npm install
RUN npm install -g @angular/cli

# copie app
COPY . /PlaylistManager

# démarrage app
CMD ng serve --host 0.0.0.0

# docker run -d -it -p 4201:4200 --name annuaire annuaire-frontend:latest