export const queryStringify = (
  baseTxt: string,
  queryObj: Record<string, number>
) => {
  let queryTxt = "";
  let i = 0;
  for (const key in queryObj) {
    if (typeof queryObj[key] !== "undefined" || typeof queryObj[key] !== null) {
      i++;
      const value = queryObj[key];
      const sign = i === 1 ? "?" : "&";
      queryTxt += JSON.stringify(`${sign}${key}=${value}`);
    }
  }
  return baseTxt + queryTxt;
};
