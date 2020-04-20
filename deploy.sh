#!/bin/bash

docker build -t kafka-producer2 .

kubectl delete deployments kafka-producer2

docker tag kafka-producer2 cristiannores/kafka-producer2-js:1.0.0

docker push cristiannores/kafka-producer2-js:1.0.0

kubectl apply -f deploy/