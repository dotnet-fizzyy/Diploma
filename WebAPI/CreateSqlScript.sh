cd ./WebAPI

dotnet ef migrations script -i -o ../initdb/initdb.sql -c DatabaseContext