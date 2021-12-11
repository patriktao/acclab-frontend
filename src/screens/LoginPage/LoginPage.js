import "./LoginPage.scss";
import Logo from "../../images/tetrapak_logo.png";
import LoginComponent from "../../components/LoginComponent";;

const LoginPage = () => {
  return (
    <section className="LoginPage">
      <div className="background">
        <div className="main-container">
          <div className="header-container">
            <span className="header">
              Log in to {<br />} Accelerator
              <span className="blue-text">LAB</span>
            </span>
          </div>
          <div className="login-container">
            <div className="login-container-style">
              <div className="login-header">Login</div>
              <div className="login-form-container">
                <LoginComponent />
              </div>
            </div>
          </div>
        </div>
        <div className="logo-container">
          <img src={Logo} alt="Tetra Pak Logo" className="logo" />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
