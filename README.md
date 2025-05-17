Sigue los pasos para clonar el proyecto e instalar las dependencias:

1. Clonar el repositorio
Clona este repositorio en tu máquina local:

https://github.com/clarosgerd/dfcollectorweb.git
cd dfcollectorweb

2. Instalar dependencias
Instala las dependencias necesarias para el proyecto:

    composer install
   
    npm install
   
    npm run build
   
    cp .env.example .env
   
    php artisan key:generate

Configuración
Sigue los pasos para configurar el proyecto:

1. Corre las migraciones

   php artisan migrate
   
   php artisan migrate:refresh



