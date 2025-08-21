import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Header from "../components/Header";
import InputBox from "../components/InputBox";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      axios
        .post("http://localhost:3000/api/v1/user/signin", {
          email,
          password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          console.log("Signin successful", response.data);
          navigate("/dashboard", { replace: true });
        })
        .catch((error) => {
          alert("There was an error signing up!");
          console.error("There was an error signing up!", error);
        });
    }
  };

  const handleOnClick = () =>
    axios
      .post("http://localhost:3000/api/v1/user/signin", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        console.log("Signup successful", response.data);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.error("There was an error signing up!", error);
      });

  return (
    <div className="bg-gray-400 h-screen w-screen flex items-center justify-center">
      <div className="bg-white w-lg h-[60%] rounded-2xl shadow-blue-800 shadow-2xl ">
        <Header
          title={"Sign In"}
          subtitle={"Enter your credentials to access your account"}
        />
        <div className="mt-8 flex flex-col w-full px-10">
          <InputBox
            onKeyDown={handleKeyDown}
            onChange={(e) => setEmail(e.target.value)}
            title={"Email"}
            placeholder={"johndoe@gmail.com"}
          />
          <InputBox
            onKeyDown={handleKeyDown}
            onChange={(e) => setPassword(e.target.value)}
            title={"Password"}
            placeholder={"password"}
          />
        </div>
        <div className="px-10 mt-5">
          <Button onClick={handleOnClick} title={"Sign In"} />
        </div>
        <div className="text-center mt-4 text-gray-600">
          <BottomWarning
            text={"Don't have an account?"}
            to={"/signup"}
            link={"Sign Up"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
