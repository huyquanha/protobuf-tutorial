import {
  sendUnaryData,
  Server,
  ServerCredentials,
  ServerUnaryCall,
} from '@grpc/grpc-js';

import { Language } from '../../server_client/build/proto/com/kevinh/server/v1/language_pb';
import {
    GreetRequest,
    GreetResponse,
} from '../../server_client/build/proto/com/kevinh/server/v1/hello_service_pb';
import {HelloServiceService, IHelloServiceServer} from '../../server_client/build/proto/com/kevinh/server/v1/hello_service_grpc_pb';
import { add } from '../../utils/calculator/build';

const greet = (
    call: ServerUnaryCall<GreetRequest, GreetResponse>,
    callback: sendUnaryData<GreetResponse>
) => {
    const response = new GreetResponse();

    switch (call.request.getLanguageCode()) {
        case Language.Code.CODE_FA:
            response.setGreeting(`سلام، ${call.request.getName()}`);
            break;
        case Language.Code.CODE_UNSPECIFIED:
        case Language.Code.CODE_EN:
        default:
            response.setGreeting(`Hello there, ${call.request.getName()}`);
    }

    callback(null, response);
};

const helloService: IHelloServiceServer = {greet};

const server = new Server();
server.addService(HelloServiceService, helloService)

server.bindAsync('0.0.0.0:4000', ServerCredentials.createInsecure(), () => {
  server.start();
  console.log(`1 + 2 is: ${add(1, 2)}`);
  console.log('server is running on 0.0.0.0:4000');
});