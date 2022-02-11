# Fridge App (name WIP)

A fridge and grocery manager app that allows users to keep track of their food products along with their expiry dates, with the ultimate goal of minimizing food waste.

## To Setup This Project

Both the server and client code should be running in seperate terminals

### Server Code

1. Clone this repo with

```sh
git clone git@github.com:RyanJohnson1612/fridge-app.git
```

2. Change directory to server code

3. Install Dependencies

```sh
npm install
```

4. Copy .env.example and rename to .env and fill in variables

5. Create a psql database with name and credentials that you filled in for the environment variables

6. Run the initial migrations and seeds

```sh
npm run db:reset
```

7. Run `npm start` or `npm run local` for development

8. If you go to your localhost:8080/users (or whatever port you added in your env) and see test data then the server is go to 

### Client Code

1. Change directory to client code

2. Install dependencies

```sh
npm install
```
3. Once that finishes run `npm start`

4. You browser should automatically open a new tab or window with the app running

