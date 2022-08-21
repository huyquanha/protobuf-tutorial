// package: com.kevinh.server.v1
// file: com/kevinh/server/v1/hello_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as com_kevinh_server_v1_language_pb from "../../../../com/kevinh/server/v1/language_pb";

export class GreetRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): GreetRequest;
    getLanguageCode(): com_kevinh_server_v1_language_pb.Language.Code;
    setLanguageCode(value: com_kevinh_server_v1_language_pb.Language.Code): GreetRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GreetRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GreetRequest): GreetRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GreetRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GreetRequest;
    static deserializeBinaryFromReader(message: GreetRequest, reader: jspb.BinaryReader): GreetRequest;
}

export namespace GreetRequest {
    export type AsObject = {
        name: string,
        languageCode: com_kevinh_server_v1_language_pb.Language.Code,
    }
}

export class GreetResponse extends jspb.Message { 
    getGreeting(): string;
    setGreeting(value: string): GreetResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GreetResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GreetResponse): GreetResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GreetResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GreetResponse;
    static deserializeBinaryFromReader(message: GreetResponse, reader: jspb.BinaryReader): GreetResponse;
}

export namespace GreetResponse {
    export type AsObject = {
        greeting: string,
    }
}
