/** Headers for JSON requests with JWT */
export function authHeadersJson() {
  const token = localStorage.getItem("token");
  if (!token) return { "Content-Type": "application/json" };
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/** Only Authorization (e.g. FormData uploads, DELETE without body) */
export function authHeadersBearer() {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
