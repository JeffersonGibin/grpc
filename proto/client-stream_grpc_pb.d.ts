// package: stream
// file: client-stream.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as client_stream_pb from "./client-stream_pb";

interface IStreamService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sendMessage: IStreamService_ISendMessage;
}

interface IStreamService_ISendMessage extends grpc.MethodDefinition<client_stream_pb.Message, client_stream_pb.Response> {
    path: "/stream.Stream/SendMessage";
    requestStream: true;
    responseStream: false;
    requestSerialize: grpc.serialize<client_stream_pb.Message>;
    requestDeserialize: grpc.deserialize<client_stream_pb.Message>;
    responseSerialize: grpc.serialize<client_stream_pb.Response>;
    responseDeserialize: grpc.deserialize<client_stream_pb.Response>;
}

export const StreamService: IStreamService;

export interface IStreamServer extends grpc.UntypedServiceImplementation {
    sendMessage: grpc.handleClientStreamingCall<client_stream_pb.Message, client_stream_pb.Response>;
}

export interface IStreamClient {
    sendMessage(callback: (error: grpc.ServiceError | null, response: client_stream_pb.Response) => void): grpc.ClientWritableStream<client_stream_pb.Message>;
    sendMessage(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: client_stream_pb.Response) => void): grpc.ClientWritableStream<client_stream_pb.Message>;
    sendMessage(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: client_stream_pb.Response) => void): grpc.ClientWritableStream<client_stream_pb.Message>;
    sendMessage(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: client_stream_pb.Response) => void): grpc.ClientWritableStream<client_stream_pb.Message>;
}

export class StreamClient extends grpc.Client implements IStreamClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public sendMessage(callback: (error: grpc.ServiceError | null, response: client_stream_pb.Response) => void): grpc.ClientWritableStream<client_stream_pb.Message>;
    public sendMessage(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: client_stream_pb.Response) => void): grpc.ClientWritableStream<client_stream_pb.Message>;
    public sendMessage(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: client_stream_pb.Response) => void): grpc.ClientWritableStream<client_stream_pb.Message>;
    public sendMessage(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: client_stream_pb.Response) => void): grpc.ClientWritableStream<client_stream_pb.Message>;
}
