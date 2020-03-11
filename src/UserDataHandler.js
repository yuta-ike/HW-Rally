import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from "react-router-dom";
import axios from 'axios'

const useQuery = () => new URLSearchParams(useLocation().search)

const getUserToken = async code => {
  const params = new URLSearchParams();
  const paramsObj = {
    grant_type: "authorization_code",
    code,
    redirect_uri: "http://localhost:3000/callback",
    client_id: "1653940325",
    client_secret: "8af7a8e63a371ab2bc40a49cf8546bcb",
  }
  Object.entries(paramsObj).forEach(([key, value]) => params.append(key, value))
  const res = await axios.post("https://api.line.me/oauth2/v2.1/token", params)

  const { id_token, access_token, refresh_token } = res.data
  return { id_token, access_token, refresh_token }
}


export default function UserDataHandler(){
  const query = useQuery();

  const [ userData, setUserData ] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const code = query.get("code")
      const { id_token, access_token, refresh_token } = await getUserToken(code)
      setUserData({ id_token, access_token, refresh_token })
    }
    fetchData()
  }, [query])

  return userData != null ? (
    <Redirect to={{
      pathname: `/${userData.id_token}`,
      state: userData
    }}/>
  ):(
    <p>読み込み中</p>
  )
}

