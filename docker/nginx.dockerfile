FROM macbre/nginx-http3:latest

RUN chown -R $(whoami):$(whoami) /etc/letsencrypt/live/