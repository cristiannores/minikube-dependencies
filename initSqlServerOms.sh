#!/bin/bash

kubectl create secret generic mssql --from-literal=SA_PASSWORD="MyC0m9l&xP@ssw0rd"
kubectl apply -f sql-server-oms/pv-claim.yaml
kubectl apply -f sql-server-oms/sqldeployment.yaml
