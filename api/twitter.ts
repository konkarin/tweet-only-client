import axios from "axios";
import crypto from "crypto";
import { TweetV1TimelineResult } from "twitter-api-v2";

export interface credentials {
  token: string;
  secret: string;
}

interface Authorization {
  oauth_consumer_key: string;
  oauth_nonce: string;
  oauth_signature: string;
  oauth_signature_method: string;
  oauth_timestamp: string;
  oauth_token: string;
  oauth_version: string;
}

interface SignatureParams {
  oauth_consumer_key: string;
  oauth_nonce: string;
  oauth_signature_method: string;
  oauth_timestamp: string;
  oauth_token: string;
  oauth_version: string;
  [key: string]: string;
}

export const statusesUpdate = async (
  status: string,
  credentials: credentials
) => {
  const url = "https://api.twitter.com/1.1/statuses/update.json";
  const data = `status=${encodeURIComponent(status)}`;
  const configs = {
    headers: generateHeaders("POST", url, { status }, credentials),
  };

  return await axios.post(url, data, configs);
};

export const getList = async (list_id: string, credentials: credentials) => {
  const url = `https://api.twitter.com/1.1/lists/statuses.json`;
  const params = {
    list_id,
    count: "50",
    include_rts: "false",
    // TODO: 無限スクロール
    // max_od,
    // TODO: 引っ張って更新
    // since_id,
  };

  const configs = {
    headers: generateHeaders("GET", url, params, credentials),
    params,
  };

  return await axios.get<TweetV1TimelineResult>(url, configs);
};

const generateHeaders = (
  method: string,
  url: string,
  data: {
    [key: string]: string;
  },
  credentials: credentials
) => {
  const params: SignatureParams = {
    ...data,
    oauth_consumer_key: process.env.CONSUMER_KEY as string,
    oauth_nonce: generateRandomString(42),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: `${new Date().getTime()}`.substring(0, 10),
    oauth_token: credentials.token,
    oauth_version: "1.0",
  };

  const signature = generateSignature(method, url, params, credentials.secret);

  const authorizationParams: Authorization = {
    oauth_consumer_key: params.oauth_consumer_key,
    oauth_nonce: params.oauth_nonce,
    oauth_signature: signature,
    oauth_signature_method: params.oauth_signature_method,
    oauth_timestamp: params.oauth_timestamp,
    oauth_token: params.oauth_token,
    oauth_version: params.oauth_version,
  };

  const authorizationStr =
    "OAuth " +
    (Object.keys(authorizationParams) as (keyof Authorization)[])
      .map(
        (key) =>
          `${encodeURIComponent(key)}="${encodeURIComponent(
            authorizationParams[key]
          )}"`
      )
      .join(", ");

  const headers = {
    Authorization: authorizationStr,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return headers;
};

const generateSignature = (
  method: string,
  url: string,
  params: SignatureParams,
  secret: string
) => {
  const paramStr = (Object.keys(params) as (keyof SignatureParams)[])
    .sort()
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  const signatureStr = `${method.toUpperCase()}&${encodeURIComponent(
    url
  )}&${encodeURIComponent(paramStr)}`;

  const signatureKey = `${encodeURIComponent(
    process.env.CONSUMER_SECRET_KEY as string
  )}&${encodeURIComponent(secret)}`;

  const signature = crypto
    .createHmac("sha1", signatureKey)
    .update(signatureStr)
    .digest("base64");

  return signature;
};

const generateRandomString = (N: number) => {
  return crypto.randomBytes(N).toString("base64").substring(0, N);
};
