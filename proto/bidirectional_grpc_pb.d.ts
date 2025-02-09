// package: bidirectional
// file: bidirectional.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as bidirectional_pb from "./bidirectional_pb";

interface IServerBidirectionalService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sendMessage: IServerBidirectionalService_ISendMessage;
}

interface IServerBidirectionalService_ISendMessage extends grpc.MethodDefinition<bidirectional_pb.Message, bidirectional_pb.Message> {
    path: "/bidirectional.ServerBidirectional/SendMessage";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<bidirectional_pb.Message>;
    requestDeserialize: grpc.deserialize<bidirectional_pb.Message>;
    responseSerialize: grpc.serialize<bidirectional_pb.Message>;
    responseDeserialize: grpc.deserialize<bidirectional_pb.Message>;
}

export const ServerBidirectionalService: IServerBidirectionalService;

export interface IServerBidirectionalServer extends grpc.UntypedServiceImplementation {
    sendMessage: grpc.handleBidiStreamingCall<bidirectional_pb.Message, bidirectional_pb.Message>;
}

export interface IServerBidirectionalClient {
    sendMessage(): grpc.ClientDuplexStream<bidirectional_pb.Message, bidirectional_pb.Message>;
    sendMessage(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<bidirectional_pb.Message, bidirectional_pb.Message>;
    sendMessage(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<bidirectional_pb.Message, bidirectional_pb.Message>;
}

export class ServerBidirectionalClient extends grpc.Client implements IServerBidirectionalClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public sendMessage(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<bidirectional_pb.Message, bidirectional_pb.Message>;
    public sendMessage(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<bidirectional_pb.Message, bidirectional_pb.Message>;
}
