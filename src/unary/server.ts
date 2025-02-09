

import * as grpc from '@grpc/grpc-js';
import { ChatService, IChatServer } from '../../proto/chat_grpc_pb';
import { Message, Response } from '../../proto/chat_pb';

const server = new grpc.Server();

const chatService: IChatServer = {
    sendMessage: function (call: grpc.ServerUnaryCall<Message, Response>, callback: grpc.sendUnaryData<Response>): void {
        const objectMessage = call.request;
        const response = new Response();

        if (!objectMessage.getContent()) {
            response.setMessage("Message empty");
            response.setStatus(false);
            
            callback(null, response);
            return;
        }
        
        response.setMessage(`[Server] Receive your message!`);
        response.setStatus(true);
        callback(null, response);
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







