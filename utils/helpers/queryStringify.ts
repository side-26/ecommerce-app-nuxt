export const queryStringify = (
  baseTxt: string = "",
  queryObj: Record<any, number | string>
) => {
  let queryTxt = "";
  let i = 0;
  for (const key in queryObj) {
    if (typeof queryObj[key] !== "undefined" || typeof queryObj[key] !== null) {
      i++;
      const value = queryObj[key];
      const sign = i === 1 ? "?" : "&";
      queryTxt += `${sign}${key}=${value}`;
    }
  }
  return baseTxt + queryTxt;
};
export const addSignToKey = (
  key: string | number,
  values: string[] | number[],
  sign: string = "[]"
): string => {
  let queryStr: string = "";
  values?.forEach((item, index) => {
    const seprateSign = index === 0 ? "?" : "&";
    queryStr += seprateSign + key + sign + "=" + item;
  });
  return queryStr;
};
