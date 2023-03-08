import { Axios } from "@villehx/axios";
import { captureAWS } from "@villehx/xray";

export const handler = async (event: any) => {
  console.log("captureAWS", captureAWS);
  console.log("AXIOS", Axios);
};
