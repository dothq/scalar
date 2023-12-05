FROM macbre/nginx-http3:latest

COPY nginx-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/bin/sh", "entrypoint.sh"]