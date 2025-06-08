# 🛹 Vue Kanban Board

[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite)](https://vitejs.dev/)

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
- 📅 Умное форматирование дат (Day.js)

### Безопасность

- 🔐 Авторизация через Supabase
- 🔒 Настроенные политики RLS
- 🛡️ Защищенные роуты

## 🛠 Технологический стек

### Frontend

- **Vue 3**
- **Pinia**
- **Vue Router**
- **TypeScript**

### Backend

- **Supabase**

### Утилиты

- **Day.js** - Форматирование дат
- **UUID** - Уникальные идентификаторы
- **Vite** - Сборка проекта

## 🚀 Быстрый старт

```bash
git clone https://github.com/huTT4/vue-kanban.git

cd vue-kanban

npm install

npm run dev
```
