# Project Distance Calculator

This is a distance calculator project developed with Node.js and Express. The objective of this project is to calculate the distance between two addresses using the Google Maps Distance Matrix API.

## Functionality

The project consists of a Node.js server that uses the Express framework to create routes and handle HTTP requests. When accessing the project's home page, the user is presented with a form where they can enter the origin and destination addresses. Upon submitting the form, the server makes a request to the Google Maps Distance Matrix API to obtain information about the distance and estimated travel time between the two addresses.

The server uses the node-fetch library to make the HTTP request to the Google Maps API. You need to have a Google Maps API key to use the service. The API key should be configured in the index.js file using the api_key variable.

After receiving the response from the Google Maps API, the server extracts the relevant information, such as the distance, estimated travel time, and the coordinates of the origin and destination. It then renders a result page using the ejs template engine, displaying the retrieved information and a map with the route on Google Maps.

If an invalid address is entered in the form, the server renders an error page informing the user about the issue and offering the option to go back to the home page.

## Prerequisites

Before running the project, make sure you have the following prerequisites:

    1. Node.js installed on your machine
    2. A Google Maps API key (obtain one at https://cloud.google.com/maps-platform/)

## Usage

    1.Access the following address in your browser: http://localhost:3000.
    2.Fill in the origin and destination fields with the desired addresses.
    3.Click the "Calculate" button to get the distance result.
    4.A page will be displayed with the distance result, estimated travel time, and a map with the route.

## Project Structure

    index.js: Main file that configures the Express server and defines the routes.
    distancia.html: Project's home page where users enter the addresses.
    invalid.html: Page displayed when an invalid address is entered.
    resultado.ejs: Page template for displaying the distance result.

