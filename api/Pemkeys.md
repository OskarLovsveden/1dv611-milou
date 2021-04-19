# How to add pem keys

1. Create private key

- openssl genrsa -out private.pem 2048

2. Generate public key from private key

- openssl rsa -in private.pem -pubout -out public.pem