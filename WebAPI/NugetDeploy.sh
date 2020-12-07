echo "Please, enter the version of your package: "
read version

dotnet restore

cd ./WebAPI.Models/
dotnet pack -p:PackageVersion="${version}" -c:Release