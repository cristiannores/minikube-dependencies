#!/bin/bash

cd minikube-kafka-cluster
kubectl apply -f 00-namespace/
kubectl apply -f 01-zookeeper/
kubectl apply -f 02-kafka/
kubectl apply -f 03-yahoo-kafka-manager/


open "http://"$(minikube ip)":"$(kubectl get svc kafka-manager --namespace kafka-ca1 -o go-template='{{range.spec.ports}}{{if .nodePort}}{{.nodePort}}{{"\n"}}{{end}}{{end}}')
