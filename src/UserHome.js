import React from 'react';
import { useParams, useLocation } from "react-router-dom";

export default function UserHome(props){
  const { user } = useParams()
  const location = useLocation()
  const { access_token, refresh_token } = location.state
  
  return (
    <p>LINEでのログインを確認しました。<br/>
      { user }さんこんにちは！<br/>
      access_token:{access_token}<br/>
      refresh_token:{refresh_token}
    </p>
  )
  
}