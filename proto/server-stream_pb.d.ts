// package: serverStream
// file: server-stream.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Message extends jspb.Message { 
    getId(): string;
    setId(value: string): Message;
    getSender(): string;
    setSender(value: string): Message;
    getContent(): string;
    setContent(value: string): Message;
    getTimestamp(): string;
    setTimestamp(value: string): Message;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Message.AsObject;
    static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Message;
    static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
    export type AsObject = {
        id: string,
        sender: string,
        content: string,
        timestamp: string,
    }
}
