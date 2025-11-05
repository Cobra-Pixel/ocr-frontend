# OCR Extractor Frontend (React + Vite + Ionic + Axios)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://ocr-frontend-ruddy.vercel.app)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Built with Ionic](https://img.shields.io/badge/UI-Ionic-blue?logo=ionic)](https://ionicframework.com)
[![Licence MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Backend FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)](https://ocr-backend-deploy.onrender.com)

## Descripcion
El **Ocr Extractor Frontend** es la interfaz web moderna para el sistema de reconocimiento de texto desde imagenes **impresas o manuscritas**.
Utiliza **React + Vite** con componentes **Ionic**, comunicandose con un backend desarrollado en **FastAPI (Render)** y base de datos en **Railway (MySQL)**.

Permite extraer texto de documentos, fotografias o apuntes con alta precision gracias a **EasyOCR**, **PyTesseract** y la **API Cloud OCR.Space**.

## Enlaces de despliegue
| Servicio | URL |
|----------|-----|
| **Frontend (Vercel)** | [https://ocr-frontend-ruddy.vercel.app](https://ocr-frontend-ruddy.vercel.app) |
| **Backend (Render)** | [https://ocr-backend-deploy.onrender.com ](https://ocr-backend-deploy.onrender.com) |


## Tecnologias principales
- **React 18 (Vite)**
- **Ionic React** (Interfaz adaptable)
- **Context API**
- **Axios** (HTTPS)
- **CSS + Animaciones**
- **Vercel** (hosting)
- **Render + Railway** (backend + base de datos)

## Variables de entorno (.env)

Crear un archivo '.env' en la raiz del proyecto con el siguiente contenido:
'''bash
# URLs del backend en Render
VITE_API_BASE=https://ocr-backend-deploy.onrender.com
VITE_API_URL=https://ocr-backend-deploy.onrender.com

# Instalacion local
# Clonar el repositorio
git clone https://github.com/Cobra-Pixel/ocr-frontend.git
cd ocr-frontend
# Instalar dependencias
npm install
# Crear archivo .env (ver en el ejemplo de arriba)
# Ejecutar entorno local
npm run dev
# Abrir en navegador
http://localhost:5173
# Despliegue (Vercel)
1. Crear una cuenta en https://vercel.com
2. Importa este repositorio desde GitHub.
3. En Settings-Evironment Variables, agrega:
   VITE_API_BASE=https://ocr-backend-deploy.onrender.com
   VITE_API_URL=https://ocr-backend-deploy.onrender.com
4. Dar click en Deploy
   Vercel generara dominio publico:
   https://ocr-frontend-ruddy.vercel.app
# Caracteristicas principales
Craga y previsualizacion de imagenes
OCR local (EasyOCR + PyTesseract)
OCR Cloud (OCR.Space API para manuscritos)
Limpieza automatica de texto extraido
Guardado en base de datos (MySQL / Railway)
Interfaz responsive (movil / escritorio)
Diseño moderno y ligero
# Licencia
Proyecto de uso educativo bajo licencia MIT.
Desarrolado por Cobra-Pixel
© 2025 -OCR Extractor Frontend
# Soporte y contribucion
Si este proyecto te resulto util, deja una estrellita en el repositorio.
Reporta errores o sugiere mejoras abriendo un Issye o un Pull Request en:
https://github.com/Cobra-Pixel/ocr-frontend
