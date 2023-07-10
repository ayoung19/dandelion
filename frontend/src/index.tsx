import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";
import { App } from "./App";
import { TokenAuthenticator } from "./auth/TokenAuthenticator";

const stytch = new StytchUIClient(
  process.env.REACT_APP_STYTCH_PUBLIC_TOKEN || ""
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <StytchProvider stytch={stytch}>
      <TokenAuthenticator>
        <App />
      </TokenAuthenticator>
    </StytchProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
