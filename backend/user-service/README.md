# User Service
Building and starting container:
```
docker-compose up -d --build
```
for checking tables directly in container
```
docker exec -it mysqldb mysql -uroot -p
```
Destroying container:
```
docker compose down
```