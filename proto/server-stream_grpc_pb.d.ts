// package: serverStream
// file: server-stream.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as server_stream_pb from "./server-stream_pb";

interface IServerStreamService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sendMessage: IServerStreamService_ISendMessage;
}

interface IServerStreamService_ISendMessage extends grpc.MethodDefinition<server_stream_pb.Message, server_stream_pb.Response> {
    path: "/serverStream.ServerStream/SendMessage";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<server_stream_pb.Message>;
    requestDeserialize: grpc.deserialize<server_stream_pb.Message>;
    responseSerialize: grpc.serialize<server_stream_pb.Response>;
    responseDeserialize: grpc.deserialize<server_stream_pb.Response>;
}

export const ServerStreamService: IServerStreamService;

export interface IServerStreamServer extends grpc.UntypedServiceImplementation {
    sendMessage: grpc.handleServerStreamingCall<server_stream_pb.Message, server_stream_pb.Response>;
}

export interface IServerStreamClient {
    sendMessage(request: server_stream_pb.Message, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_stream_pb.Response>;
    sendMessage(request: server_stream_pb.Message, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_stream_pb.Response>;
}

export class ServerStreamClient extends grpc.Client implements IServerStreamClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public sendMessage(request: server_stream_pb.Message, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_stream_pb.Response>;
    public sendMessage(request: server_stream_pb.Message, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_stream_pb.Response>;
}
