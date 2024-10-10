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

# Access Service via cluster
host : <service-name>.<namespace>.svc.cluster.local
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

### TLS/SSL
https://thekoguryo.github.io/oracle-cloudnative/oss/ingress-controller/4.nginx-ingress-tls-termination/#google_vignette
- self-signed의 경우 wss 인증서 항상 신뢰한다고 해야지 아니면 net::ERR_CERT_AUTHORITY_INVALID 발생
- https://cert-manager.io/ Cert Manager 로 자동갱신 가능
- helm 설치 : https://helm.sh/docs/intro/install/
- https://cert-manager.io/docs/installation/helm/
- 1. issuer 생성, 2. ingress에 issuer 명시 및 spec.tls 작성 3. staging -> prod 변경 시 기존 secret 삭제 4. k get certificate -> READY == True 확인



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
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

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

### Helm
```
helm ls -n keycloak
helm get values -n keycloak keycloak --all
```

### Postgresql
```
# postgres CLI login
k exec -n postgresql postgresql-0 -it -- psql -U postgres
# Password
- k get secrets -n postgresql postgresql -o jsonpath="{.data.postgres-password}" | base64 -d
# Add Keycloak DB, User
k exec -n postgresql  postgresql-0 -it -- psql -U postgres
CREATE USER keycloak WITH PASSWORD 'password';
CREATE DATABASE keycloak;
GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
GRANT CREATE ON SCHEMA public TO keycloak;

select * from pg_tables;
select * from pg_tables where tableowner = 'keycloak';
```

### Keycloak
```
helm delete -n keycloak my-keycloak
helm install keycloak bitnami/keycloak --version 22.2.3 -n keycloak -f values.yaml

1. Realm 생성
2. Client 생성 - application 사용자를 인증 시킴
3. 
```

### etc
```
# # eliminate
sed '/^[[:blank:]]*#/d;s/#.*//'
```

### Issues
- ArgoCD ERR_TOO_MANY_REDIRECTS 발생
How? --insecure 파라미터 추가하여 해결 가능 
    (argocd-cmd-params-cm.data.server.insecure: "true")
Why? ArgoCD http 요청을 https로 리다이렉트 <-> Ingress https 요청 terminate -> http로 ArgoCD 와 소통하려 함을 반복

- Values 변경 후 Postgresql 및 Keycloak의 postgres 접속이 안되는 현상 발생
How? ns 삭제 후 전체 reset
Why? Chart 업그레이드 시 자동으로 비밀번호 랜덤생성 들어감. 이를 막기 위해서는 비밀번호 지정 필요. existingSecret

    After a helm delete keycloak both the keycloak and the postgresql pod is gone. Also all the secrets are gone.
    (However the pvc is not deleted and will be reused later.)

    Then I do a helm install keycloak bitnami/keycloak -f values with the above values, which will result in the described behavior, because it picks up the old pvc which is still configured with the old password.

## Future Idea
Screen sharing functions

### TO-DO
1. 몰래 슬쩍 들어가기 기능
2. 채팅창 구현

# Emoji