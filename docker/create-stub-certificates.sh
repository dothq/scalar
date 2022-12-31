#!/bin/sh
docker restart certbot
docker exec certbot mkdir -p /etc/letsencrypt/live/dothq.org
docker exec certbot openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/letsencrypt/live/dothq.org/privkey.pem \
    -out /etc/letsencrypt/live/dothq.org/fullchain.pem \
    -subj /CN=dothq.org