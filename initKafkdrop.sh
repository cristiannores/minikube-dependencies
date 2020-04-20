#!/bin/bash

figlet KAFKDROP INSTALLATION


red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

echo "${red}Deleting kafkdrop kubectl...."
echo ${reset}
kubectl delete deploy kafdrop
kubectl delete svc kafdrop
sleep 1 
echo "${red}docker pull latest image of kafkadrop .. "
echo ${reset}
docker pull obsidiandynamics/kafdrop
sleep 1 
echo "${red}deploy kafkdrop in kubectl ..."
echo ${reset}
kubectl apply -f deploy-kafdrop/ 
echo "${red}Opening kafkdrop in browser in 10 seconds ...."
echo ${reset}
for i in {1..35}
do
   if (( $i < 31))
   then
   echo ${green}
   sleep 1
   clear
   figlet espera porfavor ..
   echo $(( 36 - $i ))" seconds.."
   else 
   sleep 1
   clear
   echo ${red}
   figlet Casi ..
   figlet $(( 36 - $i ))" seconds.."
  
   fi
done
echo ${reset}
open "http://"$(minikube ip)":"$(kubectl get svc kafdrop -o go-template='{{range.spec.ports}}{{if .nodePort}}{{.nodePort}}{{"\n"}}{{end}}{{end}}')