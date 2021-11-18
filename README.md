# Instructions for running the app

```
npm install
npm start
```

## How to run the project

Install json server using
`npm i -g json-server`

Get the file db.json that existed

Run it using
`json-server --watch db.json --port 4000`

Get the backend branch from this repo and install the dependencies.
`npm start`

As the react axios module returns CORS error everytime it runs, I decided to make a request call using backend and serve the api here

## Project directories

- views (Contains the main pages of app)
- components (Contains the component that used in the pages)
- api (Fetching and authenticating user from json-server)
- helpers (Contains helper components such as protected route)
- routers (Contains the main route for the whole app)
- store
  - actions (Contains the actions that acts as a mediator between reducer and useDispatch)
  - reducers
  - selectors (Contains the selectors for specific needs such as filtering and pagination)
  - context (Contains the ContextAPI in a seperate folder for easy access)

## Parts that are not done

- The carousel that displays the top 3 highly-rated items that have topmost current offers
- Testing (As I'm new to testing and just learned testing now, I've struggled to do even a simple test. If you can give me some time, I would be able to do it)



Thank you
