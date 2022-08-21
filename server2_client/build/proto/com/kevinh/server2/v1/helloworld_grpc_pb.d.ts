// package: com.kevinh.server2.v1
// file: com/kevinh/server2/v1/helloworld.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as com_kevinh_server2_v1_helloworld_pb from "../../../../com/kevinh/server2/v1/helloworld_pb";

interface IGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sayHello: IGreeterService_ISayHello;
}

interface IGreeterService_ISayHello extends grpc.MethodDefinition<com_kevinh_server2_v1_helloworld_pb.HelloRequest, com_kevinh_server2_v1_helloworld_pb.HelloReply> {
    path: "/com.kevinh.server2.v1.Greeter/SayHello";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_kevinh_server2_v1_helloworld_pb.HelloRequest>;
    requestDeserialize: grpc.deserialize<com_kevinh_server2_v1_helloworld_pb.HelloRequest>;
    responseSerialize: grpc.serialize<com_kevinh_server2_v1_helloworld_pb.HelloReply>;
    responseDeserialize: grpc.deserialize<com_kevinh_server2_v1_helloworld_pb.HelloReply>;
}

export const GreeterService: IGreeterService;

export interface IGreeterServer extends grpc.UntypedServiceImplementation {
    sayHello: grpc.handleUnaryCall<com_kevinh_server2_v1_helloworld_pb.HelloRequest, com_kevinh_server2_v1_helloworld_pb.HelloReply>;
}

export interface IGreeterClient {
    sayHello(request: com_kevinh_server2_v1_helloworld_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: com_kevinh_server2_v1_helloworld_pb.HelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: com_kevinh_server2_v1_helloworld_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_kevinh_server2_v1_helloworld_pb.HelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: com_kevinh_server2_v1_helloworld_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_kevinh_server2_v1_helloworld_pb.HelloReply) => void): grpc.ClientUnaryCall;
}

export class GreeterClient extends grpc.Client implements IGreeterClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public sayHello(request: com_kevinh_server2_v1_helloworld_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: com_kevinh_server2_v1_helloworld_pb.HelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: com_kevinh_server2_v1_helloworld_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_kevinh_server2_v1_helloworld_pb.HelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: com_kevinh_server2_v1_helloworld_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_kevinh_server2_v1_helloworld_pb.HelloReply) => void): grpc.ClientUnaryCall;
}
