Deploying a Scalable Web Application with Database Integration Using Azure VMs, Docker, and Cloud Security
Provision VMs: Creating frontend and backend vms in azure portal
              -using linux ubuntu images for both vms

Frontend: install nginx, create frontend dir, create index.html,dockerfile,docker-compose files 
          Use docker-compose.yml to define services, networks, and volumes.
          check the connection with vms ip address port 80

Backend: install nodejs,mysql,openssl create app.js,package.json,my.conf in backend dir
         Configure SSL for secure communication.
         Set Up Cron Job,check health logs with db_healthcheck script
         
Configure NSGs to restrict access and allow neccessary traffic for port 3000/443/80 etc.

Configure Load Balancerfor both front end and backend vms to manage traffic distribution between VMs.
         
