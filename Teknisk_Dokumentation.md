# Mjukvaruarkitektur/Teknisk Dokumentation

[TOC]

## Kodstruktur

MVC Backend
Linter: ESLint
Kodstandard: eslintrc.js fil avgör detta i projektet

## Val av tekniker

IDE: Visual Studio Code
Testramverk: Postman
Ramverk, Backend: API - Express/Typescript
Frontend: Vue, Vuex, create vue
Databas: MongoDB
ODM: Mongoose
Environment: Docker

## Versionshantering

När en ny feature ska implementeras så skapas en ny branch på GitLab och alla ändringar görs i denna branch. När en feature anses vara klar så görs en merge request till master branchen 

Varje ny feature skapas i en branch på GitLab. Inför varje migrering med vår masterkod granskar en kollega all kod.

[Versionshanteringsguide](https://hackmd.io/@1dv611-milou/HJARaP3Su)

## Installationsguide

### Förkrav

- [Skapa en API nyckel till Google Page Speed Insight](https://developers.google.com/speed/docs/insights/v5/get-started)
- En bash terminal
- Ett hotmail konto för att skicka email notifikationer
- [Docker](https://docs.docker.com/desktop/) samt [Docker compose](https://docs.docker.com/compose/install/) installerat
- [Node installerat](https://nodejs.org/en/)


### Hämta projektet från GitLab repositoriet

```bash=
$ git clone git@gitlab.lnu.se:vo222dq/milou-project.git
$ cd milou-project
```

### Installera API

#### Skapa RS256 key pairs

Navigera till API:ets rotkatalog

```bash=
$ cd ./api
```

Kör kommandot nedanför för att generera en privat nyckel

```bash=
$ openssl genrsa -out private.pem 2048
```

Efter den privata nyckeln är genererad, kör kommandot nedanför för att skapa en publik nyckel utifrån den privata nyckeln.

```bash=
$ openssl rsa -in private.pem -pubout -out public.pem
```

Nu borde det finnas en private.pem och public.pem fil i rotkatalogen för API:et

#### Uppdatera environment-variabler

Öpnna filen example.env i API:ets rotkatalog.


*Filens struktur*
```json=
PORT=5000
DB_CONNECTION_STRING="mongodb://localhost:27018"
GPSI_URL="https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed"
GPSI_TOKEN="Google PageSpeed Insights API Token"
EMAIL_USER="Hotmail to use for sending notifications"
EMAIL_PASSWORD="Hotmail password"
BASE_URL="http://localhost:5000/""
SCORE_DIFF=0.08
```


Uppdatera filen med eran information och spara och döp om filen till ```.env```

#### Installera dependencies

Se till att vara i rotkatalogen för API:et och kör

```bash=
$ npm install
```

### Installera klient

Navigera till ```client``` katalogen och kör kommandot

#### Installera dependencies

Kör kommandot nedanför


```bash=
$ npm install
```

#### Uppdatera environment-variabler

Öpnna filen example.env i klientens rotkatalog.


*Filens struktur*
```json=
VUE_APP_BASE_URL="http://your-backend-base-url/api"
```


Uppdatera filen med eran information och spara och döp om filen till ```.env```



*Utveckling*
Om appen ska köras i utvecklingmiljö behövs även det läggas till en ```DB_CONNECTION_STRING``` variabel som behöver kopplas till en mongoDB databas

## Köra appen

### Köra API och klient med Docker Compose

Apparna kan köras samtidigt med hjälp utav docker compose. 
När man kör apparna med docker compose så kommer en instans utav API:et och en instans utav klienten att köras igång, samt en mongoDB instans.

#### Förkrav API

För att kunna starta apparna med docker, se till att porten satt till ```EXPOSE``` i filen ```Dockerfile``` i API:ets rotkatalog stämmer överäns med ```PORT``` satt i API:ets ```.env``` fil, samt att ```ports``` för ```api-service``` i filen ```docker-compose.yml``` i projektets rotkatalog är satt till samma port.

Se även till att port 27017 inte är upptagen, då denna kommer att användas utav mongoDB instansen.

#### Förkrav Klient

- Se till att port 8080 inte är upptagen

#### Köra apparna

Innan det går att starta appen med docker compose så behöver vi bygga appen.
Navigera till rotkatalogen av projektet och kör:

*Detta brukar ta runt 1-2 minuter första gången det körs*

```bash=
$ docker-compose build
```

När ```docker-compose build``` har kört klart, så går det att köra kommandot nedanför för att låta instanserna köras i bakgrunden.

```bash=
$ docker-compose up -d
```
 
eller 

```bash=
$ docker-compose up
```

För att se ouput från instanserna.

### Köra apparna separat vid utveckling

#### Köra apiet

För att köra API:et krävs det att en mongoDB instans är igång och att tillhörande ```connection string``` finns i ```.env``` filen för API:et.

Navigera till rotkatalogen för API:et och kör kommandot nedanför

```bash=
$ npm install
```

Efter att installationen är klar, kör kommandot

```bash=
$ npm run start:dev
```

Om API:et startar utan några errors, så borde det gå att komma åt API:ets dokumentation på [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

*Detta borde dyka upp på http://localhost:5000/api/docs*
![](https://i.imgur.com/A81zqR6.png)

#### Köra klienten

Navigera till rotkatalogen för klienten och kör kommandot nedanför

```bash=
$ npm install
```

Efter att installationen är klar, kör kommandot

```bash=
$ npm run serve
```

Om klienten startar utan några errors, så borde det gå att komma åt klientens startsida på [http://localhost:8080](http://localhost:8080)

*Detta borde dyka upp på http://localhost:8080*
![](https://i.imgur.com/8DQOBpi.png)



## Övergripande Arkitektur

![Övergripande_Arkitektur](https://i.imgur.com/40i8QhD.png)

## Klient(Vue) Arkitektur

Genom att använda ``create vue <app-name>`` skapade vi vår klient med följande inställningar: 

- Vue 3
- Babel
- typescript
- Vuex
- Eslint

Efter detta arbetade vi enligt vad vi anser vara standard för en Vue applikation. Vi skapade alla nya componenter i mappen components som har genererats.

## API Arkitektur

![API_endpoint_example](https://i.imgur.com/L5ZK3fa.png)
*Represents a user accessing an API endpoint*

### Flöde

#### server.ts

1. Användare anropar APIet
    * Exempel: http://hostname/example

```javascript=
import express from 'express';
import IndexRouter from './routes/indexRouter';

export default class Server {
    private app: express.Application = express()
    private indexRouter: IndexRouter = new IndexRouter()

    public run(): void {
        // 1. Användare anropar APIet
        this.app.use('/', this.indexRouter.router);
    }
}
``` 

#### indexRouter.ts

2. API/App dirigerar trafiken till rätt route

```javascript=
import express from 'express';
import ExampleRouter from './exampleRouter';

export default class IndexRouter {
    public router: express.Router = express.Router()
    private exampleRouter: ExampleRouter = new ExampleRouter()
    
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        // 2. API/App dirigerar trafiken till rätt route
        this.router.use('/example', this.exampleRouter.expressRouter);
    }
}
```

#### exampleRouter.ts

3. Använd middleware
    1. Kolla om användare är authentiserad
    2. Kolla innehåll av req.body
4. Middleware påträffade inga fel
5. Controller metod anropas

```javascript=
import { IRouter } from '../interfaces/IRouter';
import express from 'express';
import ExampleController from '../controllers/exampleController';
import ExampleMiddleware from '../middleware/exampleMiddleware';
import AuthMiddleware from '../middleware/authMiddleware';

export default class ExampleRouter implements IRouter {
    private controller: ExampleController = new ExampleController()
    private middleware: ExampleMiddleware = new ExampleMiddleware()
    private authMiddleware: AuthMiddleware = new AuthMiddleware()
    expressRouter: express.Router = express.Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
            // 3. Använd middleware
             this.expressRouter.post('/',
            // 3.1. Kolla om användare är authentiserad
            (req, res, next) => this.authMiddleware.isAuthenticated(req, next),
            // 3.2. Kolla innehåll av req.body
            (req, res, next) => this.middleware.validate(req, next),
            // 4. Middleware påträffade inga fel
            // 5. Controller metod anropas
            (req, res, next) => this.controller.exampleMethod(req, res, next)
        );
    }
}
```

#### exampleController.ts

* 6. Service anropas
* 10. Respons till användare 

```javascript=
import { NextFunction, Request, Response } from 'express';
import ExampleService from '../services/exampleService';

export default class ExampleController {
    private service: ExampleService = new ExampleService();
    
    public async exampleMethod(req: Request, res: Response, next: NextFunction): Promise<void> {
    
        // 6. Service anropas
        const serviceData = await this.service.doExample(req);
        
        // 10. Respons till användare
        res.status(200).send(serviceData);
    }
}
```

#### exampleService.ts

7a. Service anropar databas
8a. Svar från databas
7b. Service anropar externt API
8b. Svar från externt API
9. Service returnerar resultatet av dess funktionalitet

```javascript=
import fetch from 'node-fetch';
import { Request } from 'express';
import Example from '../models/example';

export default class ExampleService {
    public async doExample(req: Request): Promise<typeof serviceData> {
    
        // 7a. Service anropar databas
        // 8a. Svar från databas
        const { example } = req.body;
        const serviceData = await Example.mongooseModelMethod({example});
    
        // 7b. Service anropar externt API
        // 8b. Svar från externt API
        const response = await fetch('https://external-api/examples')
        const serviceData = await response.json();
        
        // 9. Service returnerar resultatet
        return serviceData
    }
}
```

