// package: com.kevinh.server.v1
// file: com/kevinh/server/v1/hello_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as com_kevinh_server_v1_hello_service_pb from "../../../../com/kevinh/server/v1/hello_service_pb";
import * as com_kevinh_server_v1_language_pb from "../../../../com/kevinh/server/v1/language_pb";

interface IHelloServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    greet: IHelloServiceService_IGreet;
}

interface IHelloServiceService_IGreet extends grpc.MethodDefinition<com_kevinh_server_v1_hello_service_pb.GreetRequest, com_kevinh_server_v1_hello_service_pb.GreetResponse> {
    path: "/com.kevinh.server.v1.HelloService/Greet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_kevinh_server_v1_hello_service_pb.GreetRequest>;
    requestDeserialize: grpc.deserialize<com_kevinh_server_v1_hello_service_pb.GreetRequest>;
    responseSerialize: grpc.serialize<com_kevinh_server_v1_hello_service_pb.GreetResponse>;
    responseDeserialize: grpc.deserialize<com_kevinh_server_v1_hello_service_pb.GreetResponse>;
}

export const HelloServiceService: IHelloServiceService;

export interface IHelloServiceServer extends grpc.UntypedServiceImplementation {
    greet: grpc.handleUnaryCall<com_kevinh_server_v1_hello_service_pb.GreetRequest, com_kevinh_server_v1_hello_service_pb.GreetResponse>;
}

export interface IHelloServiceClient {
    greet(request: com_kevinh_server_v1_hello_service_pb.GreetRequest, callback: (error: grpc.ServiceError | null, response: com_kevinh_server_v1_hello_service_pb.GreetResponse) => void): grpc.ClientUnaryCall;
    greet(request: com_kevinh_server_v1_hello_service_pb.GreetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_kevinh_server_v1_hello_service_pb.GreetResponse) => void): grpc.ClientUnaryCall;
    greet(request: com_kevinh_server_v1_hello_service_pb.GreetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_kevinh_server_v1_hello_service_pb.GreetResponse) => void): grpc.ClientUnaryCall;
}

export class HelloServiceClient extends grpc.Client implements IHelloServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public greet(request: com_kevinh_server_v1_hello_service_pb.GreetRequest, callback: (error: grpc.ServiceError | null, response: com_kevinh_server_v1_hello_service_pb.GreetResponse) => void): grpc.ClientUnaryCall;
    public greet(request: com_kevinh_server_v1_hello_service_pb.GreetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_kevinh_server_v1_hello_service_pb.GreetResponse) => void): grpc.ClientUnaryCall;
    public greet(request: com_kevinh_server_v1_hello_service_pb.GreetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_kevinh_server_v1_hello_service_pb.GreetResponse) => void): grpc.ClientUnaryCall;
}
