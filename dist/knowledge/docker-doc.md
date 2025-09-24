Cheatsheet - https://dockerlabs.collabnix.com/docker/cheatsheet/

> creates the container and exit
`docker create ngnix`

> starts the docker container
`docker start <container_id/name`

> ctrl+c wont stop process inside container but just exit the container only
`docker attach --sig-proxy=false <container_id`

> this is create+run >> run local image and exited if found, otherwise pull it from hub
`docker run ngnix`

> create + run + attach + delete when process is done
`docker run -it --rm imagename`

> running container list
`docker ps`

> all container
`docker ps -a`

> stop docker container
`docker stop container_name`

> remove stopped container
`docker rm container_name`

> list all images
`docker images`

> must remove all running container before removing image
delete an image
`docker rmi ngnix`

> only pulls image (not run)
`docker pull ngnix`

> run container in detach mode AND sleep for 20 second
`docker run -d ngnix sleep 20`

> attach container in CMD
`docker attach docker_id`

> Why -it ?
if you want to provide input to the application then -i is necessary, like what is your name etc etc, and whatever you want to see from terminal of container you have to attach container's terminal to host's terminal that's why -t
iterative mode and run bash as first command
`docker run -it ngnix bash`

> run BASH command on container 34egr, you can run any command as you like for ex cat /etc/*release*
`docker exec 34egr34h34 bash`

> this is called TAG, specify which version you want to use
`docker run redis:4.0`

> Docker Host in your system has one IP allocated to it, and each container that run within it has different port mapped to it, so if you want to run diff instance of webapp on a single host then you have to map like this
> (when you first run webapp on host, it shows which port it runs on, for below example webapp runs on 5000 and mysql runs on 3306)
```
docker run -p 80:5000 jaydeep/webapp
docker run -p 8000:5000 jaydeep/webapp
docker run -p 8020:5000 jaydeep/webapp
docker run -p 9000:3306 mysql
docker run -p 9030:3306 mysql
```
(so here 3 instance of webapp and 2 instance of mysql runs on Host)

> all the details(internal ip,port) of container
`docker inspect container_id/name`

> display logs(standard out) when container runs in detach mode
`docker logs container_id/name`

> by default mysql stores its data in /var/lib/mysql, when container stops and remove its data also losts, so to persist the data written into container, we have to map external volume(host's volume) to the data volume that container uses
`docker run -v /opt/mydatadir:/var/lib/mysql mysql`

>give it a particular name
`docker run -d --name=redis redis`

>How to build image
Dockerfile >>default name of the file which contains instructions, for ex
```
FROM Ubuntu
run apt-get update && apt-get -y install python
RUN pip install flask flask-mysql
COPY . /opt/code
ENTRYPOINT FLASK_APP=/opt/code/app.py flask run
```


> -t is for tag name we give
`docker build Dockerfile -t jaydeep/my-custom-app`

> docker host creates custom volume "data_volume" under /var/lib/docker
`docker volume create data_volume`

> now container's volume is mapped to our data_volume which is persistent, this alone command can also be used as docker host will automatically mount new volume as you specify name
`docker run -v data_volume:/var/lib/mysql mysql`

> image info that when it was created and size etc
`docker history image_id`

> build using current folder's dockerfile
`docker build .`

> gives a name to the untagged previously build image
`docker build . -t mywebapp`
`docker build . -f dockerfilecustom -t mytag` -f is filename

>total size used by images, container and volumes
`docker system df`

>versbose, particular size used by Images
`docker system df -v`

>by this command only single instance of app can use host's port, thus no need to bind it s explicitely, and can run multiple apps using diff ports obviously, by default BRIDGE network is used, others are HOST and NONE
`docker run ubuntu --network=host`
