#!/bin/bash

## Deleting vector log if exist ( collector of log )
kubectl delete -k logging/
## installing vector log
kubectl apply -k logging/
## deleting
kubectl delete deployment -n logging kibana
kubectl delete deployment -n logging elasticsearch
## installing elasticsearch
kubectl create -f logging-kibana/elastic.yaml -n logging
## installing kibana
kubectl create -f logging-kibana/kibana.yaml -n logging
## installing fluentd
kubectl create -f logging-kibana/fluentd-rbac.yaml
## installing daemon
kubectl create -f logging-kibana/fluentd-daemonset.yaml --validate=false
