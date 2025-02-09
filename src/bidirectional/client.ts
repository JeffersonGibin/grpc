import * as grpc from '@grpc/grpc-js';
import { ServerBidirectionalClient } from '../../proto/bidirectional_grpc_pb';
import { Message } from '../../proto/bidirectional_pb';

const client = new ServerBidirectionalClient('localhost:50051', grpc.credentials.createInsecure());
const call = client.sendMessage();

call.on('data', (response) => {
    console.log(`Response from server: ${response.getMessage()}`);
});

call.on('error', (err) => {
    console.error('Error client:', err);
});

call.on('end', () => {
    console.log('Server finished the stream');
    process.exit(0);
});

const messages = [
    { id: '1', sender: 'Client', content: 'Message 1', timestamp: new Date().toISOString() },
    { id: '2', sender: 'Client', content: 'Message 2', timestamp: new Date().toISOString() },
    { id: '3', sender: 'Client', content: 'Message 3', timestamp: new Date().toISOString() }
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
