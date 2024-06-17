# syntax=docker/dockerfile:1

# Stage 1: Build React app
FROM node:16 AS build
# Set working directory
WORKDIR /app
# Copy the React app package.json files to the container
COPY react-app/package.json react-app/package-lock.json ./
# Install dependencies
RUN npm install
# Copy the React app source code to the container
COPY react-app/ ./
#build the React app
RUN npm run build

# Stage 2: with the python:3.9 image
FROM python:3.9
# Set working directory
WORKDIR /app
# Set the following enviroment variables
ENV REACT_APP_BASE_URL=https://q-cord-forked.onrender.com/
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=true
# Copy all the files from your repo to the working directory
COPY . .
# Copy the built react app (it's built for us) from the
# /react-app/build/ directory into your flasks app/static directory
COPY /react-app/build/* app/static/
# Run the next two python install commands with PIP
# install -r requirements.txt
# install psycopg2
RUN pip install -r requirements.txt
RUN pip install psycopg2
# Start the flask environment by setting our
# closing command to gunicorn app:app
CMD gunicorn app:app

