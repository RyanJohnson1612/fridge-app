<h1><p align="center"> ✨ Fridgie ✨ </h1></p>
<p align="center"> Meet <strong> Fridgie: </strong> a digital replica of your fridge that keeps track of expiry dates 👀, creates shopping lists 📝, and generate recipes ideas 💡. </p>


## Life just got easier ❤️ 

No more heartbreaks from discovering mould on the veggies you were about to use for dinner. With a quick glance at Fridgie, you can see the freshness status of all your ingredients, reminding you to use them up before they spoil. Just snap a quick photo of your food to add it to your app...Fridgie's smart enough to identify the food item for you. 
<p align="center"> <img src="https://user-images.githubusercontent.com/79466802/155426993-c6a56049-8ea4-4e05-a70b-f91cc7ece326.gif"> </p>



## Your taste buds will thank you 🥙

No ideas for what to cook with the ingredients you have at home? No worries. With the click of a button, Fridgie will generate a variety of recipes customized to _you_ based on the items in _your_ fridge.

<p align="center"> <img src="https://user-images.githubusercontent.com/79466802/155428838-73be8928-7191-46fb-9527-1ec7d49d3b25.gif"> </p>


## Shopping made a breeze 🛒

Once an item in your fridge is used up, add it to your shopping list with a click of a button. Create multiple customized shopping lists for your different needs, mark items as purchased as you go, and with a quick “click”, place items from your shopping list back into your fridge. 

<p align="center"> <img src="https://user-images.githubusercontent.com/79466802/155426262-541e3684-d6ed-4c4e-b0b7-72678c693aa0.gif"> </p>

## <h2><p align="center">  Save time. Save money. Live Happy.  <h2></p>

## App Screenshots

### Fridge Page / Homepage
!["Screenshot of fridge page"](https://github.com/RyanJohnson1612/fridge-app/blob/main/docs/fridge-page.png)

### Fridge Item
!["Screenshot of fridge item"](https://github.com/RyanJohnson1612/fridge-app/blob/main/docs/fridge-item-card.png)

### Add Fridge Item Page
!["Screenshot of add fridge item page"](https://github.com/RyanJohnson1612/fridge-app/blob/main/docs/add-fridge-item-page.png)

### Grocery List
!["Screenshot of grocery list"](https://github.com/RyanJohnson1612/fridge-app/blob/main/docs/grocery-list-page.png)

### Recipe Ideas
!["Screenshot of recipe ideas page"](https://github.com/RyanJohnson1612/fridge-app/blob/main/docs/recipe-ideas-page.png)

### Registration
!["Screenshot of registration page"](https://github.com/RyanJohnson1612/fridge-app/blob/main/docs/registration-page.png)

## To Setup This Project

Note: Both server and client code should be running in seperate terminals

### Server Code

1. Clone this repo with `git clone git@github.com:RyanJohnson1612/fridge-app.git`

2. Change directory to server code

3. Install Dependencies with `npm install`

4. Copy .env.example and rename to .env and fill in environment variables

5. Create a psql database with name and credentials that you filled in for the environment variables

6. Run the initial migrations and seeds with `npm run db:reset`

7. Run `npm start` or `npm run local` to run the server

8. If you go to your localhost:8080/users (or whatever port you added in your .env) and see user test data then the server is good to go! 

### Client Code

1. From the main directory, change directory to client code

2. Install dependencies with `npm install`

3. Sign up for a Edamam and Spoonacular account to utilize their api

4. Copy .env.example and rename to .env and fill in environment variables, which include the api keys from Edamam and Spoonacular

5. Once that finishes run `npm start`

6. Your browser should automatically open a new tab or window with the app running

### Getting started with using the app

1. Register for a new account - you will be directed to your empty fridge

2. Add a new fridge item or create a new grocery list to keep track of what you need to purchase. Add an item from your grocery list to your fridge by clicking the fridge icon.

3. Start filling in your fridge!

4. Enjoy!

