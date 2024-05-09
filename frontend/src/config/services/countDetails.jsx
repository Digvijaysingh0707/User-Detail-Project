import { endPoint } from "../settings/urls";
import axios from "axios";

export function getCountDetails(params) {
  let _url = `${endPoint.url.Apiurl}${endPoint.count.getCount}`
  return axios.get(_url, { params });
}
