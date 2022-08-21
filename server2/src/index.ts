import {
  ChannelCredentials,
  sendUnaryData,
  Server,
  ServerCredentials,
  ServerUnaryCall,
} from '@grpc/grpc-js';

import { HelloRequest, HelloReply } from '../../server2_client/build/proto/com/kevinh/server2/v1/helloworld_pb';
import { GreeterService, IGreeterServer} from '../../server2_client/build/proto/com/kevinh/server2/v1/helloworld_grpc_pb';
import { GreetRequest } from '../../server_client/build/proto/com/kevinh/server/v1/hello_service_pb';
import { HelloServiceClient } from '../../server_client/build/proto/com/kevinh/server/v1/hello_service_grpc_pb';
import { Status } from '@grpc/grpc-js/build/src/constants';

const client = new HelloServiceClient('0.0.0.0:4000', ChannelCredentials.createInsecure(), undefined);

const sayHello = (
    call: ServerUnaryCall<HelloRequest, HelloReply>,
    callback: sendUnaryData<HelloReply>
) => {
    // An example of making a request to another RPC service.
    var greetRequest = new GreetRequest();
    greetRequest.setName('Hola');
    client.greet(greetRequest, (err, res) => {
      if (err && err.code !== Status.OK) {
        console.log(`[${err.code}]: ${err.message}`);
        return callback(err, null);
      }
      console.log(res.getGreeting());
      const response = new HelloReply();
      response.setMessage(`Hello there, ${call.request.getName()}`);
      callback(null, response);
    });
};

const helloService: IGreeterServer = {sayHello};

const server = new Server();
server.addService(GreeterService, helloService)

server.bindAsync('0.0.0.0:4001', ServerCredentials.createInsecure(), () => {
  server.start();
  var greetRequest = new GreetRequest();
  greetRequest.setName('KEVVVV');
  client.greet(greetRequest, (err, res) => {
    if (err && err.code !== Status.OK) {
      console.log(`[${err.code}]: ${err.message}`);
      return;
    }
    console.log(res.getGreeting());
  });
  console.log('server is running on 0.0.0.0:4001');
});