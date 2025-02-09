// package: chat
// file: chat.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as chat_pb from "./chat_pb";

interface IChatService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sendMessage: IChatService_ISendMessage;
}

interface IChatService_ISendMessage extends grpc.MethodDefinition<chat_pb.Message, chat_pb.Message> {
    path: "/chat.Chat/SendMessage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<chat_pb.Message>;
    requestDeserialize: grpc.deserialize<chat_pb.Message>;
    responseSerialize: grpc.serialize<chat_pb.Message>;
    responseDeserialize: grpc.deserialize<chat_pb.Message>;
}

export const ChatService: IChatService;

export interface IChatServer extends grpc.UntypedServiceImplementation {
    sendMessage: grpc.handleUnaryCall<chat_pb.Message, chat_pb.Message>;
}

export interface IChatClient {
    sendMessage(request: chat_pb.Message, callback: (error: grpc.ServiceError | null, response: chat_pb.Message) => void): grpc.ClientUnaryCall;
    sendMessage(request: chat_pb.Message, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.Message) => void): grpc.ClientUnaryCall;
    sendMessage(request: chat_pb.Message, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.Message) => void): grpc.ClientUnaryCall;
}

export class ChatClient extends grpc.Client implements IChatClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public sendMessage(request: chat_pb.Message, callback: (error: grpc.ServiceError | null, response: chat_pb.Message) => void): grpc.ClientUnaryCall;
    public sendMessage(request: chat_pb.Message, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.Message) => void): grpc.ClientUnaryCall;
    public sendMessage(request: chat_pb.Message, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.Message) => void): grpc.ClientUnaryCall;
}
