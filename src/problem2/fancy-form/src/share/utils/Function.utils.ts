export const delay = (ms: any) => {
  if (!ms) ms = 2000;
  return new Promise((res) => setTimeout(res, Number(ms)));
};
