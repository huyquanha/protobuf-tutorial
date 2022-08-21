// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var com_kevinh_server_v1_hello_service_pb = require('../../../../com/kevinh/server/v1/hello_service_pb.js');
var com_kevinh_server_v1_language_pb = require('../../../../com/kevinh/server/v1/language_pb.js');

function serialize_com_kevinh_server_v1_GreetRequest(arg) {
  if (!(arg instanceof com_kevinh_server_v1_hello_service_pb.GreetRequest)) {
    throw new Error('Expected argument of type com.kevinh.server.v1.GreetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_kevinh_server_v1_GreetRequest(buffer_arg) {
  return com_kevinh_server_v1_hello_service_pb.GreetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_kevinh_server_v1_GreetResponse(arg) {
  if (!(arg instanceof com_kevinh_server_v1_hello_service_pb.GreetResponse)) {
    throw new Error('Expected argument of type com.kevinh.server.v1.GreetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_kevinh_server_v1_GreetResponse(buffer_arg) {
  return com_kevinh_server_v1_hello_service_pb.GreetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var HelloServiceService = exports.HelloServiceService = {
  greet: {
    path: '/com.kevinh.server.v1.HelloService/Greet',
    requestStream: false,
    responseStream: false,
    requestType: com_kevinh_server_v1_hello_service_pb.GreetRequest,
    responseType: com_kevinh_server_v1_hello_service_pb.GreetResponse,
    requestSerialize: serialize_com_kevinh_server_v1_GreetRequest,
    requestDeserialize: deserialize_com_kevinh_server_v1_GreetRequest,
    responseSerialize: serialize_com_kevinh_server_v1_GreetResponse,
    responseDeserialize: deserialize_com_kevinh_server_v1_GreetResponse,
  },
};

exports.HelloServiceClient = grpc.makeGenericClientConstructor(HelloServiceService);
