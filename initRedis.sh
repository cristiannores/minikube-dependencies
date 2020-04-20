#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami
helm install redis \
  --set password=1LcYUkGFqD \
    bitnami/redis
export REDIS_PASSWORD=$(kubectl get secret --namespace default redis -o jsonpath="{.data.redis-password}" | base64 --decode)
echo $REDIS_PASSWORD
 