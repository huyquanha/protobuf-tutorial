import React, { useEffect } from 'react';
import * as grpcWeb from 'grpc-web';
import logo from './logo.svg';
import './App.css';
import { HelloServiceClient } from './proto/com/kevinh/server/v1/Hello_serviceServiceClientPb';
import { GreetRequest } from './proto/com/kevinh/server/v1/hello_service_pb';
import { Language } from './proto/com/kevinh/server/v1/language_pb';
import { GreeterClient } from './proto/com/kevinh/server2/v1/HelloworldServiceClientPb';
import { HelloRequest } from './proto/com/kevinh/server2/v1/helloworld_pb';

function App() {
  const helloClient = new HelloServiceClient('http://localhost:8080/hello');
  const greetClient = new GreeterClient('http://localhost:8080/greet');

  const greet = async () => {
    const helloRequest = new GreetRequest();
    helloRequest.setName('Kevin');
    helloRequest.setLanguageCode(Language.Code.CODE_FA);

    const greetRequest = new HelloRequest();
    greetRequest.setName('Awesome');
    try {
      const helloRes = await helloClient.greet(helloRequest, {});
      console.log(helloRes.getGreeting());

      const greetRes = await greetClient.sayHello(greetRequest, {});
      console.log(greetRes.getMessage());
    } catch (err: unknown) {
      const error = err as grpcWeb.RpcError;
      if (error.code !== grpcWeb.StatusCode.OK) {
        console.log(`Error ${error} occurred`);
      }
    }
  };

  useEffect(() => {
    greet();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Open console to see the log!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
