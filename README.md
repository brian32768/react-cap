# react-cap

Capacity planning tools

Backend: Node + Express + MySQL

Frontend: React + Bootstrap

## Configuration

My set up will hide behind a jwilder nginx reverse proxy, and both the frontend and backend
will be on the same URL, so the API includes "/server/" to help me differentiate them.
For example the frontend is at https://capacity.wildsong.biz/ and the backend is at
https://capacity.wildsong.biz/server/TABLENAME.

Note to self, make sure you look at the entry in vhost.d/ folder in the nginx proxy.
Refer to sample.vhost, copy it to capacity.YOURDOMAIN in vhost.d

There is a sample.env, you have to copy it to .env and then edit it.

Stupid auth problem - node's mysql client is out of date so execute this to downgrade.
Replace the user and pass with the right ones.
You can do this in adminer

ALTER USER 'MYSQL_USER' IDENTIFIED WITH mysql_native_password BY 'PASSWORD';


## Testing

You can test one component at a time. First the database,

```bash
docker run -it --rm --name cap-mysql --env-file ./.env mysql 
```

Now you should be able to connect to it, 

```bash
winpty docker exec cap-mysql sh
mysql -uroot -p wildsong_covid
password:
SELECT * FROM inventory;
```

then adminer,
```bash
docker run -it --rm --name=cap-adminer -p 8080:8080 adminer
```
It should be visible at http://localhost:8080/

finally, the api server. You might need to build it first, 
```bash
docker build -t cap_api_server -f server/Dockerfile.api_server server
docker run -it --rm --name=cap-api-server --env-file ./.env -p 3000:3000 cap_api_server
```
If you run the API server independently it will throw errors as it tries to reconnect
to the non-existent database server. This is a good time to test what it returns to the
client. It should return empty datasets. Try http://localhost:3000/inventory

I should create a "status" endpoint to show why it's returning empty datasets.
Possibilities include the database is down, authentication failed, you're using the
wrong database or the table does not exist, or possibly the dataset is empty!

Once db and adminer are running you should be able to log in via adminer
and populate the wildsong_covid tables from the SQL dump file.

It's possible to run more than one client (webapp), so you can start up the docker-compose
and then ALSO run in the client in a debugger. The API server name has to resolve correctly, 
set APIHOST in the environment.

## Deployment

I'm working on a docker-compose.yml file, 
at this time it will launch mysql, adminer, and the node server
that implements the backend.

### Loading the database

### Launch

It's Docker, so
```bash
docker-compose up
```

When it comes up the first time, mysql will restart several times, this is normal.

## Adminer

It wants to see 127.0.0.1 as the host name.
You will have already specified user and pass settings in configuration.

## References

https://dev.to/time2hack/creating-rest-api-in-node-js-with-express-and-mysql-21hk

book: "Web Development with Node and Express", Ethan Brown

Python microservice vs Node

Python SQLAlchemy is absurdly complicated whereas Node just hands me JSON objects.
I can't use .env file without adding Python code
Debugging is less elegant, for Node, nodemon works well
Python virtual environments are a pain compared to NPM

```
cd server
npm start
```

