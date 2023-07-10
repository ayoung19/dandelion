// import { expressjwt, GetVerificationKey } from "express-jwt";
// import jwksRsa from "jwks-rsa";

// import { AUTH0_AUDIENCE, AUTH0_DOMAIN } from "./env";

// export const checkJwt = expressjwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
//   }) as GetVerificationKey,

//   // Validate the audience and the issuer.
//   audience: AUTH0_AUDIENCE,
//   issuer: `https://${AUTH0_DOMAIN}/`,
//   algorithms: ["RS256"],
// });
