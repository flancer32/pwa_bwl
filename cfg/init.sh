#!/usr/bin/env bash
##
# Local configuration for shell scripts.
# Copy this script to './local.sh' then set up vars for local configuration.
##

# Configure runtime reporting & failsafe (see `../bin/commons.sh`).
#export DEBUG_MODE="1"
export FAILSAFE_MODE="1"

# DB connection configuration.
export DB_HOST="localhost"
export DB_NAME="..."
export DB_PASS="..."
export DB_USER="..."

# Paths to link folders for persistent data
export DIR_STORE="/mnt/store/work/project"
