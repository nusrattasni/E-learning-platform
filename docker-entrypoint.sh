#!/bin/sh
set -e

# Generate application key if not set
php artisan key:generate --force

# Wait for database to be ready (handled by depends_on in docker-compose, but safe to run migrations now)
echo "Running migrations..."
php artisan migrate --force

echo "Running seeders..."
# Only seed if database is empty to avoid duplicates
php artisan db:seed --force

echo "Optimizing application..."
php artisan optimize:clear
php artisan optimize

# Start Apache
echo "Starting Apache..."
exec "$@"
