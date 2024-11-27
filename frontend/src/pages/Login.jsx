import logo from "../assets/rbac.jpg";
import logo2 from "../assets/logo2.png";
import LoginForm from "../element/LoginForm";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="flex h-screen">
        <img src={logo2} alt="RBAC_LOGO" className="w-1/2 h-full" />

        <div className="h-full w-full bg-[#ececec] ">
          <div className="mt-32 mx-20">
            <h1 className=" p-2 font-bold text-3xl">Admin's Login</h1>
            <div className="">
              <h3>Welcome back ! Please enter your details.</h3>
            </div>
            <LoginForm email={email} setEmail={setEmail} />
            <button className="w-full h-12 bg-white text-black py-2 rounded-lg hover:bg-black hover:text-white transition duration-200">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
