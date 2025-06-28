# 🛹 Vue Kanban Board

[![Vue](https://img.shields.io/badge/Vue-555555?logo=vue.js)](https://vuejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-555555?logo=vue.js)](https://pinia.vuejs.org/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-555555?logo=vue.js)](https://router.vuejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-555555?logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-555555?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-555555?logo=vite)](https://vitejs.dev/)

### https://hutt4.github.io/vue-kanban

Интерактивный канбан-борд с поддержкой темной/светлой темы и бэкендом на Supabase. Полноценное SPA-приложение с авторизацией, drag-and-drop и плавными анимациями.

| Светлая тема                                              | Темная тема                                             |
| --------------------------------------------------------- | ------------------------------------------------------- |
| ![Главный экран светлая тема](screenshots/main-light.png) | ![Главный экран темная тема](screenshots/main-dark.png) |

## 🌟 Ключевые возможности

### Основной функционал

- 🖱️ Drag-and-drop карточек между колонками
- ✏️ Редактирование задач
- 💬 Система комментариев к задачам
- 🚦 Маршрутизация между разделами (Vue Router)

### Персонализация

- 🌓 Светлая/темная тема
- ✨ Плавные анимации интерфейса
- 📅 Форматирование дат (Day.js)

### Безопасность

- 🔐 Авторизация через Supabase
- 🔒 Настроенные политики RLS
- 🛡️ Защищенные роуты

## 🛠 Технологический стек

### Frontend

- [Vue 3](https://vuejs.org/) - Фреймворк
- [Pinia](https://pinia.vuejs.org/) - Управление состоянием
- [Vue Router](https://router.vuejs.org/) - Навигация
- [TypeScript](https://www.typescriptlang.org/) - Типизация

### Backend/Utilities

- [Supabase](https://supabase.com/) - Бэкенд (Auth, Database)
- [Day.js](https://day.js.org/) - Форматирование дат
- [UUID](https://www.npmjs.com/package/uuid) - Уникальные идентификаторы
- [Vite](https://vitejs.dev/) - Сборка проекта

## 🚀 Быстрый старт

```bash
git clone https://github.com/huTT4/vue-kanban.git

cd vue-kanban

npm install

npm run dev
```
