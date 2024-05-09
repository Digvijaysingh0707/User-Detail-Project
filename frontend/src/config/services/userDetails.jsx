import { endPoint } from "../settings/urls";
import axios from "axios";

export function getUserList(params) {
  let _url = `${endPoint.url.Apiurl}${endPoint.user.userList}`
  return axios.get(_url, { params });
}

export function addUser(params) {
  let _url = `${endPoint.url.Apiurl}${endPoint.user.addUser}`;
  return axios.post(_url, params);
}

export function deleteUser(params) {
  let id = params._id;

  let _url = `${endPoint.url.Apiurl}/user/delete/${id}`;

  return axios.delete(_url, params);
}

export function updateUser(params) {
  let id = params._id;
  let _url = `${endPoint.url.Apiurl}${endPoint.user.updateUser}`;
  return axios.put(_url, params);
}