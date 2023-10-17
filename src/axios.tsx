import axiosClient from "axios";
import { setupCache } from "axios-cache-interceptor";

const axios = setupCache(axiosClient);

export default axios;
