import * as grpc from '@grpc/grpc-js';
import { ServerBidirectionalService, IServerBidirectionalServer  } from '../../proto/bidirectional_grpc_pb';
import { Message, Response } from '../../proto/bidirectional_pb';

const server = new grpc.Server();

const serverBidirectional: IServerBidirectionalServer = {
    sendMessage: (call) => {

        const receivedMessages: Message[] = [];

        call.on('data', (message: Message) => {
            console.log(`Receive from client: ${message.getContent()} of ${message.getSender()}`);
            receivedMessages.push(message);
        });

        call.on('end', () => {
            const messages = [
                { id: '1', sender: 'server', content: 'Message 1', timestamp: new Date().toISOString() },
                { id: '2', sender: 'server', content: 'Message 2', timestamp: new Date().toISOString() },
                { id: '3', sender: 'server', content: 'Message 3', timestamp: new Date().toISOString() }
            ];

            messages.forEach(msg => {
                const response = new Response();
                response.setStatus(true);
                response.setMessage(`Server received: ${msg.content}`);
                response.setDataList([msg.id]);
                
                call.write(response);
            });

            call.end(); 
        });

        call.on('error', (err) => {
            console.error('Error stream bidirecional:', err);
        });
    }
};


server.addService(
    ServerBidirectionalService as unknown as grpc.ServiceDefinition<grpc.UntypedServiceImplementation>,
    serverBidirectional
);

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Error server gRPC:', err);
        return;
    }
    console.log(`Server gRPC working on ${port}`);
});