export const getToken = () => {
  const user: string | null = localStorage.getItem("user");

  if (user) {
    return JSON.parse(user);
  } else {
    return "";
  }
};

export const getRequestUrl = (url: string) => {
  return process.env.NODE_ENV === "production"
    ? import.meta.env?.VITE_PROXY_URL + url
    : url;
};
