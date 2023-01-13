import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from 'react-redux';
import store from './store';

import { Anchor } from "../node_modules/ual-anchor/dist";

import { Wax } from "../node_modules/@eosdacio/ual-wax/dist";

import { UALProvider, withUAL } from 'ual-reactjs-renderer'

const myChain = {
  chainId: "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "wax-testnet.eosphere.io",
      port: "443",
    },
  ],
};

const anchor = new Anchor([myChain], { appName: "cpu4" });
const wax = new Wax([myChain], { appName: "cpu4" });

const MyUALConsumer = withUAL(App);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(  
  <React.StrictMode>
    <Provider store={store}>
    <UALProvider
      chains={[myChain]}
      authenticators={[wax, anchor]}
      appName={"cpu4"}
    >
      <MyUALConsumer />
    </UALProvider>
    </Provider>
  </React.StrictMode>  
);