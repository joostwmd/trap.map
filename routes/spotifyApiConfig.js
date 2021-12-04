const btoa = require('btoa')
const fetch = require('cross-fetch');

const client_id = "25ecacddc59e4a3aadede77c0f93cf43"
const client_secret = "b30b8625e1154ef49c70dc548034e97b"
const tokenEndpoint = "https://accounts.spotify.com/api/token"
const redirect_uri = "http://localhost:3000/callback/"



//PUBLIC TOKEN

const fetchPublicToken = async () => {
  const result = await fetch(`${tokenEndpoint}`, {
      method : 'POST',
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(`${client_id}:${client_secret}`)
      },
      body : 'grant_type=client_credentials'
  })

  const data = await result.json()
  return data.access_token
}

//PRIVATE TOKEN


//after auth
const getCodeFromRedirect = () => {
  let code = null
  const queryString = window.location.search
  if ( queryString.length > 0 ){
    const urlParams = new URLSearchParams(queryString)
    code = urlParams.get('code')
  }
  return code
}


const fetchPrivateToken = (code) => {
  let body = "grant_type=authorization_code";
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI(redirect_uri)
  body += "&client_id=" + client_id;
  body += "&client_secret=" + client_secret

  callAuthorizationApi(body)

}

const callAuthorizationApi =  (body) => {
  let xhr = new XMLHttpRequest()
  xhr.open("POST", tokenEndpoint, true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(`${client_id}:${client_secret}`))
  xhr.send(body)
  xhr.onload = handleAuthorizationResponse
}

const handleAuthorizationResponse = () => {
  if (this.status === 200){
    var data = JSON.parse(this.responseText)
    console.log(data)
    
    if (data.access_token !== undefined){
      access_token = data.access_token
      console.log("access_token", access_token)
    }
    if (data.refresh_token !== undefined){
      refresh_token = data.refresh_token
      console.log("refresh_token", refresh_token)
    }
  }
  else {
    console.log(this.responseText)
  }
}



module.exports = {fetchPublicToken, getCodeFromRedirect, fetchPrivateToken};