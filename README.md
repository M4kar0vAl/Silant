# Силант

## Переменные окружения

1. Создать в корне проекта и папке `frontend` файл `.env`, в котором указать нужные переменные.
2. Список нужных переменных в файле `example.env` и `frontend/example.env` соответственно

## Установка зависимостей

> [!NOTE]
> При запуске в докере можно пропустить этот шаг

- Для бэкенда:
  1. Перейти в директорию `silant_backend`
  2. Выполнить команду `pip install -r requirements.txt`
- Для фронтенда:
  1. Перейти в директорию `frontend`
  2. Выполнить команду `npm install`

## Запуск

### В докере

1. Перейти в корень проекта
2. Выполнить команду: `docker compose up -d --build`

### Не в докере (кроме БД)

1. Запустить бэкенд:
   - Перейти в папку `silant_backend`
   - Выполнить команду: `python manage.py runserver`
2. Запустить фронтенд:
   - Перейти в папку `frontend`
   - Выполнить команду: `npm run dev`

## Остановка

### В докере

`docker compose down`

### Не в докере (кроме БД)

1. Остановить фронтенд:
   - В терминале, где он запущен нажать сочетание клавиш:
     - _**ctrl + C**_ - для Windows/Linux
     - _**command + C**_ - для MacOS
2. Остановить бэкенд:
   - В терминале, где он запущен нажать сочетание клавиш:
     - _**ctrl + C**_ - для Windows/Linux
     - _**command + C**_ - для MacOS

## Создание суперпользователя

1. В `.env` должны быть указаны следующие переменные:
   - `DJANGO_SUPERUSER_USERNAME`
   - `DJANGO_SUPERUSER_EMAIL`
   - `DJANGO_SUPERUSER_PASSWORD`
2. Выполнить команду:
   - Если запущено в докере: `docker exec django python manage.py createsuperuser --noinput`
   - Если запущено не в докере:
     - Перейти в папку `silant_backend`
     - Выполнить: `python manage.py createsuperuser --noinput`

## Сайт

- Если запущено в докере: **http://localhost/**
- Если запущено не в докере: **http://localhost:5173/**

## Админ-панель

**http://localhost:8000/admin/**

## Добавление пользователей

**http://127.0.0.1:8000/admin/accounts/user/**
