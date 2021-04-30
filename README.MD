### MINIKUBE INSTALATION


**This will install minikube**

`brew install minikube`

###Start miikube

` minikube start --memory=6144 --cpus=4`

### Init minikube kafka
`sh initKafka.sh`

#### Execute the following command to see the url and create the cluster of kafka

`minikube service -n kafka-ca1`

#### Add new cluster, and use the following data for Cluster Zookeeper Hosts:

`zookeeper-service:2181`

### init sql server 
`sh initSqlServerOms.sh`

#### Get url from mssql deployment 

minikube service mssql-deployment --url

## Enable Logging Kubernets
`sh initLogging.sh`

### enable port for vector (collector log)

`kubectl port-forward --namespace=vector vector-agent-hhngl 28015:8686`
