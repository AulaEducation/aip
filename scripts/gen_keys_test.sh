mkdir -p ./test_keys

openssl genpkey -algorithm RSA -out ./test_keys/server_private_key.test.pem -pkeyopt rsa_keygen_bits:4096
openssl rsa -pubout -in ./test_keys/server_private_key.test.pem -out ./test_keys/server_public_key.test.pem

openssl genpkey -algorithm RSA -out ./test_keys/client_private_key.test.pem -pkeyopt rsa_keygen_bits:4096
openssl rsa -pubout -in ./test_keys/client_private_key.test.pem -out ./test_keys/client_public_key.test.pem
