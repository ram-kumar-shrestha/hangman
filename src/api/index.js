import axios from "axios";

export default axios.create({
  baseURL: "http://syankotestbe.hamrosystem.com/api", //test api
  // baseURL: "http://syankocentralinventory.hamrosystem.com/api", //demo api
  // baseURL: "https://syankobe.syankoapp.com/api", //production api
});
