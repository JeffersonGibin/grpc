# gRPC

The project is exclusive to learn more about gRPC and its variations

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

### Server Streaming Commands
| Command | Description |
|---------|-------------|
| `npm run start:server-stream` | Starts the Server Streaming gRPC server. |
| `npm run start:client-server-stream` | Starts the Server Streaming gRPC client. |

### Client Streaming Commands
| Command | Description |
|---------|-------------|
| `npm run start:client-stream:server` | Starts the Client Streaming gRPC server. |
| `npm run start:client-stream:client` | Starts the Client Streaming gRPC client. |

### Bidirectional Streaming Commands
| Command | Description |
|---------|-------------|
| `npm run start:bidirectional:server` | Starts the Bidirectional Streaming gRPC server. |
| `npm run start:bidirectional:client` | Starts the Bidirectional Streaming gRPC client. |

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
