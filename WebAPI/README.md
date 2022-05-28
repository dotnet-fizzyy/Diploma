## WebAPI

### About Project

This project represents Back-End part for _diploma_ project and implements RESTful web-service.

### Built With

* [C# 8.0](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-8/);
* [ASP.Net 3.1 WebAPI](https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-core-3-1/);
* [Entity Framework](https://entityframeworkcore.com/);
* [Fluent Validation](https://docs.fluentvalidation.net/en/latest/);
* [Serilog](https://serilog.net/);
* [XUnit](https://xunit.net/);

### Prerequisites

Before launching this application make sure the following components are prepared:

* Windows | macOS | Linux;
* [Dotnet CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/);
* [.Net Core 3.1](https://dotnet.microsoft.com/en-us/download/dotnet/3.1/);
* [PostgreSQL](https://www.postgresql.org/);
* [Redis](https://redis.io/) - optional;
* [Visual Studio](https://visualstudio.microsoft.com/) | [Visual Studio Code](https://code.visualstudio.com/) | [Rider](https://www.jetbrains.com/rider/);
* [pgAdmin 4](https://www.pgadmin.org/) | [DBeaver](https://dbeaver.io/) | [DataGrip](https://www.jetbrains.com/datagrip/);
* [Docker](https://www.docker.com/) - optional;

### Installation and launch

1. Clone repository
```
git clone https://github.com/dotnet-fizzyy/Diploma.git
```
2. Run **WebAPI.sln** in the current directory;
3. Depending on your OS, choose IIS or Kestrel as hosting webservices;
4. Make sure your PostgreSQL database instance is running. Redis is optional and is used only for performance increasing. Otherwise will not be able to launch app;
5. Start the application;
6. Visit the following URLs: 

* https://localhost:{port}. Should see HTML page with the following content: **Web-Api is running**;

* https://localhost:{port}/swagger. Should be able to see Swagger description (port - depends on your web-server this value may vary);

To run app via Dotnet CLI run the following command (please, notice, in this case only Kestrel will be used):
```
dotnet run --project ./WebAPI/WebAPI.csproj
```

### Testing

Application supports the following types of tests:

* Unit;

To be able to run Unit tests select appropriate tool in IDE or run the following command:
```
dotnet test ./WebApi.UnitTests
```

Unit tests cover the following parts:
* Controllers;
* Services;
* Handlers;
* Utilities;
* Mappers;
* Validators logic.

### Docker

Docker is not necessary to launch application in case of prepared prerequisites for your physical OS. To launch it without any modifications and wish to see the working result, refer to the next steps:

1. Follow the first step from previous article;
2. Open project root directory via terminal (_diploma_ directory);
3. Run the following command:
```
docker-compose up --build
```
4. Wait until corresponding images will be downloaded, all steps from Dockerfile will pass and application will start;
5. Visit the following URL: http://localhost:3006. Should be able to see Swagger description;
6. If there is a need to stop Docker containers, just press `ctrl + C` keyboard combination in terminal and wait until containers will be stopped. To terminate containers, enter (or stop via Docker dashboard):
```
docker-compose down
```
7. To remove application images, enter the following command (or remove via Docker UI dashboard):
```
docker rmi postgres:10.11 redis:5.0.5 web-api
```

### Logging

Application doesn't write any logs to file(s), it display logs in terminal via running application in the following ways:

1. Local run via IDE;
2. Docker;

### Usage

For more examples, please, refer to the following options:

* [Swagger](https://swagger.io/);

### Contact

dotnet-fizzyy | [GitHub](https://github.com/dotnet-fizzyy) | ezzyfizzy27@gmail.com