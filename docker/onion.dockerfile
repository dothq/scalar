FROM alpine:latest

RUN apk add tor

COPY ./docker/config/torrc /etc/tor/torrc

USER tor

CMD ["/usr/bin/tor"]