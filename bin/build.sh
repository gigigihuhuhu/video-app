#!/bin/bash

# Get the directory of the current script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Move to the directory where Dockerfile is located (assuming it's one level up from bin)
DOCKERFILE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Check if Dockerfile exists in the directory
if [ -f "$DOCKERFILE_DIR/Dockerfile" ]; then
  echo "Dockerfile found in $DOCKERFILE_DIR"
  cd $DOCKERFILE_DIR
else
  echo "Dockerfile not found in $DOCKERFILE_DIR"
  exit 1
fi

# Regular expression to match the format number.number.number
regex='^[0-9]+.[0-9]+.[0-9]+$'

# Check if the first parameter matches the regex
if [[ $1 =~ $regex ]]; then
  docker build -t video-app:$1 .
else
  echo "Please pass the correct format of parameter
        
        Expected format: 
          ./build.sh 1.2.13"
fi
