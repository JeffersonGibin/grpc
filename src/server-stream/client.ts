import * as grpc from '@grpc/grpc-js';
import { ServerStreamClient } from '../../proto/server-stream_grpc_pb';
import { Message } from '../../proto/server-stream_pb';

const client = new ServerStreamClient('localhost:50051', grpc.credentials.createInsecure());
const message  = new Message();

message.setId('1');
message.setSender('Client');
message.setContent('Sent me many messages!');
message.setTimestamp(new Date().toISOString());

const call = client.sendMessage(message);
let count = 0;

call.on('data', (response) => {
    console.log('Receive:', response.toObject());
});

call.on('error', (err) => {
    console.error('Erro no servidor:', err);
});

call.on('end', () => {
    console.log('Stream encerrado pelo servidor!');
});