import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
// import { postAPI } from '../APIs/AxiosAPI';

const google = window.google;
const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

function LoginPage() {
  const [ user, setUser ] = useState({});

  function handleLoginResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    // const APIresponse = await postAPI(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    // global google
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleLoginResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
      {/* Sign Out button 이 로그인 성공 시에만 보여지도록 하는 코드 */}
      { Object.keys(user).length != 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }

      {/* 로그인 성공 시, 즉 user 변수에 어떤 값이 들어갈 시, 유저 프로필과 이름이 보여지도록 하는 코드 */}
      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default LoginPage;
