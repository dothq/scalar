#!/bin/sh
set -e

docker exec certbot certbot certonly --webroot -w /var/www/letsencrypt \
    --email contact+letsencrypt@dothq.org \
    --agree-tos \
    -n \
    -d dothq.org
    -d www.dothq.org

echo "Run docker restart nginx certbot to load the certificate."