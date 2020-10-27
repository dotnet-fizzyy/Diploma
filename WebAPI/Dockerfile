FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /build

#Copy solution file
COPY *.sln .

#Copy csproj and restore as distinct layers
COPY *.csproj ./
#Run dotnet restore to cache nuget packages
RUN dotnet restore

ENTRYPOINT ["dotnet", "WebAPI.dll"]