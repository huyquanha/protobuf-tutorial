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

// http://localhost:4000 will fail, probably because GRPC uses a different protocol than http.
// localhost:4000 will actually work. It's different from 0.0.0.0 though, 
// read more here https://serverfault.com/questions/78048/whats-the-difference-between-ip-address-0-0-0-0-and-127-0-0-1
// Investigate more why we should use one over the other, or either is fine.
server.bindAsync('0.0.0.0:4000', ServerCredentials.createInsecure(), () => {
  server.start();
  console.log(`1 + 2 is: ${add(1, 2)}`);
  console.log('server is running on 0.0.0.0:4000');
});