FROM nginx:alpine

RUN curl https://ssl-config.mozilla.org/ffdhe2048.txt > /etc/ssl/dhparam.pem
