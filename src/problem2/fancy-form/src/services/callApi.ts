import {delay} from "../share/utils/Function.utils";

export const callApiExternal = async (url: string, method: string, body: any) => {
  await delay(3000)
  return await fetch(url, {
    headers: {},
    method: method || "GET",
    body: (body) ? JSON.stringify(body) : null
  }).then(async (r) => await r.json())
}
