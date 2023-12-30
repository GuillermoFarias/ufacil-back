<img src="https://github.com/GuillermoFarias/ufacil-front/assets/11460907/5cfdd8fb-dfb8-4edb-a196-1f1e9c323686" width="40"  />
<img src="https://github.com/GuillermoFarias/ufacil-front/assets/11460907/c67e615c-2d3a-418e-bfb5-5463aafde603" width="100" height="40" />

### Convertidor UF a CLP web

> Ufacil is a demo app using AdonisJS Typescript and VueJS

## 🎰 Backend - API

Este es el repositorio del backend de la aplicación, el cual se encuentra desarrollado en AdonisJS con Typescript. Es parte de un proyecto de prueba t´ecnica para una empresa X.

## 🎨 Frontend - Web

Aquí https://github.com/GuillermoFarias/ufacil-front
se encuentra el repositorio del frontend de la aplicación desarrollado en VueJS.

## Instalación

1. Las instrucciones están hechas para Mac OS, pero deberían funcionar en cualquier sistema operativo basado en Unix/Linux/Ubuntu.

2. Se asume que ya se tiene instalado Git.

3. Se asume que ya se tiene instalado Docker y Docker Compose.

### Clonar el repositorio

```bash
git clone git@github.com:GuillermoFarias/ufacil-back.git
cd ufacil-back
```

## Configurar variables de entorno

```bash
cp .env.example .env
```

> La aplicación servirá en el puerto definido en el archivo `.env` en la variable `PORT`.

### Levantar app y base de datos

```bash
docker-compose up -d
```

### Instalar dependencias

```bash
docker compose exec app yarn install
```

### Ejecutar migraciones

```bash
docker compose exec app node ace migration:fresh --seed
```

## Verificar que la aplicación esté corriendo

```bash
open http://localhost:3333
```
