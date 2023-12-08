Hey Everyone!! This is a demo app for Laravel Cashier setup which integrates the Stripe Payment Gateway with a Laravel app. The key features of the app are:
1. SPA: This app is built on top of Angular using Angular inbuilt routing features making it a Single Page Application
2. Material UI: In the app, we've used Angular Material library components to make the UI interactive and applealing by following the material2 guidelines.
3. Frontend and Backend Authentication: It supports both frontend and backend authentication, we store the authenticated user in SessionStorage for frontend authentication.
4. Stripe Payment Gateway: The app incorporates the stripe payment gateway in it to purchase any of the three items mentioned in the dashboard page.

Pages: The app basically contains 6 pages:
1. The landing page to guide user either to login or to register.
2. The register page to register a user.
3. The login page to authenticate a registered user.
4. The dashboard page to show products.
5. The stripe payment gateway page to pay.
6. The my-profile page to access the authenticated user-profile.

Installation: To install and run it in your local server, you need to:

1. Install a local server(xampp preferably).
2. Start the apache/ngnix and mysql local server.
3. Create a database named laravel_stripe in db.
4. open the project in a text-editor(e.g VSCode).
5. Open the terminal
6. run composer install
7. run npm install
8. Make an env file(you may pick one from laravel basic project and adjust it according to your needs).
9. Create an Stripe dev account and get Stripe public and private keys and mention it in your env file.
10. run php artisan migrate
11. run php artisan serve

Feel free to contact me if you get any issues at viratofficial07@gmail.com
