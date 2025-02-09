

import * as grpc from '@grpc/grpc-js';
import { ChatService, IChatServer } from '../../proto/chat_grpc_pb';
import { Message } from '../../proto/chat_pb';

const server = new grpc.Server();

const chatService: IChatServer = {
    sendMessage: function (call: grpc.ServerUnaryCall<Message, Message>, callback: grpc.sendUnaryData<Message>): void {
        const objectMessage = call.request;

        console.log(objectMessage.toObject());
        
        const messageResponse = new Message();
        messageResponse.setTimestamp(new Date().toISOString());
        messageResponse.setSender("Server");

        if (!objectMessage.getContent()) {
            messageResponse.setId("0");
            messageResponse.setContent("Message empty");
            
            callback(null, messageResponse);
            return;
        }
        
        messageResponse.setId("1");
        messageResponse.setContent(`Hello Client!`);
        callback(null, messageResponse);
    }
};

server.addService(
    ChatService as unknown as grpc.ServiceDefinition<grpc.UntypedServiceImplementation>,
    chatService
);

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Error server gRPC:', err);
        return;
    }
    console.log(`Server gRPC working on ${port}`);
});







