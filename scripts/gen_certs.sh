create_folder() {
    echo "Creating certs folder ..."
    mkdir $1 && cd $1
    chmod +x $1
}

generate_certs() {
    hostname=$1
    expiry=365
    password="1111"
    contry="BR"
    state="SP"
    city="Sao Paulo"
    organization="Test"

    echo "Generating certificates..."

    openssl genrsa -passout pass:$password -des3 -out ca.key 4096

    openssl req -passin pass:$password -new -x509 -days $expiry -key ca.key -out ca.crt -subj  "/C=$contry/ST=$state/L=$city/O=Test/OU=Test/CN=ca"

    openssl genrsa -passout pass:$password -des3 -out server.key 4096

    openssl req -passin pass:$password -new -key server.key -out server.csr -subj  "/C=$contry/ST=$state/L=$city/O=Test/OU=Server/CN=$hostname"

    openssl x509 -req -passin pass:$password -days $expiry -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt

    openssl rsa -passin pass:$password -in server.key -out server.key

    openssl genrsa -passout pass:$password -des3 -out client.key 4096

    openssl req -passin pass:$password -new -key client.key -out client.csr -subj  "/C=$contry/ST=$state/L=$city/O=Test/OU=Client/CN=$hostname"

    openssl x509 -passin pass:$password -req -days $expiry -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt

    openssl rsa -passin pass:$password -in client.key -out client.key
}

create_folder "certs"
generate_certs "localhost"