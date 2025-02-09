import * as grpc from '@grpc/grpc-js';
import {IStreamServer, StreamService } from '../../proto/client-stream_grpc_pb';
import { Message } from '../../proto/client-stream_pb';

const server = new grpc.Server();
const streamService: IStreamServer = {
    sendMessage: function (call: grpc.ServerReadableStream<Message, Message>, callback: grpc.sendUnaryData<Message>): void {
        const messageResponse = new Message();
        let count = 0;

        call.on('data', (message) => {
            console.log(message.toObject());
            count++;
        });

        call.on('end', () => {
            messageResponse.setId('0');
            messageResponse.setContent(`The server receive ${count} messages!`);
            messageResponse.setTimestamp(new Date().toISOString());
            messageResponse.setSender('Server');

            callback(null, messageResponse);
        });
    }
};

server.addService(StreamService as unknown as grpc.ServiceDefinition<grpc.UntypedServiceImplementation>, streamService);

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('[client Stream]: Error server gRPC:', err);
        return;
    }
    console.log(`[client Stream]: Server gRPC on running ${port}`);
});