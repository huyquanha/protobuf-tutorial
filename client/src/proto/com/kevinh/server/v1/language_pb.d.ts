import * as jspb from 'google-protobuf'



export class Language extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Language.AsObject;
  static toObject(includeInstance: boolean, msg: Language): Language.AsObject;
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

