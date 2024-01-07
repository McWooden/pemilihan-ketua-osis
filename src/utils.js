import moment from "moment"
// import store from "./redux/store"
// import supabase from "./config/supabaseClient";

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

// export async function verifiedAccount() {
//   const {data, error} = await supabase.from('admins').select('*').eq(store.getState().source?.account)
//   const account = store.getState().source?.account || {}
//   if (error || !data.length) return false
//   return account.username === process.env.REACT_APP_USERNAME && account.password === process.env.REACT_APP_PASSWORD
// }

export function setLocalStorage(name, value) {
  return localStorage.setItem(name, JSON.stringify(value))
}
export function getParseLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name))
}
export function getLocalStorage(name) {
  return localStorage.getItem(name)
}