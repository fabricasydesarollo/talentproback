import crypto from "node:crypto";

// Constantes canonicas del ticket v1 (espejo de @helixa/launch-verifier).
export const LAUNCH_TICKET_ISSUER = "helixa-api";
export const LAUNCH_TICKET_AUDIENCE = "helixa-applications";
// Vida util del ticket: 60 segundos desde `timestamp`.
export const LAUNCH_TICKET_TTL_MS = 60_000;
// Deriva de reloj aceptada entre emisor y receptor: +-30 segundos.
export const LAUNCH_TICKET_CLOCK_SKEW_MS = 30_000;
// Ventana de un solo uso del `nonce`: la aplica el receptor (120 segundos).
export const LAUNCH_TICKET_NONCE_CACHE_MS = 120_000;

export class LaunchTicketRejectedError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "LaunchTicketRejectedError";
    this.code = code;
    this.httpStatus = 403;
  }
};

const b64urlDecode = (segment) => Buffer.from(segment, "base64url");

export const verifyLaunchTicket = (ticket, secret, options = {}) => {
  const now = options.now !== undefined ? options.now : Date.now();

  if (typeof ticket !== "string") {
    throw new LaunchTicketRejectedError("MALFORMED", "Ticket must be a string.");
  }
  const dot = ticket.indexOf(".");
  if (dot < 0 || ticket.indexOf(".", dot + 1) >= 0) {
    throw new LaunchTicketRejectedError("MALFORMED", "Ticket must have the form payload_b64.sig.");
  }
  const payloadB64 = ticket.slice(0, dot);
  const signatureB64 = ticket.slice(dot + 1);
  if (!payloadB64 || !signatureB64) {
    throw new LaunchTicketRejectedError("MALFORMED", "Ticket must have the form payload_b64.sig.");
  }

  // El HMAC se calcula sobre los bytes decodificados tal cual llegaron,
  // NO sobre JSON.stringify del objeto parseado (reordenaria claves).
  let payloadBytes;
  let claims;
  try {
    payloadBytes = b64urlDecode(payloadB64);
    claims = JSON.parse(payloadBytes.toString("utf8"));
  } catch {
    throw new LaunchTicketRejectedError("MALFORMED", "Ticket payload is not valid base64url JSON.");
  }

  let actual;
  try {
    actual = b64urlDecode(signatureB64);
  } catch {
    throw new LaunchTicketRejectedError("MALFORMED", "Ticket signature is not valid base64url.");
  }
  const expected = crypto.createHmac("sha256", secret).update(payloadBytes).digest();
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) {
    throw new LaunchTicketRejectedError("BAD_SIGNATURE", "Ticket signature mismatch.");
  }

  if (claims.iss !== LAUNCH_TICKET_ISSUER) {
    throw new LaunchTicketRejectedError("ISS_MISMATCH", "Ticket issuer mismatch.");
  }
  if (claims.aud !== LAUNCH_TICKET_AUDIENCE) {
    throw new LaunchTicketRejectedError("AUD_MISMATCH", "Ticket audience mismatch.");
  }
  if (typeof claims.exp !== "number" || typeof claims.timestamp !== "number") {
    throw new LaunchTicketRejectedError("MALFORMED", "Ticket must carry numeric timestamp/exp.");
  }
  if (now > claims.exp + LAUNCH_TICKET_CLOCK_SKEW_MS) {
    throw new LaunchTicketRejectedError("EXPIRED", "Ticket expired.");
  }
  if (claims.timestamp - now > LAUNCH_TICKET_CLOCK_SKEW_MS) {
    throw new LaunchTicketRejectedError("EXPIRED", "Ticket issued too far in the future.");
  }

  return claims;
};
