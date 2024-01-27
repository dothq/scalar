#!/bin/sh

set -e

docker exec -it certbot certbot renew
docker compose down
docker compose up -d