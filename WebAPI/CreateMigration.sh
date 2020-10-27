cd ./WebApi

echo "Please, enter migration name:"
read migrationName

dotnet ef migrations add "${migrationName}" -c DatabaseContext