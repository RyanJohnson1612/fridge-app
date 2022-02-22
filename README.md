<h1><p align="center"> ✨ Fridgie ✨ </h1></p>
<p align="center"> Meet <strong> Fridgie: </strong> a digital replica of your fridge that keeps track of expiry dates 👀, creates shopping lists 📝, and generate recipes ideas 💡. </p>


## Life just got easier ❤️ 

No more heartbreaks from discovering mould on the veggies you were about to use for dinner. With a quick glance at Fridgie, you can see the freshness status of all your ingredients, empowering you to use them up before they spoil.

## Your taste buds will thank you 🥙

Not sure what to cook with ingredients you have at home? Fridgie’s got you. With the click of a button, Fridgie will generate a variety of recipes customized to _you_ based on the items in _your_ fridge.

## Shopping made a breeze 🛒

Once an item in your fridge is used up, add it to your shopping list with a click of a button. Create multiple customized shopping lists for your different needs, mark items as purchased as you go, and with a quick “click”, place items from your shopping list back into your fridge

## <h2><p align="center">  Save time. Save money. Live Happy.  <h2></p>



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

