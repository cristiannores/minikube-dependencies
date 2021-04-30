#!/bin/bash

docker container prune
docker network prune
docker system prune
docker volume prune
docker builder prune

docker rmi -f $(docker images -a -q)