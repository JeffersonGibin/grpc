# gRPC

The project is exclusive to learn more about gRPC and your variations

### gRPC Variations

| Tipo de Chamada         | Descrição |
|-------------------------|-----------|
| **Unary RPC**           | Client makes a request and receives a response |
| **Server Streaming**    | Client makes a request and the server sends multiple responses. |
| **Client Streaming**    | Client sends multiple messages and receives a single response. |
| **Bidirectional Streaming** | Client and server send multiple messages simultaneously. |


### Unary RPC Commands
| Command | Description |
|---------|-------------|
| `npm run start:unary:server` | Starts the Unary RPC server. |
| `npm run start:unary:client` | Starts the Unary RPC client. |

![image](https://github.com/user-attachments/assets/4540c438-c1c9-467f-bc0a-fdda1328772b)


### Server Streaming Commands
| Command | Description |
|---------|-------------|
| `npm run start:server-stream` | Starts the Server Streaming gRPC server. |
| `npm run start:client-server-stream` | Starts the Server Streaming gRPC client. |

![image](https://github.com/user-attachments/assets/38141df1-910c-4844-b0dc-cc6e342cce1f)


### Client Streaming Commands
| Command | Description |
|---------|-------------|
| `npm run start:client-stream:server` | Starts the Client Streaming gRPC server. |
| `npm run start:client-stream:client` | Starts the Client Streaming gRPC client. |

![image](https://github.com/user-attachments/assets/9dd9c36d-3bb8-4a32-986d-85bf0c2c8118)


### Bidirectional Streaming Commands
| Command | Description |
|---------|-------------|
| `npm run start:bidirectional:server` | Starts the Bidirectional Streaming gRPC server. |
| `npm run start:bidirectional:client` | Starts the Bidirectional Streaming gRPC client. |

![image](https://github.com/user-attachments/assets/3d31e43e-d145-4b05-baef-d0fec3e9dbf8)

### Server with fake certificate
| Command | Description |
|---------|-------------|
| `npm run generate:cert` | Generate fake certificate |
| `npm run start:cert:server` | Starts server with certificate fake. |
| `npm run start:cert:client` | Starts client with certificate fake. |

### Utils

```
npx protoc --proto_path=proto \
  --plugin=protoc-gen-ts=$(which protoc-gen-ts) \
  --plugin=protoc-gen-grpc=$(which grpc_tools_node_protoc_plugin) \
  --js_out=import_style=commonjs,binary:proto \
  --grpc_out=grpc_js:proto \
  --ts_out=grpc_js:proto \
  proto/chat.proto

```
