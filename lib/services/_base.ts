import { VERSION, ENV, API_PROD, API_SANDBOX, API_DEV } from "./config";

let country = "";
let city = "";
let region = "";
const getCountry = async () => {
  const result = await fetch("https://freeipapi.com/api/json/", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await result.json();
};

getCountry().then((r) => {
  country = r.countryCode;
  city = r.cityName;
  region = r.regionName;

  if (typeof window != "undefined") {
    window.localStorage.setItem("region", region || "");
    window.localStorage.setItem("city", city || "");
  }
});

const getServerUrl = function () {
  if (ENV === "prod") {
    return {
      SERVER_URL: API_PROD,
    };
  } else if (ENV === "sandbox") {
    return {
      SERVER_URL: API_SANDBOX,
    };
  }

  return {
    SERVER_URL: API_DEV,
  };
};

const dataURLS = getServerUrl();

export const SERVER_URL = dataURLS.SERVER_URL;

export const getOS = () => {
  let os = null;

  const platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    userAgent = window.navigator.userAgent;
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }
  return os;
};

export const postRequest = async function (
  endpoint: string,
  data: any,
  jwtToken: any = null,
  extraOpts: any = {}
) {
  const opts: any = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
      country,
      region,
      city,
      _version: VERSION,
      _channel: `${getOS()}`,
      _token: jwtToken,
    }),
  };

  const baseUrl = SERVER_URL;

  const rawResponse = await fetch(baseUrl + endpoint, opts);

  let content = null;
  if (extraOpts.blob) {
    content = await rawResponse.blob();
  } else {
    content = await rawResponse.json();
  }

  if (rawResponse.status === 401) {
    window.localStorage.removeItem("auth_pwa_token");
    throw content;
  }
  if (rawResponse.status !== 200) throw content;

  return content;
};

export const postMultimedia = async function (
  endpoint: string,
  form: any,
  user: any
) {
  const opts: any = {
    method: "POST",
    headers: {},
    body: form,
  };

  if (user) {
    opts.headers.Authorization = "Bearer " + user.token;
  }

  const rawResponse = await fetch(SERVER_URL + endpoint, opts);

  const content = await rawResponse.json();

  if (rawResponse.status != 200) throw content;
  return content;
};

export const postFile = async function (endpoint: string, data: any) {
  const opts: any = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
      _version: VERSION,
    }),
  };

  const rawResponse = await fetch(SERVER_URL + endpoint, opts);

  const content = await rawResponse.blob();

  if (rawResponse.status != 200) throw content;
  return content;
};
