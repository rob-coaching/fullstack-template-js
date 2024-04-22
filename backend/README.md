# Setup

## Install packages

`npm install`

## Environment / Config

Copy file .env.sample to a new file .env

In the file .env:
Adapt the MONGO_URI to your Database (either on ATLAS or local MongoDB installation)

Caution: Check that you specify the DATABASE NAME at the end of the url.

Example: mongodb://localhost/my_db?retryWrites=true&w=majority
=> here "my_db" is the database name. Please insert your database name here

## Start API

`npm run dev`

The API will not automatically start a browser.

It should start on http://localhost:5000.
The URL should get shown in terminal and you can open it by clicking on it.

Enjoy adapting, little grasshopper!