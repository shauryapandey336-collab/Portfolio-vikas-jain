const SESSION_KEY = 'vj_admin_session';
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours

export function login(username, password) {
  const validUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const validPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  // No fallback credentials: configure both values in .env.local.
  if (validUser && validPass && username === validUser && password === validPass) {
    const session = { loggedIn: true, timestamp: Date.now() };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function isLoggedIn() {
  if (typeof window === 'undefined') return false;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    if (!session.loggedIn) return false;
    if (Date.now() - session.timestamp > SESSION_DURATION) {
      logout();
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function logout() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(SESSION_KEY);
}
