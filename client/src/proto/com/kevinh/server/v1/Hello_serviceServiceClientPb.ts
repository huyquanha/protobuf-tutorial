/**
 * @fileoverview gRPC-Web generated client stub for com.kevinh.server.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as com_kevinh_server_v1_hello_service_pb from '../../../../com/kevinh/server/v1/hello_service_pb';


export class HelloServiceClient {
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

  methodDescriptorGreet = new grpcWeb.MethodDescriptor(
    '/com.kevinh.server.v1.HelloService/Greet',
    grpcWeb.MethodType.UNARY,
    com_kevinh_server_v1_hello_service_pb.GreetRequest,
    com_kevinh_server_v1_hello_service_pb.GreetResponse,
    (request: com_kevinh_server_v1_hello_service_pb.GreetRequest) => {
      return request.serializeBinary();
    },
    com_kevinh_server_v1_hello_service_pb.GreetResponse.deserializeBinary
  );

  greet(
    request: com_kevinh_server_v1_hello_service_pb.GreetRequest,
    metadata: grpcWeb.Metadata | null): Promise<com_kevinh_server_v1_hello_service_pb.GreetResponse>;

  greet(
    request: com_kevinh_server_v1_hello_service_pb.GreetRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: com_kevinh_server_v1_hello_service_pb.GreetResponse) => void): grpcWeb.ClientReadableStream<com_kevinh_server_v1_hello_service_pb.GreetResponse>;

  greet(
    request: com_kevinh_server_v1_hello_service_pb.GreetRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: com_kevinh_server_v1_hello_service_pb.GreetResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/com.kevinh.server.v1.HelloService/Greet',
        request,
        metadata || {},
        this.methodDescriptorGreet,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/com.kevinh.server.v1.HelloService/Greet',
    request,
    metadata || {},
    this.methodDescriptorGreet);
  }

}

