# Laravel 7

## How to run app
```
cp .env.example .env
composer install
php artisan key:generate
```

Link storage for files upload
```
php artisan storage:link
```
Run server by command. Local server will be running on `http://localhost:8000`
```
php artisan serve
```
```
php artisan passport:install
```
## Config environment
Edit `.env` 
```
...
# URL of client
APP_CLIENT=http://localhost:3000
...
# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
...
```
