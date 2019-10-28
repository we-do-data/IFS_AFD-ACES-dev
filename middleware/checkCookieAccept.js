var cookieparser = require('cookieparser')

export default function ({ req, store, app, redirect }) {

  console.log('\n-MW-Middleware : checkCookieAccept...')
  let parsed = undefined 

  if (process.server) {
    console.log('-MW-checkCookieAccept : process.server == TRUE ')
    if (req.headers.cookie) {
      let cookie = req.headers.cookie
      parsed = cookieparser.parse(cookie)
    }
  }

  else {
    console.log('-MW-checkCookieAccept : process.server == FALSE ')
    let cookie = document.cookie
    parsed = cookieparser.parse(cookie)
  }

  // console.log('-MW-checkCookieAccept / parsed :', parsed)

  let cookieAccept = parsed.acceptCookie
  console.log('-MW-checkCookieAccept / cookieAccept :', cookieAccept)

  if ( cookieAccept && cookieAccept === 'true' ){
    console.log('-MW-checkCookieAccept / cookieAccept :', cookieAccept)
    store.dispatch('setAcceptCookies')
  }
}