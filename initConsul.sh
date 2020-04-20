#!/bin/bash

helm uninstall hashicorp
helm install -f consul/helm-consul-values.yaml hashicorp ./consul-helm