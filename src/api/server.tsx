import axios from "axios";
import { SERVER_ADRESS } from "../constants";

export default axios.create({
  baseURL: SERVER_ADRESS,
});
