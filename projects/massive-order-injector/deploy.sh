#!/bin/bash

docker rmi -f $(docker images -a |  grep "massive-order-injector")

docker build -t massive-order-injector .

kubectl delete deployments massive-order-injector

docker tag massive-order-injector cristiannores/massive-order-injector:1.0.0

docker push cristiannores/massive-order-injector:1.0.0

kubectl apply -f deploy/

#!/bin/bash

#eval $(minikube docker-env)

#docker build -t massive-order-injector .

#kubectl delete pod massive-order-injector

#docker tag order-process massive-order-injector:1.0.0

#kubectl run order-process --image=massive-order-injector:1.0.0 --image-pull-policy=Never */