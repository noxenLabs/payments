# Microservice - NestJs

[![Gitlab Badge](https://img.shields.io/badge/Template-orange?logo=gitlab&logoColor=fff)](https://gitlab.com/templates7433912/microservices/nestjs)
[![pnpm](https://img.shields.io/badge/dynamic/json?url=https://registry.npmjs.org/pnpm/latest&label=pnpm&query=%24.version&color=F69220&logo=pnpm&logoColor=white)](https://pnpm.io)
[![Docker Badge](https://img.shields.io/badge/Docker-blue?logo=docker&logoColor=fff)](https://docs.docker.com)
[![NestJs Badge](https://img.shields.io/badge/-NestJs-ea2845?-square&logo=nestjs&logoColor=white)](https://docs.nestjs.com/)
[![Typescript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF)](https://www.typescriptlang.org/docs/)
[![Scalar Badge](https://img.shields.io/badge/-Scalar-black?logo=Scalar)](https://guides.scalar.com/scalar/introduction)

## Endpoints 📤

| # | Endpoint     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `General`      | [http://localhost:8091](http://localhost:8091) | **Host** |
| `Visual Documentation`      | [http://localhost:8091/scalar](http://localhost:8091/scalar) | **Scalar** |
| `API Documentation`      | [http://localhost:8091/scalar.json](http://localhost:8091/scalar.json) | **API Json**|
| `HealthCheck`      | [http://localhost:8091/health](http://localhost:8091/health) | **Health**|
| `Http`         | [http://localhost:8091/v1/jsonplaceholdercontroller/1]() | **Get** |

## Composición de la solución 🧱
```
├── documentation/             #Documentación de estructuras o proyecto
├── postman/                   #Contiene collection postman de los servicios expuestos
├── src/                       #Contenedora de la solución
│   ├ business-capabilities/   #Capacidades del microservicio 
│   │   └── jsonplaceholder/   #Primera capacidad del microservicio
│   │       ├── application/
│   │       │   ├── ports/
│   │       │   └── services/
│   │       ├── domain/
│   │       │   ├── dtos/
│   │       │   ├── mapper/
│   │       │   └── models/
│   │       └── infrastructure/
│   │           ├── adapters/
│   │           └── controller/
│   └ shared/   #Carpeta de recursos transversales a la solución
│     ├── decorators/
│     ├── environment/
│     ├── interceptors/
│     ├── middlewares/
│     ├── modules/
│     └── utils/
└── test/   #Carpeta para Test Unitarios de la solución
```

## Consideraciónes ambiente local ✅

* Puerto asignado por defecto es `8091`
* Validar versión del SDK instalado `node --version` (Versión actual LTS 22.14+)
* Renombrar archivo `dev.env` a `.env` para las variables de entornos necesarias para su ejecución
* Para la Ejecución del proyecto se deben instalar las dependencias con `pnpm i`
* Para ejecutar el proyecto se debe utilizar el comando `pnpm run start`


## Clasificación de EventsCode 🚧

| Código         | Tipo         | Descripción                             |
|----------------|--------------|-----------------------------------------|
| 10000 - 10005  | `Información` ℹ️  | En Clases de Procesamiento           |
| 999            | `Error` ⛔     | Al Configurar Variables de Entorno      |
| 20000 - 20002  | `Error` ⛔     | En Clases de Procesamiento              |
| 200 - 504      | `HttpCodes` ⚠️   | Códigos de estado                       |
---

### Tipo Información ℹ️
* 10000 = `Environment Initialization` { se refiere a la inicialización de Variables de Entorno para el desarrollo }  
* 10004 = `JsonService` { se refiere a Información de la clase de procesamiento del llamado al API }
* 10005 = `JsonPlaceHolder` { se refiere a Información de la clase de procesamiento del Servicio }  
---

### Tipo Error ⛔
* 999 = `Critical` { Error en las EnvironmentVariables }
* 20000 = `JsonApiService` { Error en clase de procesamiento de llamado al API }
* 20001 = `JsonService` { Error en clase de procesamiento del servicio  }
* 20002 = `JsonPlaceHolder` { Error en clase de procesamiento del servicio Final }

---

### Tipo HttpCodes ⚠️
* 200 = `Success` { Se refiere al resultado OK de una petición }
* 204 = `No Content` { Se refiere al resultado de una petición pero que no retorna información }
* 400 = `Bad Request` { Petición mal informada según lo esperado }
* 401 = `Unauthorized` { Acceso no autorizado }
* 404 = `NotFound` { No se encontró el recurso especificado }
* 422 = `Unprocessable Entity` { Errores de procesamiento }
* 500 = `InternalServerError` { Error de servidor }
* 503 = `ServiceUnavailable` { Error de disponibilidad de llamada interna }
* 504 = `Gateway Timeout` { Error de tiempo de espera superado para llamada interna }