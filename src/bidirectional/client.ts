import * as grpc from '@grpc/grpc-js';
import { ServerBidirectionalClient } from '../../proto/bidirectional_grpc_pb';
import { Message } from '../../proto/bidirectional_pb';

const client = new ServerBidirectionalClient('localhost:50051', grpc.credentials.createInsecure());
const call = client.sendMessage();

call.on('data', (response) => {
    console.log(response.toObject());
});

call.on('error', (err) => {
    console.error('Error client:', err);
});

call.on('end', () => {
    console.log('Server finished the stream');
    process.exit(0);
});

for (let i = 0; i < 5000; i++) {
    const msg = { 
        id: `${i}`,
        sender: 'Client',
        content: `Hello Server (${i})`,
        timestamp: new Date().toISOString() 
    };

    const message = new Message();
    message.setId(msg.id);
    message.setSender(msg.sender);
    message.setContent(msg.content);
    message.setTimestamp(msg.timestamp);

    call.write(message);
}

call.end();
