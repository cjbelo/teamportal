import axios from "axios";
import * as Session from "../utils/session";

const baseUrl = "http://localhost:8080";

function getAuth(token) {
  token = typeof token === "string" ? token : Session.get("session");
  return { headers: { Authorization: `Bearer ${token}` } };
}

const Get = (url, token = false) => {
  url = baseUrl + url;
  const oauth = !token ? {} : getAuth(token);
  return axios.get(url, oauth);
};

const Post = (url, payload = {}, token = false) => {
  url = baseUrl + url;
  const oauth = !token ? {} : getAuth(token);
  return axios.post(url, payload, oauth);
};

export { Get, Post };
