# Security

The AIP is built with RSA encryption at the heart of the system.
AIP API routes are built asymmetric key/pair encryption in order to allow maximum security during data exchanges

### RSA asymmetric encryption

All data exchanged between the AIP and Aula authentication is encrypted with 4096 bit RSA keys.
Both server (AIP) and client (Aula authentication) should have a private and public key that are preshared.

Keys are distributed in the following way:
- server
  - server_private key
  - client_public key
- client
  - client_private key
  - server_public key

### Signature
Each message is signed by the sender which add an extra layer of trust around exchanged data.
Signatures are generated based on the decrypted message and private keys, and verified based on the decrypted message and public keys.


### Flow

- sender encrypt the data with receiver public key
- sender sign the data with his private key
- receiver decrypt the data with his private key
- receiver verify the signature with the sender public key

This flow ensure that data:
- can only be decrypted by the receiver
- can only be sent by a trusted sender
- integrity can be verified 
