import * as grpc from '@grpc/grpc-js';
import { ServerBidirectionalService, IServerBidirectionalServer  } from '../../proto/bidirectional_grpc_pb';
import { Message } from '../../proto/bidirectional_pb';

const server = new grpc.Server();

const serverBidirectional: IServerBidirectionalServer = {
    sendMessage: (call) => {

        const receivedMessages: Message[] = [];

        call.on('data', (message: Message) => {
            console.log(message.toObject());
            receivedMessages.push(message);
        });

        call.on('end', () => {
            for (let i = 0; i < 5000; i++) {
                const msg = { 
                    id: `${i}`,
                    sender: 'Server',
                    content: `Hello Client (${i})`,
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