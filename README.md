# TailorChallenge
Tailor-Hub assignment fullstack in which you are asked to create a functional SPA where an user can create/delete an account nd add restaurants to favourites from a list displayed on the screen.

Built with ```ReactJS & NextJS```, styled with ```styled-components```, tested with ```Jest & React Testing Library``` and deployed in ```Vercel```.

## How it looks

🔗 [Live Demo](https://tailor-challenge.vercel.app/)


## 1- Download

```sh
git clone https://github.com/Silinde87/TailorChallenge.git

cd TailorChallenge

place .env file with all environments variables required at root folder
```

## 2- Usage with CLI
```sh
npm run build
npm run start 
```
- [Open localhost:3000/](http://localhost:3000/)

## 3- Testing
```sh
npm run test
```


## Endpoint Table

### Client
Verb | Endpoint | Result
------------ | ------------- | -------------
GET | "/" | Home page with list of all restaurants
GET | "/:id" | Restaurant detail page
GET | "/favourites" | Page with list of favourite restaurants
GET | "/auth/login" | Login Page
GET | "/auth/signup" | Signup Page

### API
Verb | Endpoint | Result
------------ | ------------- | -------------
GET | "/api/restaurants" | Retrieve list of all restaurants
POST | "/api/restaurants" | Creates a restaurant
GET | "/api/restaurants/:id" | Retrieve details of a restaurant based on his id
PUT | "/api/restaurants/:id" | Updates a restaurant based on his id
DELETE | "/api/restaurants/:id" | Deletes a restaurant based on his id
POST | "/api/users" | Creates a user account
POST | "/api/users/:id" | Retrieve details of a user based on his id
PUT | "/api/users/:id" | Updates a user based on his id
DELETE | "/api/users/:id" | Deletes a user based on his id


## Project Structure

    .
    ├── components              # React Component and component styles
    │   ├── CardRestaurant
    │   ├── FormUser
    │   ├── Map
    │   │   ├── Mapbox
    │   │   └── MarkerIcon
    │   ├── NavBar
    │   ├── ReviewCard
    │   ├── ReviewContainer
    │   ├── ScheduleRestaurant
    │   └── Text
    ├── pages                   # NextJS Pages and API
    │   ├── api
    │   │   ├── auth
    │   │   │   └── [...nextauth].js
    │   │   ├── restaurants
    │   │   │   ├── [id].js
    │   │   │   └── index.js
    │   │   └── users
    │   │       ├── [id].js
    │   │       └── index.js  
    │   ├── auth
    │   │   ├── login.js
    │   │   └── signup.js
    │   ├── [id].js
    │   ├── favourites.js
    │   ├── _app.js
    │   ├── _document.js
    │   └── index.js
    ├── context                 # Context API
    │   └── auth.context.js
    ├── models                  # DB Model
    │   └── User.js
    ├── data                    # Seed for restaurants list
    │   └── restaurants.json      
    ├── services                # Service that connects to the endpoint
    │   ├── restaurant.service.js
    │   └── user.service.js
    ├── public                  # Assets
    │   ├── images
    │   └── fonts
    ├── styles                  # Global and pages styles
    ├── utils                   # Support functions and tools
    ├── package.json    
    └── README.md

## Author

👤 **Pau Rodríguez**

* Website:  https://www.linkedin.com/in/paurodriguezmolina/
* Github: [@Silinde87](https://github.com/Silinde87)
* LinkedIn: [@paurodriguezmolina](https://linkedin.com/in/paurodriguezmolina)