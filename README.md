# VitaCocina

VitaCocina es una aplicación web para compartir recetas y consejos culinarios. Este proyecto está dividido en dos partes: el frontend y el backend.

## Requisitos

- Node.js
- npm (Node Package Manager)
- MongoDB (para la base de datos)

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/VitaCocina.git
cd VitaCocina 
npm install
```
### Instalación de dependencias frontend
```bash
cd vitacocina
npm install
``` 

### Iniciar Backend(en la raíz del proyecto)
```bash
node server.js
``` 

### Iniciar frontend(en la raíz del proyecto)
```bash
cd vitacocina
npm start
``` 

## Test
Recetas
```bash
cd vitacocina
npm test -- RecipeCrudTest.test.js
```

Tips
```bash
cd vitacocina
npm test -- TipsCrudTest.test.js
```

Users
```bash
cd vitacocina
npm test -- UserCrudTest.test.js
```