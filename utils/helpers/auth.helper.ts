export const isAuthRoute = (route: string): boolean => {
  const regex = /(profile)/i;
  if (regex.test(route)) return true;
  return false;
};
