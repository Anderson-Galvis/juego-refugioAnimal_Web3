# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## 🎮 Interfaz del Refugio - Escena 2D con React-Pixi

Esta aplicación usa [react-pixi](https://github.com/inlet/react-pixi), un wrapper de PixiJS para React, para renderizar la escena 2D del refugio de mascotas.

### 🚀 Instalación de dependencias necesarias




# Proyecto Frontend - juego-refugioAnimal_Web3

Este proyecto utiliza React 17, Pixi.js 6, React Router DOM 6, y Vite como bundler. Además incluye configuraciones para ESLint, TailwindCSS y TypeScript (tipos React).

---

## Requisitos previos

- Node.js >= 16.x (recomendado)
- npm >= 8.x

---

## Instalación inicial

Al clonar el repositorio por primera vez, sigue estos pasos para instalar correctamente las dependencias:

```bash
# Elimina cualquier instalación previa por seguridad
rm -rf node_modules package-lock.json

# Instala las dependencias principales con versiones específicas para evitar conflictos
npm install react@17 react-dom@17
npm install pixi.js@6.5.10 @inlet/react-pixi@6.8.0
npm install react-router-dom@6.23.1

# Instala las dependencias de desarrollo
npm install --save-dev vite @vitejs/plugin-react eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh @types/react@17 @types/react-dom@17 autoprefixer postcss tailwindcss globals
