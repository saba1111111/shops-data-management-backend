#!/usr/bin/env bash

ORIGINAL_DIR=$PWD

# set the service
SERVICE=$1

# set the environment
ENV=$2

# set the path to your sequelizerc
CONFIG_DIR=./apps/$SERVICE

# Change to the CONFIG_DIR
cd $CONFIG_DIR

#npx sequelize-cli db:migrate --env $ENV
#npx sequelize-cli db:seed:all --env $ENV

# Change back to the original directory
cd $ORIGINAL_DIR

# run service in development mode
yarn start:dev $SERVICE
