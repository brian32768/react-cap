# react-cap

Capacity planning tools

Backend: Node + Express + MySQL

Frontend: React + Bootstrap

## Configuration

There is a sample.env, you have to copy it to .env and then edit it.

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

