"use strict";
/**
 * @fileoverview gRPC-Web generated client stub for com.kevinh.server2.v1
 * @enhanceable
 * @public
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreeterClient = void 0;
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck
const grpcWeb = __importStar(require("grpc-web"));
const com_kevinh_server2_v1_helloworld_pb = __importStar(require("../../../../com/kevinh/server2/v1/helloworld_pb"));
class GreeterClient {
    constructor(hostname, credentials, options) {
        this.methodDescriptorSayHello = new grpcWeb.MethodDescriptor('/com.kevinh.server2.v1.Greeter/SayHello', grpcWeb.MethodType.UNARY, com_kevinh_server2_v1_helloworld_pb.HelloRequest, com_kevinh_server2_v1_helloworld_pb.HelloReply, (request) => {
            return request.serializeBinary();
        }, com_kevinh_server2_v1_helloworld_pb.HelloReply.deserializeBinary);
        if (!options)
            options = {};
        if (!credentials)
            credentials = {};
        options['format'] = 'text';
        this.client_ = new grpcWeb.GrpcWebClientBase(options);
        this.hostname_ = hostname;
        this.credentials_ = credentials;
        this.options_ = options;
    }
    sayHello(request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/com.kevinh.server2.v1.Greeter/SayHello', request, metadata || {}, this.methodDescriptorSayHello, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/com.kevinh.server2.v1.Greeter/SayHello', request, metadata || {}, this.methodDescriptorSayHello);
    }
}
exports.GreeterClient = GreeterClient;
