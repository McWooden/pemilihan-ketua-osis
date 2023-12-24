import moment from "moment"
import store from "./redux/store"

export const bucketUrl = 'https://fsgktjbbbupsvnqqaepk.supabase.co/storage/v1/object/public/fotoKtp/'

export function formatDate(date) {
  if (!date) return '-'
  const formattedDate = moment(date).format('DD-MM-YYYY');
  return formattedDate === 'Invalid date' ? '-': formattedDate 
}

export function dateFormat(date) {
  if (!date) return '-'
  const formattedDate = moment(date).format('yyyy-MM-DD');
  return formattedDate === 'Invalid date' ? '-': formattedDate 
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