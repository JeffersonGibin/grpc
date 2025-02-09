import * as grpc from '@grpc/grpc-js';
import { ChatClient } from '../../proto/chat_grpc_pb';
import { Message } from '../../proto/chat_pb';

const client = new ChatClient('localhost:50051', grpc.credentials.createInsecure());
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
