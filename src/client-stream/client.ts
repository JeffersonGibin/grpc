import * as grpc from '@grpc/grpc-js';
import { Message } from '../../proto/client-stream_pb';
import { StreamClient } from '../../proto/client-stream_grpc_pb';

const client = new StreamClient('localhost:50051', grpc.credentials.createInsecure());
const call = client.sendMessage((err, response) => {
    if (err) {
        console.error('Error from server:', err);
    } else {
        console.log(response.toObject());
        process.exit(0);
    }
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