# Рейтинг пользователей

## Описание

Это приложение представляет собой систему рейтинга пользователей. Оно позволяет добавлять, удалять и изменять пользователей (при аутентификации). Для хранения данных используется база данных PostgreSQL, а для работы с ней - ORM Prisma. Также в приложении реализована аутентификация по протоколу OAuth через Google провайдер. Приложение задеплоено на `vercel.app`, поэтому переменные среды скрыты.

## Функционал

- Добавление, удаление и изменение пользователей
- Аутентификация через Google провайдер
- Подсветка пользователей с наивысшим рейтингом
- Пользователи отсортированы в порядке убывания рейтинга

## Стек

- Язык программирования: JS/TS (React)
- Фреймворк: Next.js
- UI компоненты: Radix UI
- Валидация формы: React Hook Form
- База данных: PostgreSQL
- ORM: Prisma
- Пре-коммит хук для линтинга и prettier'а

## Установка и запуск

Если необходимо запустить билд для отладки:

1. Установите зависимости, запустив команду `yarn install`
2. Сгенерируйте файлы Prisma, выполнив команду `npx prisma generate`
3. Запустите приложение с помощью команды `yarn dev`
4. Раздобыть переменные среды для доступка к базе данных и возможности аутентификации и вставить их
   в `.env` файл в корневом каталоге
