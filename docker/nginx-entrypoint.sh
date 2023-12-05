#!/bin/sh

chown -R nginx:nginx /etc/letsencrypt
exec runuser -u appuser "$@"