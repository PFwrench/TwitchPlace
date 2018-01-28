#!/usr/bin/env bash
NAME=${1:-testing}

openssl req \
  -newkey rsa:2048 \
  -days 1001 \
  -nodes \
  -x509 \
  -extensions SAN \
  -config <( cat $( [[ "Darwin" = "$(uname -s)" ]]  && echo /System/Library/OpenSSL/openssl.cnf || echo /etc/ssl/openssl.cnf  ) \
    <(printf "[SAN]\nsubjectAltName='DNS:localhost'")) \
  -keyout "${NAME}.key" \
  -out "${NAME}.crt" \
  -requexts SAN \
  -extensions SAN \
  -sha256 \

echo ""
echo "Generated $NAME.key and $NAME.crt files in local directory"
echo ""

if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Installing cert into local Keychain."
  echo "To see or modify, run 'Keychain Access' app and look in the 'System' Folder"
  sudo security add-trusted-cert -d -p ssl -r trustRoot -k "/Library/Keychains/System.keychain" "${NAME}.crt"
else
  echo "Please install and trust cert at $PWD/$NAME.crt"
fi
