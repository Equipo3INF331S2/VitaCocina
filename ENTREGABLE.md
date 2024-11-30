# [Videos Autoexplicativo Vitacocina](https://drive.google.com/drive/folders/1XV3xiSDH67YBN2e1ysNwW8_2QbKo5ogg?usp=sharing)
---
# Entrega 1
### 1. Alcance de la Herramienta

- Manejo de sesión: la herramienta con funcionalidades de manejo de sesión, incluyendo inicio de sesión y registro.
- Gestión de publicaciones: un usuario conectado puede revisar sus recetas/consejos publicados, pudiendo editarlos o eliminarlos.
- Publicación de receta/consejo: un usuario conectado puede publicar recetas o consejos, rellenando los campos necesarios e incluyendo una imagen.
- Recetas favoritas: un usuario conectado puede agregar o quitar recetas de su lista de favoritos, las cuales puede revisar en la página de favoritos.
- Página para listar recetas: página para revisar todas las recetas publicadas en la aplicación.
- Página para listar consejos: página para revisar todos los consejos publicados en la aplicación.
- Página de receta: página para ver en detalle una receta, contando con título, autor, descripción, imagen, ingredientes, instrucciones y reseñas.
- Página de consejo: página para ver en detalle un consejo, contando con título, autor, descripción e imagen.
- Reseñas de recetas: en la página de receta, se pueden ver todas las reseñas de la receta, que incluyen autor, puntuación y un comentario. Un usuario conectado puede publicar una reseña en la página de una receta.
- Página principal: en esta página se listan recetas y consejos, además de contar con una funcionalidad para búsqueda.
- Página de admin: incluye una tabla para revisar recetas, consejos y usuarios, pudiendo eliminarlos. IMPORTANTE: para ver esta 
página se necesita conectarse con un email con dominio vitacocina.com, e.g., alan.turing@vitacocina.com

### 2. Descripción del Trabajo Realizado

En este proyecto se trabajo con Jira para la asignación de tareas, GitFlow para un manejo más coordinado del código, se realizaron integraciónes en Slack para tener un seguimiento de forma más rapido de los avances, los prototipos se crearon en Figma (integrando MUI) para tener una visión más clara del trabajo a realizar, además se usaron Discord y Whatsapp como fuentes de comunicación en el grupo, ya que se tenian más conocimientos de estos al momento de trabajar.

En la aplicación las herramientas utilizadas para frontend fueron:

- React
- React-Router-DOM
- MUI

Para backend:

- MongoDB
- NodeJS
- express

Para las pruebas:

- Jest

### 3. Pruebas

Se realizaron pruebas automaticas para los endpoints de las recetas, tips y usuarios.

Usando la herramienta Jest se crearon las pruebas entregando los endpoint junto a los datos necesarios para el desarrollo correcto de las pruebas.

Para las recetas los test fueron los siguientes:

- GET /recipes debe devolver todas las recetas
- POST /recipes debe agregar una receta
- POST /recipes al agregar una receta sin campo name debe arrojar error
- DELETE /recipe/:recipeId debe eliminar una receta
- GET /recipes/user/:userId debe listar recetas de un usuario específico
- PUT /recipe/:recipeId debe actualizar una receta

Para los tips los test fueron los siguientes:

- GET /tips debe devolver todas los consejos
- POST /tips debe agregar un tip
- DELETE /tip/:tipId debe eliminar un tip
- GET /tips/user/:userId debe listar tips de un usuario específico
- PUT /tip/:tipId debe actualizar un consejo

Para los users los test fueron: 

- GET /allUsers debe devolver todos los usuarios
- POST /users debe agregar un usuario
- DELETE /users/:Id debe eliminar un usuario

Las pruebas realizadas cumplieron satisfactoriamente con lo deseado.
### 4. Problemas encontrados y soluciones
 
Como grupo una de las principales dificultades en el desarrollo del proyecto fue el uso de herramientas como slack y jira. Al no tener experiencia en estas, la comunicación en etapas temprana del proyecto fue menor. Además, algunas tarea no fueron creadas en la backlog de jira por la poca experiencia en esta misma. La solución a este problema fue la capacitación grupal a través de conferencias.

