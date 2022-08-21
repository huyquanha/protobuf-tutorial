/**
 * @fileoverview gRPC-Web generated client stub for com.kevinh.server2.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as com_kevinh_server2_v1_helloworld_pb from '../../../../com/kevinh/server2/v1/helloworld_pb';


export class GreeterClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorSayHello = new grpcWeb.MethodDescriptor(
    '/com.kevinh.server2.v1.Greeter/SayHello',
    grpcWeb.MethodType.UNARY,
    com_kevinh_server2_v1_helloworld_pb.HelloRequest,
    com_kevinh_server2_v1_helloworld_pb.HelloReply,
    (request: com_kevinh_server2_v1_helloworld_pb.HelloRequest) => {
      return request.serializeBinary();
    },
    com_kevinh_server2_v1_helloworld_pb.HelloReply.deserializeBinary
  );

  sayHello(
    request: com_kevinh_server2_v1_helloworld_pb.HelloRequest,
    metadata: grpcWeb.Metadata | null): Promise<com_kevinh_server2_v1_helloworld_pb.HelloReply>;

  sayHello(
    request: com_kevinh_server2_v1_helloworld_pb.HelloRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: com_kevinh_server2_v1_helloworld_pb.HelloReply) => void): grpcWeb.ClientReadableStream<com_kevinh_server2_v1_helloworld_pb.HelloReply>;

  sayHello(
    request: com_kevinh_server2_v1_helloworld_pb.HelloRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: com_kevinh_server2_v1_helloworld_pb.HelloReply) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/com.kevinh.server2.v1.Greeter/SayHello',
        request,
        metadata || {},
        this.methodDescriptorSayHello,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/com.kevinh.server2.v1.Greeter/SayHello',
    request,
    metadata || {},
    this.methodDescriptorSayHello);
  }

}

