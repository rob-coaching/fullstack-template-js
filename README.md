# Fullstack MERN template

This template gives you some boilerplate for an already integrated frontend backend template
with an fully integrated signup, login & logout flow.

Demo: https://fullstack-template-demo.vercel.app

Backend URL: https://backend-universal-template.vercel.app

## How to use

Clone this repo.

In main folder, start backend & frontend together: `npm run dev`

Adapt the .env settings:
- backend: add your MONGO DB Url
- frontend: once you deployed the backend: enter the domain of your deployed backend here

## Auth info 

For the authentication JWT is used and HTTP headers for exchange of the token. 
That prevents the usage of login cookies between frontend and backend which are likely get blocked
by browsers if frontend & backend are deployed to separate domains.

