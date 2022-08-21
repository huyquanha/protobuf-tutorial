"use strict";
/**
 * @fileoverview gRPC-Web generated client stub for com.kevinh.server.v1
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
exports.HelloServiceClient = void 0;
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck
const grpcWeb = __importStar(require("grpc-web"));
const com_kevinh_server_v1_hello_service_pb = __importStar(require("../../../../com/kevinh/server/v1/hello_service_pb"));
class HelloServiceClient {
    constructor(hostname, credentials, options) {
        this.methodDescriptorGreet = new grpcWeb.MethodDescriptor('/com.kevinh.server.v1.HelloService/Greet', grpcWeb.MethodType.UNARY, com_kevinh_server_v1_hello_service_pb.GreetRequest, com_kevinh_server_v1_hello_service_pb.GreetResponse, (request) => {
            return request.serializeBinary();
        }, com_kevinh_server_v1_hello_service_pb.GreetResponse.deserializeBinary);
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
    greet(request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/com.kevinh.server.v1.HelloService/Greet', request, metadata || {}, this.methodDescriptorGreet, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/com.kevinh.server.v1.HelloService/Greet', request, metadata || {}, this.methodDescriptorGreet);
    }
}
exports.HelloServiceClient = HelloServiceClient;
