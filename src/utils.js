import moment from "moment"
import store from "./redux/store"

export function formatDate(date) {
  return moment(date).format('DD-MM-YYYY')
}
export function verifyAdmin(data) {
  return data.username === process.env.REACT_APP_USERNAME && data.password === process.env.REACT_APP_PASSWORD
}

export function verifiedAccount() {
  const account = store.getState().source?.account || {}
  return account.username === process.env.REACT_APP_USERNAME && account.password === process.env.REACT_APP_PASSWORD
}

export function setLocalStorage(name, value) {
  return localStorage.setItem(name, JSON.stringify(value))
}
export function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name))
}