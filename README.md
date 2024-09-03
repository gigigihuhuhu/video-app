# References and guidelines

## Vue.js

### vue-cli-service command lines
```
npm install
npm run serve
npm run build
npm run lint
```

## Docker

### Dockerize Vue.js App
https://v2.ko.vuejs.org/v2/cookbook/dockerize-vuejs-app.html
https://moreillon.medium.com/environment-variables-for-containerized-vue-js-applications-f0aa943cb962

### Cheat sheet
https://docs.docker.com/get-started/docker_cheatsheet.pdf

### Multi Arch Build (arm64, amd64)
https://www.docker.com/blog/multi-arch-build-and-images-the-simple-way/

### customized command lines
```
$PROJECT_BASE_DIR/bin/build.sh 1.2.3
$PROJECT_BASE_DIR/bin/run.sh
```

## WebRTC

### Getting Started
https://webrtc.org/getting-started/media-devices

### Perfect negotiation pattern for WebRTC
https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Perfect_negotiation

## GitOps

### Kubernetes
Adopt Kubernetes for simulate real world applications.

Setups
```
#Alias settings     .bashrc 안에 넣기
echo 'alias k=kubectl
complete -o default -F __start_kubectl k' >> ~/.bashrc

#Auto completion settings
source <(kubectl completion bash)
echo '[[ $commands[kubectl] ]] && source <(kubectl completion bash)' >> ~/.bashrc

brew install kubectx
#kubens <namespace-name>
```

### Kind
Adopted Kind for simulate multi-node kubernetes cluster in local machine (https://kind.sigs.k8s.io/)
```
➜  cat create_cluster.sh
kind create cluster --config kind-config.yaml
```

### Ingress Controller
```
#Install Ingress controller nginx for kind
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

### ArgoCD
https://argo-cd.readthedocs.io/en/stable/

```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

#create argocd ingress resource
https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/#option-1-ssl-passthrough

brew install argocd

#Get Initial password
argocd admin initial-password -n argocd

#Change password
argocd login localhost

argocd account update-password
```

## First Deploy

git clone https://github.com/gigigihuhuhu/gitops.git

https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/    1.~4.

[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.24.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

sudo apt-get update
sudo apt-get install docker.io
whoami
sudo usermod -aG docker ubuntu(계정명)

- sudo 없이 docker 명령어 실행가능 여부 확인 하기
docker images

- Setup kind cluster 
~/gitops/kind/create_clusters.sh


## Future Idea
Screen sharing functions