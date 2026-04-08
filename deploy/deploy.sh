#!/usr/bin/env bash

# This script is meant to run on the VPS.
# Its job is to:
# 1. figure out which image should be deployed,
# 2. load deployment settings from deploy/.env,
# 3. make sure required tools and variables exist,
# 4. prepare persistent directories for the database and uploads,
# 5. ask Docker Compose to pull and start the container.

# Fail fast:
# - `-e`: stop when a command fails
# - `-u`: stop when an unset variable is used
# - `-o pipefail`: fail a pipeline when any command in it fails
set -euo pipefail

# Print a small help message when the script is called incorrectly
# or when someone passes --help.
usage() {
  cat <<'EOF'
Usage: deploy.sh <image-tag> <image-name> <registry> [app-root]

Required runtime configuration is read from deploy/.env on the VPS when present.
Expected env vars:
  NEXTAUTH_URL
  AUTH_SECRET
  AUTH_MICROSOFT_CLIENT_ID
  AUTH_MICROSOFT_CLIENT_SECRET
  AUTH_ALLOWED_EMAILS

Optional env vars:
  COMPOSE_PROJECT_NAME
  APP_PORT
  DEPLOY_DATA_DIR
  DEPLOY_UPLOADS_DIR
  GHCR_USERNAME
  GHCR_TOKEN
EOF
}

# Support the common help flags.
if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  usage
  exit 0
fi

# We need at least:
# 1. the tag to deploy
# 2. the image name
# 3. the registry hostname
if [ "$#" -lt 3 ]; then
  usage >&2
  exit 1
fi

# Positional arguments:
# - IMAGE_TAG: the image version, for example `sha-abc1234`
# - IMAGE_NAME: the repository path in the registry
# - REGISTRY: usually `ghcr.io`
# - APP_ROOT: optional absolute path on the VPS where the deploy folder lives
IMAGE_TAG="$1"
IMAGE_NAME="$2"
REGISTRY="$3"

# If APP_ROOT is not provided, infer it from this script location.
# `dirname "${BASH_SOURCE[0]}"` = folder containing this script
# `/..` moves one level up from `deploy/` to the app root
APP_ROOT="${4:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
DEPLOY_DIR="${APP_ROOT}/deploy"
COMPOSE_FILE="${DEPLOY_DIR}/compose.yml"
ENV_FILE="${DEPLOY_DIR}/.env"

# This becomes the full Docker image reference used by Compose,
# for example: ghcr.io/mpannekoek/baswilbrink.basijsenzo:sha-abc1234
IMAGE_REFERENCE="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"

# Deployment cannot continue without Docker itself.
if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required on the VPS." >&2
  exit 1
fi

# Prefer the modern `docker compose` command.
# Fall back to the older standalone `docker-compose` binary when needed.
if docker compose version >/dev/null 2>&1; then
  DOCKER_COMPOSE=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE=(docker-compose)
else
  echo "docker compose is required on the VPS." >&2
  exit 1
fi

# The compose file must already exist on the VPS.
# The GitHub Actions workflow copies it there before this script runs.
if [ ! -f "${COMPOSE_FILE}" ]; then
  echo "Compose file not found at ${COMPOSE_FILE}." >&2
  exit 1
fi

# Load environment variables from deploy/.env when the file exists.
# `set -a` automatically exports variables defined by the sourced file,
# so Compose can read them later.
if [ -f "${ENV_FILE}" ]; then
  set -a
  # shellcheck disable=SC1090
  . "${ENV_FILE}"
  set +a
fi

# `:` is a no-op command. Here it is used as a compact way to say:
# "this variable must exist and must not be empty".
# If one is missing, Bash prints the custom message and exits.
: "${NEXTAUTH_URL:?NEXTAUTH_URL is required}"
: "${AUTH_SECRET:?AUTH_SECRET is required}"
: "${AUTH_MICROSOFT_CLIENT_ID:?AUTH_MICROSOFT_CLIENT_ID is required}"
: "${AUTH_MICROSOFT_CLIENT_SECRET:?AUTH_MICROSOFT_CLIENT_SECRET is required}"
: "${AUTH_ALLOWED_EMAILS:?AUTH_ALLOWED_EMAILS is required}"

# Provide sensible defaults for optional deploy settings.
# These can still be overridden in deploy/.env when needed.
DEPLOY_DATA_DIR="${DEPLOY_DATA_DIR:-${APP_ROOT}/data}"
DEPLOY_UPLOADS_DIR="${DEPLOY_UPLOADS_DIR:-${APP_ROOT}/uploads}"
COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-basijsenzo}"

# Export values so the compose file can interpolate them.
export IMAGE_REFERENCE
export DEPLOY_DATA_DIR
export DEPLOY_UPLOADS_DIR
export COMPOSE_PROJECT_NAME

# Ensure the persistent host directories exist before containers start.
# These directories survive container replacement:
# - data: SQLite database files
# - uploads: user-uploaded image files
mkdir -p "${DEPLOY_DATA_DIR}" "${DEPLOY_UPLOADS_DIR}"

# Optional registry login.
# This is useful when the VPS must authenticate before it can pull from GHCR.
# If the credentials are absent, we simply skip the login step.
if [ -n "${GHCR_USERNAME:-}" ] && [ -n "${GHCR_TOKEN:-}" ]; then
  printf '%s' "${GHCR_TOKEN}" | docker login "${REGISTRY}" --username "${GHCR_USERNAME}" --password-stdin
fi

# 1. `config` validates that the compose file and env variables resolve correctly.
# 2. `pull` downloads the requested image tag.
# 3. `up -d --remove-orphans` starts or updates the service in the background.
# 4. `ps` prints the final container status as a quick deployment summary.
"${DOCKER_COMPOSE[@]}" --project-directory "${APP_ROOT}" -f "${COMPOSE_FILE}" config >/dev/null
"${DOCKER_COMPOSE[@]}" --project-directory "${APP_ROOT}" -f "${COMPOSE_FILE}" pull
"${DOCKER_COMPOSE[@]}" --project-directory "${APP_ROOT}" -f "${COMPOSE_FILE}" up -d --remove-orphans
"${DOCKER_COMPOSE[@]}" --project-directory "${APP_ROOT}" -f "${COMPOSE_FILE}" ps
