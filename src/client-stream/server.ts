import * as grpc from '@grpc/grpc-js';
import {IStreamServer, StreamService } from '../../proto/client-stream_grpc_pb';
import { Message, Response } from '../../proto/client-stream_pb';

const server = new grpc.Server();
const streamService: IStreamServer = {
    sendMessage: function (call: grpc.ServerReadableStream<Message, Response>, callback: grpc.sendUnaryData<Response>): void {
        let response = new Response();
        let count = 0;

        call.on('data', (message) => {
            console.log('Received:', message.getContent());
            count++;
        });

        call.on('end', () => {
            response.setMessage(`The server receive ${count} messages!`);
            response.setStatus(true);
            
            callback(null, response);
        });
    }
};

server.addService(StreamService as unknown as grpc.ServiceDefinition<grpc.UntypedServiceImplementation>, streamService);

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Error server gRPC:', err);
        return;
    }
    console.log(`Server gRPC working on ${port}`);
});