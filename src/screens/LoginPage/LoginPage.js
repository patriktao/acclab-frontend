import "./LoginPage.scss";
import Logo from "../../images/tetrapak_logo.png";
import LoginComponent from "../../components/LoginComponent";
import { Layout } from "antd";

const LoginPage = () => {
  return (
    <Layout>
      <section className="LoginPage">
        <div className="background">
          <div className="main-container">
            <div className="header-container">
              <h2>
                Log in to {<br />} Accelerator
                <span className="blue-text">LAB</span>
              </h2>
            </div>
            <LoginComponent />
          </div>
          <div className="logo-container">
            <img src={Logo} alt="Tetra Pak Logo" className="logo" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
