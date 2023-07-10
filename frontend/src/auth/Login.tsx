import React from "react";
import { StytchLogin } from "@stytch/react";
import { OAuthProviders, Products } from "@stytch/vanilla-js";

/*
Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch

This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
https://stytch.com/docs/sdks/javascript-sdk#ui-configs
*/
export const Login = () => {
  const styles = {
    container: {
      width: "100%",
    },
    buttons: {
      primary: {
        backgroundColor: "#4A37BE",
        borderColor: "#4A37BE",
      },
    },
  };
  return (
    <StytchLogin
      config={{
        products: [Products.emailMagicLinks, Products.oauth],
        emailMagicLinksOptions: {
          loginRedirectURL: "http://localhost:3000",
          loginExpirationMinutes: 60,
          signupRedirectURL: "http://localhost:3000",
          signupExpirationMinutes: 60,
        },
        oauthOptions: {
          providers: [{ type: OAuthProviders.Google }],
          loginRedirectURL: "http://localhost:3000",
          signupRedirectURL: "http://localhost:3000",
        },
      }}
      styles={styles}
    />
  );
};
