# Backend for Stock App
> contains API, JWT configurattions.

This application contains the API that are being consumed in the front end application. All the APIs are protected and requires JWT authentication to fetch the results.

![](header.png)

## Installation

to create a virtual env
```sh
python -m venv env
```

To add the required depedencies
```sh
pip install requirements.txt 

```
once the requirements are added, execute below command to run the development server

```sh
python manage.py runserver
```



## Structure
In a RESTful API, endpoints (URLs) define the structure of the API and how end users access data from application using the HTTP methods - GET, POST, PUT. 


Endpoint |HTTP Method | CRUD Method | Result
-- | -- |-- |--
`api/` | GET | READ | Get all movies
`api/` | POST | CREATE | Create a new stock entry
`api/:id` | PUT | UPDATE | Update the latest stock value for any existing stock
`api/login` | POST | AUTH | Authenticate users on every API req