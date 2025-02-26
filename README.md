# 🎨 Frontend Project

## 🌟 Introducción

Bienvenido al **Frontend Project**. Aquí encontrarás el código fuente y las instrucciones necesarias para ejecutarlo. 🚀

---

## 🛠️ Pasos para ejecutar localmente

### 📦 Instalación

Para instalar las dependencias del proyecto, ejecuta:

```sh
npm install
```

### 🚀 Ejecutar el servidor de desarrollo

Para iniciar el servidor de desarrollo, usa el siguiente comando:

```sh
npm run dev
```

### 🔍 Requisitos

Asegúrate de tener instalada la versión correcta de Node.js:

- ✅ **Node.js**: 20.x

Puedes verificar tu versión de Node.js ejecutando:

```sh
node -v
```

---

## 💡 Justificación de elecciones técnicas

Este proyecto utiliza las siguientes tecnologías:

- ⚛️ **React**: Para la construcción del frontend modular y reutilizable.
- 🎨 **JavaScript (JSX)**: Para la implementación de los componentes.
- ⚡ **Vite**: Como herramienta de construcción rápida y eficiente.
- 🎨 **Tailwind CSS**: Para el diseño y estilos de la aplicación.

---

## 📂 Descripción de la estructura del proyecto

La estructura del proyecto es la siguiente:

```plaintext
/ProductsFrontend
│-- 📂 public/                  # Archivos públicos
│-- 📂 src/                     # Código fuente principal
│   │-- 📂 assets/              # Recursos estáticos
│   │   │-- 🖼️ products.svg
│   │   │-- ⚛️ react.svg
│   │-- 📂 components/          # Componentes reutilizables
│   │   │-- 📝 ModalForm.jsx
│   │   │-- 🏠 Navbar.jsx
│   │   │-- 📋 TableList.jsx
│   │-- 📂 config/              # Configuraciones globales
│   │   │-- ⚙️ constants.js
│   │-- 📂 utils/               # Utilidades y funciones auxiliares
│   │   │-- 🔔 notifications.js
│   │-- 📌 App.jsx              # Componente principal
│   │-- 🎨 App.css              # Estilos de la aplicación
│   │-- 🎨 index.css            # Estilos globales
│   │-- 🚀 main.jsx             # Punto de entrada de la aplicación
│-- 🚫 .gitignore               # Archivos a ignorar en Git
│-- 🛠️ eslint.config.js         # Configuración de ESLint
│-- 🏠 index.html               # Archivo HTML principal
│-- 📜 package.json             # Dependencias y scripts
│-- 📜 package-lock.json        # Archivo de bloqueo de dependencias
│-- 🎨 postcss.config.js        # Configuración de PostCSS
│-- 📖 README.md                # Documentación del proyecto
│-- 🎨 tailwind.config.js       # Configuración de Tailwind CSS
│-- ⚡ vite.config.js           # Configuración de Vite
```