Otro obstáculo dentro del desarrollo fue la implementación de la herramienta jest, la cual para integrarlo con nuestro trabajo tuvimos que instalar y corregir muchas instancias. la solución fue leer la documentación de jest y buscar tutoriales.

---
# Entrega 2

El video de la entrega 2 se encuentra en la misma seccion de "Videos Autoexplicativo Vitacocina"


### 1. Explicación Jenkinsfile

Nota: Se utilizo un webhook para utilizar un push al repositorio como build trigger al Jenkins 

#### 1.0 Definiciones

- COLOR_MAP: Este mapa define colores para las notificaciones de Slack

##### 1.1 Environment (Variables de entorno):
- FRONTEND_DIR: Ruta del directorio del frontend (vitacocina).
- BACKEND_DIR: Ruta del directorio del backend (. para la raíz del proyecto).
- GITHUB_REPO: URL del repositorio de GitHub.
- BUILD_TRIGGER: Variable vacía para definir el desencadenante del build.
- CAUSE: Almacena la causa que desencadenó el build (como el mensaje del push).

#### 1.2 Stages (Etapas):
- Etapa 1 (Checkout): Esta etapa clona el repositorio desde la rama main.
- Etapa 2 (Install Dependencies): Aquí se instalan las dependencias de frontend y backend en paralelo.
- Etapa 3 (Testing): Esta etapa ejecuta pruebas para el frontend en modo no interactivo (--watchAll=false).
- Etapa 4 (Build Frontend): Esta etapa construye y despliega el frontend:
   - lsof -ti:3000 | xargs kill -9 || true: Mata cualquier proceso en el puerto 3000 (donde corre el frontend).
   - CI=false npm run build: Compila el frontend.
   - JENKINS_NODE_COOKIE=dontKillMe nohup npx serve -s build -l 3000 > frontend.log 2>&1 &: Ejecuta el frontend en segundo plano en el puerto 3000, redirigiendo la salida al archivo frontend.log.
- Etapa 5 (Build Backend): Esta etapa despliega el backend:
    - lsof -ti:5000 | xargs kill -9 || true: Mata cualquier proceso en el puerto 5000 (donde corre el backend).
   - JENKINS_NODE_COOKIE=dontKillMe nohup npm start > backend.log 2>&1 &: Ejecuta el backend en segundo plano en el puerto 5000, redirigiendo la salida al archivo backend.log.

#### 1.3 Post (Notificación)
Esta sección envía una notificación de Slack al canal bots con el resultado del build. El color y mensaje se ajustan según el estado (SUCCESS o FAILURE), y el mensaje incluye el nombre del job, número de build y la causa que disparó el build.

### 2. Nuevos Requerimientos
   
- Requerimiento 1 (Descargar recetas en archivos PDF): Los usuarios de VitaCocina al revisar una receta esperan poder descargarla para tenerla descargada, para esto, se implementa un botón de descarga en formato pdf en cada descripción de las recetas disponibles.

- Requerimiento 2 (Compartir recetas por redes sociales): Los usuarios de VitaCocina esperan poder compartir las recetas por redes sociales, para esto, se implementan botones que representen a cada red social (Facebook, Twitter/X y Whatsapp), los cuales permitan compartir la receta.

- ---
# Entrega 3

En esta entrega se realizaron pruebas en Selenium y se implementaron estas en el Pipeline de Jenkins, para esto se crearon pruebas las cuales probaban las siguientes funcionalidades del software:
 1. Ingreso como usuario a la pagina
 2. Creación de recetas
 3. Borrar una receta de la página
 4. Acceder a la página de todas las recetas
 5. Acceder a la página de todos los consejos
 6. Acceder a una receta en específico
 7. Acceder a un consejo en específico
 8. Usar la barra de busqueda
 9. Descargar una receta en archivo PDF
 10. Compartir recetas mediante redes sociales

PD: El video del entregable se encuentra en el link al inicio del documento
