# Hermes API

## Installation

### Install Scripts

Install the npm modules by running the bellow command while being in the root directory of the API

```bash
$ npm install
```

### Environment Variables

Create a new file in the root directory of the API with the name ```.env```

Copy the variables in the example.env and update ```GPSI_TOKEN``` and possibly change the ```DB_CONNECTION_STRING``` if needed. 

### Generate RS256 key pairs

Navigate to the root directory of the API and run the bellow to generate a private key
```bash
$ openssl genrsa -out private.pem 2048
```
After the private key is generated, run the bellow command to generate the public from the private key
```bash
$ openssl rsa -in private.pem -pubout -out public.pem
```

Now there should be a ```private.pem``` and  a ```public.pem``` file in the root directory of the API

## Run the API

### In Development

To run the API in development run the command:

```bash
$ npm run start:dev
```

### In Production

#### Using Docker

Build the docker image | Requires docker to be installed on the computer
```bash
$ docker build -t APP_NAME .
```
Run the docker image
```bash
$ docker run -p EXTERNAL_PORT:INTERNAL_PORT APP_NAME
```

*example*
*Building docker image*
```bash
$ docker build -t milou-api .
```
*Run docker image*
```bash
$ docker run -p 5000:5000 milou-api
```

## Development

The typical feature of the api is based on a resource.
Each resource category has their own **router**, **middleware**, **controller**, **service** and **model**, 

### Example
*Example* For a User resource

Here we will have a *router* called **UserRouter**, a *middleware* called **UserMiddleware**, a *controller* called **UserController** and a service called **UserService**.

### Router
The **UserRouter** will handle request that are sent to ```/users``` and will call the appropriate middlewares and controller. 

### Middleware
The **UserMiddleware** will confirm that the needed parameters is sent in the request and create error messages if they are missing. The middleware will not check that the parameters are correct, only that they exists.
*Example:* A post request to /users that is used to create a new user will check that the username and password is sent in the request, but will not check that the username or password is in the correct format or legnth.

### Controller
The **UserController** will handle getting data from the **UserService** and sending back the correct data and status code to the client.

### Service
The **UserService** will handle calls to the database and external API's. It will also format the data.


