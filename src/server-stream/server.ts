
import * as grpc from '@grpc/grpc-js';
import { ServerStreamService, IServerStreamServer } from '../../proto/server-stream_grpc_pb';
import { Message, Response } from '../../proto/server-stream_pb';

const server = new grpc.Server();

const serverStream: IServerStreamServer = {
    sendMessage: function (call: grpc.ServerWritableStream<Message, Response>): void {
        const objectMessage = call.request;
        const response = new Response();

        console.log("Payload Client", objectMessage.toObject());

        if (!objectMessage.getContent()) {
            const response = new Response();
            response.setMessage("Message empty");
            response.setStatus(false);
            call.write(response);
            call.end();
            return;
        }

        for (let i = 0; i < 5000; i++) {
            response.setMessage(`Message ${i}`);
            response.setStatus(true);
            call.write(response);
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
        console.error('Error server gRPC:', err);
        return;
    }
    console.log(`Server gRPC working on ${port}`);
});
