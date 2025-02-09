import * as grpc from '@grpc/grpc-js';
import { ServerBidirectionalService, IServerBidirectionalServer  } from '../../proto/bidirectional_grpc_pb';
import { Message } from '../../proto/bidirectional_pb';

const server = new grpc.Server();

const serverBidirectional: IServerBidirectionalServer = {
    sendMessage: (call) => {
        call.on('data', (message: Message) => {
            console.log(message.toObject());
        });

        call.on('end', () => {
            console.log('finished the stream');
        });

        call.on('error', (err) => {
            console.error('Error stream bidirecional:', err);
        });

        for (let i = 0; i < 5_000; i++) {
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
    }
};


server.addService(
    ServerBidirectionalService as unknown as grpc.ServiceDefinition<grpc.UntypedServiceImplementation>,
    serverBidirectional
);

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('[Bidirectional]: Error server gRPC:', err);
        return;
    }
    console.log(`[Bidirectional]: Server gRPC on running ${port}`);
});