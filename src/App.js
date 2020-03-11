import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserDataHandler from './UserDataHandler.js'
import UserHome from './UserHome.js'

function App(props) {
  const getUrl = () => {
    const url = "https://access.line.me/oauth2/v2.1/authorize"
    const params = {
      response_type: "code",
      client_id: "1653940325",
      redirect_uri: "http://localhost:3000/callback",
      state: "adasfsfafa",
      scope: "profile%20openid"
    }
    return url + "?" + Object.entries(params).map(([key, value]) => key + "=" + value).join("&")
  }
  console.log(props)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <p>サービスを開始するには、LINEと連携してください。</p>
          <a href={getUrl()}>LINEでログイン</a>
        </Route>
        <Route exact path="/callback">
          <UserDataHandler/>
        </Route>
        <Route exact path="/:user">
          <UserHome/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
