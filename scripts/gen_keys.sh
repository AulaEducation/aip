mkdir -p ./keys

openssl genpkey -algorithm RSA -out ./keys/server_private_key.pem -pkeyopt rsa_keygen_bits:4096
openssl rsa -pubout -in ./keys/server_private_key.pem -out ./keys/server_public_key.pem

openssl genpkey -algorithm RSA -out ./keys/client_private_key.pem -pkeyopt rsa_keygen_bits:4096
openssl rsa -pubout -in ./keys/client_private_key.pem -out ./keys/client_public_key.pem
