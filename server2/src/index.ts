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

// With Docker bridge networking, 
// When running inside Docker, "server" and "server2" are granted 2 different IP addresses by docker0
// network interface. Therefore, 0.0.0.0:4000 wouldn't work here.
// If we replace 0.0.0.0 with the actual IP address granted by Docker to "server" i.e 172.17.0.2
// then it works. My understanding: 0.0.0.0 represents the docker0 network interface,
// but nothing is listening on port 4000 at that address. "server" is litening on 172.17.0.2:4000.
const client = new HelloServiceClient('host.docker.internal:4000', ChannelCredentials.createInsecure(), undefined);

const sayHello = (
    call: ServerUnaryCall<HelloRequest, HelloReply>,
    callback: sendUnaryData<HelloReply>
) => {
    // An example of making a request to another RPC service.
    var greetRequest = new GreetRequest();
    greetRequest.setName('Hola');
    const response = new HelloReply();
    response.setMessage(`Hi there, ${call.request.getName()}`);
    callback(null, response);
    client.greet(greetRequest, (err, res) => {
      if (err && err.code !== Status.OK) {
        console.log(`[${err.code}]: ${err.message}`);
        return callback(err, null);
      }
      console.log(res.getGreeting());
      const response = new HelloReply();
      response.setMessage(`Hi there, ${call.request.getName()}`);
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