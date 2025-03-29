# My React Project for University

This project was bootstrapped with [React](https://github.com/facebook/create-react-app).

## Available Scripts

### In the project directory, to run the app please use:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Using db.json
### `npx json-server --watch db.json --port 3001`

Runs the db in the development mode.

## Creating a User.

### When you register as new user it will be stored to db.json.
#### For Example:
```
{
  "users": [
    {
      "id": "2479",
      "email": "test@gmail.com",
      "password": "TestPassword123"
    }
  ]
}
