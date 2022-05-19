# X-Men Project: Mutant Checker API

## Table of Contents

1. [Description](#description)
2. [Consuming the API](#consuming-the-api)
3. [Running Locally](#running-locally)

## Description

This project was created for helping Magneto to recruit new mutants for fighting the X-men. It will allow Magneto to analyze the candidate's DNA for checking if the candidate its a mutant of not.

### Architecture Diagram

The Amazon API Gateway service receives our requests, it passess them to the AWS Lambda which hosts our function's logic. And finally, these requests get to our DynamoDB database which stores the processed DNA Chains.

![Mutant Checker API Architecture](images/mutant_checker_architecture.png)

### Tech Stack

The project utilizes Amazon Web Services such as:

- API Gateway
- AWS Lambda
- DynamoDB

It was built upon:

- node.js
- Serverless framework

## Consuming the API

This serverless API exposes two API Gateway endpoints:

| Endpoint | HTTP Verb | Description                                                                                | Supported Status Codes |
| -------- | --------- | ------------------------------------------------------------------------------------------ | ---------------------- |
| /mutant  | POST      | Checks if a DNA chain corresponds to a mutant or a human and saves a DNA chain to DynamoDB | 200, 403               |
| /stats   | GET       | Counts the amount of mutant and human DNA chains that has been saved to our database       | 200, 404               |

### Consuming the /mutant/ endpoint

#### Getting a 200 response

The endpoint should receive a body like the following example input:

```bash
{
    "dnaChain": [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ]
}
```

In this case, since there is a four-letter-sequence in the left bottom diagonal, the endpoint will output a 200 code response with a message like follows:

```bash
{
    "message": "It's a mutant, come and join us!"
}
```

#### Getting a 403 response

The endpoint should receive a body like the following example input:

```bash
{
    "dnaChain": [
        "TTGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ]
}
```

In this case, since there is no four-letter-sequence in in any of the diagonals, horizontal or vertical lines, the endpoint will output a 403 code response, identifying our current candidate as a no-mutant with a message like follows:

```bash
{
    "message": "It´s not a mutant, get out of here!"
}
```

### Consuming the /stats/ endpoint

#### Getting a 200 response

This endpoint does not require any input from the user. In order to get a successful response from it, we need to insert some DNA chains in our DynamoDB before consuming our stats endpoint. We can do this by following the instructions in the previous section.

Once we have some data in our database, we can consume this endpoint. Depending on the amount of mutant and non-mutant candidates we registered, it will output a response like the following:

```bash
{
    "response": {
        "count_mutant_dna": 3,
        "count_human_dna": 2,
        "ratio": 1.5
    }
}
```

#### Getting a 404 response

If we consume this endpoing when having no DNA chains registered in our database, it will output a 404 status code, and will display a message like this:

```bash
{
    "message": "No dna chains to count on database"
}
```

### Testing the API

If you want to go deeper and test with your own hands how this Serverless API behaves, you can try consuming it from its Postman Collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/14464237-a52913c0-1333-478f-b92f-3fe6666ea3ac?action=collection%2Ffork&collection-url=entityId%3D14464237-a52913c0-1333-478f-b92f-3fe6666ea3ac%26entityType%3Dcollection%26workspaceId%3D5751af16-cc8d-4e96-965a-e20d506d6a8d)

###### Note: When using the Postmann Collection, you should check the environment on which you are. It should be "Production".

## Running Locally

### Pre-requisites

We need to install the following dependencies before running our project locally:

- dynamodb-local

### Scripts

Install Dependencies

```bash
npm run install
```

Running Tests

```bash
npm run test
```

Running Locally

```bash
npm run start:dev
```

###### Note: You can use the same Postman Collection referenced above. When using it, you should check the environment on which you are. It should be "Development".
