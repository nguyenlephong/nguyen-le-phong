import {callApiExternal} from "services/callApi";

export const getListOfPrices = () => {
  return callApiExternal("https://interview.switcheo.com/prices.json", "GET", null)
}
