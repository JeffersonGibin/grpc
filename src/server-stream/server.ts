
import * as grpc from '@grpc/grpc-js';
import { ServerStreamService, IServerStreamServer } from '../../proto/server-stream_grpc_pb';
import { Message } from '../../proto/server-stream_pb';

const server = new grpc.Server();

const serverStream: IServerStreamServer = {
    sendMessage: function (call: grpc.ServerWritableStream<Message, Message>): void {
        const objectMessage = call.request;

        console.log(objectMessage.toObject());

        const messageResponse = new Message();
        messageResponse.setTimestamp(new Date().toISOString());
        messageResponse.setSender("Server");

        if (!objectMessage.getContent()) {
            messageResponse.setId("0");
            messageResponse.setContent("Message empty");

            call.write(messageResponse);
            call.end();
            return;
        }

        for (let i = 0; i < 5000; i++) {
            messageResponse.setId(`${i}`);
            messageResponse.setContent(`Hello Server (${i})`);
            call.write(messageResponse);
        }

        call.end(); 
    }
};

server.addService(
    ServerStreamService as unknown as grpc.ServiceDefinition<grpc.UntypedServiceImplementation>,
    serverStream
);

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('[Server Stream]: Error server gRPC:', err);
        return;
    }
    console.log(`[Server Stream]: Server gRPC on running ${port}`);
});