"use client";
let env = "dev";

if (
  typeof window !== "undefined" &&
  window.location.hostname == "app.blokay.com"
) {
  env = "prod";
}

export const VERSION = "1.0.1";
export const ENV = env;
export const API_PROD = "https://app.blokay.com/api/";
export const API_SANDBOX = "http://localhost:8082/api/";
export const API_DEV = "http://localhost:8082/api/";
