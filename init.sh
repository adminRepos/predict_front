echo "### Docker Compose down"
docker-compose down
echo "### Docker Compose up"
docker-compose up -d --no-deps --build --force-recreate --remove-orphans

