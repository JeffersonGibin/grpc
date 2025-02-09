import * as grpc from '@grpc/grpc-js';
import { Message, Response } from '../../proto/client-stream_pb';
import { StreamClient } from '../../proto/client-stream_grpc_pb';

const client = new StreamClient('localhost:50051', grpc.credentials.createInsecure());
const call = client.sendMessage((err, response) => {
    if(err) {
        console.error('Error from server:', err);
    } else {
        console.log('Response from server:', response.getMessage());
        process.exit(0);
    }
});

const messages = [
    { id: '1', sender: 'Client', content: 'Message 1', timestamp: new Date().toISOString() },
    { id: '2', sender: 'Client', content: 'Message 2', timestamp: new Date().toISOString() },
    { id: '3', sender: 'Client', content: 'Message 3', timestamp: new Date().toISOString() },
];

messages.forEach(msg => {
    const message = new Message();
    message.setId(msg.id);
    message.setSender(msg.sender);
    message.setContent(msg.content);
    message.setTimestamp(msg.timestamp);

    call.write(message);
});

call.end();