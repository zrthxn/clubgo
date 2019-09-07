FROM node:12.0.0

# Set the working directory to /clubgo
WORKDIR /clubgo

# Copy the current directory contents into the container at /clubgo
COPY . /clubgo