// package: com.kevinh.server.v1
// file: com/kevinh/server/v1/language.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Language extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Language.AsObject;
    static toObject(includeInstance: boolean, msg: Language): Language.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Language, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Language;
    static deserializeBinaryFromReader(message: Language, reader: jspb.BinaryReader): Language;
}

export namespace Language {
    export type AsObject = {
    }

    export enum Code {
    CODE_UNSPECIFIED = 0,
    CODE_EN = 1,
    CODE_FA = 2,
    }

}
