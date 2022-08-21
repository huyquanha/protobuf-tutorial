// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var com_kevinh_server2_v1_helloworld_pb = require('../../../../com/kevinh/server2/v1/helloworld_pb.js');

function serialize_com_kevinh_server2_v1_HelloReply(arg) {
  if (!(arg instanceof com_kevinh_server2_v1_helloworld_pb.HelloReply)) {
    throw new Error('Expected argument of type com.kevinh.server2.v1.HelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_kevinh_server2_v1_HelloReply(buffer_arg) {
  return com_kevinh_server2_v1_helloworld_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_kevinh_server2_v1_HelloRequest(arg) {
  if (!(arg instanceof com_kevinh_server2_v1_helloworld_pb.HelloRequest)) {
    throw new Error('Expected argument of type com.kevinh.server2.v1.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_kevinh_server2_v1_HelloRequest(buffer_arg) {
  return com_kevinh_server2_v1_helloworld_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreeterService = exports.GreeterService = {
  sayHello: {
    path: '/com.kevinh.server2.v1.Greeter/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: com_kevinh_server2_v1_helloworld_pb.HelloRequest,
    responseType: com_kevinh_server2_v1_helloworld_pb.HelloReply,
    requestSerialize: serialize_com_kevinh_server2_v1_HelloRequest,
    requestDeserialize: deserialize_com_kevinh_server2_v1_HelloRequest,
    responseSerialize: serialize_com_kevinh_server2_v1_HelloReply,
    responseDeserialize: deserialize_com_kevinh_server2_v1_HelloReply,
  },
};

exports.GreeterClient = grpc.makeGenericClientConstructor(GreeterService);
