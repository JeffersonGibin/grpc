import fs from 'fs';
import * as grpc from '@grpc/grpc-js';
import { ChatClient } from '../../proto/chat_grpc_pb';
import { Message } from '../../proto/chat_pb';

const credentials = grpc.credentials.createSsl(
    fs.readFileSync('./certs/ca.crt'), 
    fs.readFileSync('./certs/client.key'), 
    fs.readFileSync('./certs/client.crt')
);

const client = new ChatClient(
    'localhost:50051',
    credentials
);

const message  = new Message();
message.setId('1');
message.setSender('Client');
message.setContent('Hello Server!');
message.setTimestamp(new Date().toISOString());

client.sendMessage(message, (err, response) => {
    if(err) {
        console.error('Error from server:', err);
    } else {
        console.log(response.toObject());
        process.exit(0);
    }
});
