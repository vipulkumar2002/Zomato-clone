# Zomato-clone

> Frontend-> React JS

> Backend-> Node JS & Express JS

> Database-> MongoDB

## Installation process

1. #### clone the repo using this command
   ```bash
   git clone https://github.com/vipulkumar2002/Zomato-clone.git
   ```
2. #### install npm packages
   1. install backend packages
   ```bash
   cd Zomato-clone
   npm install
   ```
   2. install frontend packages
   ```bash
   cd client
   npm install
   ```
3. go to the parent folder of zomato-clone & create .env for connection, JWT_SECRET, BRAINTREE_MERCHANT_ID, BRAINTREE_PUBLIC_KEY and BRAINTREE_PRIVATE_KEY.

   ```bash
   cd Zomato-clone
   sudo nano .env
   ```

   (ctrl+x to save & nano follow instruction there)

   ##### sample code for backend .env

   ```env
   MONGODB_URI=YOUR_MONGODB_URI
   JWT_SECRET=YOUR_JWT_SECRET
   BRAINTREE_MERCHANT_ID=YOUR_BRAINTREE_MERCHANT_ID
   BRAINTREE_PUBLIC_KEY=YOUR_BRAINTREE_PUBLIC_KEY
   BRAINTREE_PRIVATE_KEY=YOUR_BRAINTREE_PRIVATE_KEY
   ```

4. create another .env file inside client directory for REACT_APP_API_URL.

   ```bash
   cd Zomato-clone/client
   sudo nano .env
   ```

   ##### sample code for frontend .env

   ```env
   REACT_APP_API_URL=YOUR_API_URL
   ```

   <!-- ##### Instructions:

   1. for mongodb atlas database creation follow this tutorial->https://www.youtube.com/watch?v=KKyag6t98g8
   2. you can use any random string as JWTSECRET
   <!-- 3. for localhost REACT_APP_API_URL is http://localhost:5000/api
      but for heroku (server deployment) it will be different -->

   4. #### note: add .env on .gitignore
   5. for server deployment use secrets directly

5. <b>deploy this project</b> on your local server by using this command

   ```bash
   cd Zomato-clone
   npm run dev
   ```

   #### note: both backend & frontend server will start at once with the above command.

6. #### Database Structure: (Table: columns)
   <!-- 1. categories: \_id, name, createdAt, updatedAt;
   2. orders: \_id, status, products (Array), transaction_id, amount, address, user (Object), createdAt, updatedAt
   3. products: \_id, photo (Object), sold, name, description, price, category, shipping, quantity, createdAt, updatedAt
   4. users: \_id, role, history (Array), name, email, salt, hashed_password, createdAt, updatedAt --> -->

### App Description:

    1. Auth (Authenticating the user and creating the user in the database)
    2. Food (Food Items and their details)
    3. Restaurant (Restaurants and their details)
    4. Menu (Menu and its details ) Adding new Menu, updating Menu
    5. Payments (Payments and its details)
    6. Reviews (Reviews and its details)
    7. User (User and its details)
    8. Images (Images and its details)
    9. Mail (Mail and its details)

<!-- 6. <b>Deployed on</br> https://ecommerce-ak.herokuapp.com/ -->

7. raise a star to support me
