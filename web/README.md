## web

### About Project

This project represents Front-End part for _diploma_ project and implements SPA.

### Built With

* [React 16.13](https://reactjs.org/);
* [Redux](https://redux.js.org/);
* [Redux Saga](https://redux-saga.js.org/);
* [React Formik](https://formik.org/overview);
* [Material UI 4](https://v4.mui.com/getting-started/installation/);
* [Jest](https://jestjs.io/);

### Prerequisites

Before launching this application make sure the following components are prepared:

* Windows | macOS | Linux;
* [NodeJS 14](https://nodejs.org/gl/blog/release/v14.0.0/)
* [Visual Studio](https://visualstudio.microsoft.com/) | [Visual Studio Code](https://code.visualstudio.com/) | [Webstorm](https://www.jetbrains.com/webstorm/);
* [Yarn](https://yarnpkg.com/) - optional (included in _package.json_);
* [Docker](https://www.docker.com/) - optional;

### Installation and launch

1. Clone repository
```
git clone https://github.com/dotnet-fizzyy/Diploma.git
```
2. Open directory _web_;
3. Run the command to install dependencies
```
npm install
```
4. If Yarn package manager is installed on your OS, just run the following command:
```
yarn start
```
otherwise
```
npm run start
```

Application will build its modules and your browser should be opened.;
5. Visit the following URL: https://localhost:3000. Should see start page of application for a while;

### Testing

Application supports the following types of tests:

* Unit;

To be able to run Unit tests, run the following command with yarn:
```
yarn test
```

or using npm
```
npm run test
```

Unit tests cover the following parts: 
* Redux - reducers and saga;
* Utils;

### Docker

Docker is not necessary to launch application in case of prepared prerequisites for your physical OS. If there is a need to launch it without and modifications and would like to see the working result, refer to the next steps:

1. Follow the first step from previous article;
2. Open project root directory via terminal (_diploma_ directory);
3. Run the following command:
```
docker-compose up --build
```
4. Wait until corresponding images will be downloaded, all steps from Dockerfile will pass and application will start;
5. Visit the following URL: http://localhost:7000/swagger. Should be able to see Swagger description;
6. If there is a need to stop Docker containers, ust press `ctrl + C` keyboard combination in your terminal and wait until containers will be stopped. To terminate containers, enter (or stop via Docker dashboard):
```
docker-compose down
```
7. To remove application images, enter the following command (or remove via Docker UI dashboard):
```
docker rmi node:14-alpine ui
```

### Contact

dotnet-fizzyy | [GitHub](https://github.com/dotnet-fizzyy) | ezzyfizzy27@gmail.com