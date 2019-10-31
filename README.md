## Docker (frontend)

To build a release image:

`docker build . -t site:1.0.0`

To run that one:

`docker run -it -p 3000:80 --rm site:1.0.0`

Open the URL: `http://localhost:3000/`

## Docker (backend)

To build a release image:

`docker build . -t service:1.0.0`

To run that one:

`docker run -it -p 8080:8080 --rm service:1.0.0`

Open the URL: `http://localhost:8080/`

## Docker (compose)

To start:

`docker-compose up --build`

