export function setStorageUser(name, color) {
  localStorage.setItem('user', JSON.stringify({ name, color }))
}

export function getStorageUser() {
  return JSON.parse(localStorage.getItem('user'))
}
