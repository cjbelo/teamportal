const session = localStorage;

function set(k, v) {
  return session.setItem(k, v);
}

function get(k) {
  return session.getItem(k);
}

function del(k) {
  delete session[k];
  return true;
}

export { set, get, del };
