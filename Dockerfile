# Stage 1: Base image for dependencies
FROM node:20-alpine as node-builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Install Node.js dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy app files for the frontend build
COPY resources/js/ ./resources/js/
COPY resources/css/ ./resources/css/
COPY vite.config.js ./
COPY .env.example .env

# Build frontend assets
RUN pnpm build

# Stage 2: Base PHP image with Composer
FROM php:8.2-fpm-alpine as php-builder

# Install PHP extensions and system dependencies
RUN apk add --no-cache \
    bash \
    git \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libzip-dev \
    zip \
    unzip \
    curl \
    oniguruma-dev \
    freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
    gd \
    zip \
    pdo \
    pdo_mysql \
    mbstring \
    opcache

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Install Laravel dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copy application files
COPY . .

# Set correct permissions for Laravel storage
RUN chown -R www-data:www-data storage bootstrap/cache

# Stage 3: Final Production Image
FROM php:8.2-fpm-alpine

WORKDIR /var/www/html

# Copy PHP and frontend build artifacts from previous stages
COPY --from=php-builder /var/www/html /var/www/html
COPY --from=node-builder /app/dist /var/www/html/public

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html

# Expose the application port
EXPOSE 9000

# Start PHP-FPM server
CMD ["php-fpm"]