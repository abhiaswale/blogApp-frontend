import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter a valid name!!");
      return;
    }
    if (!email) {
      setError("Please enter an valid email");
      return;
    }
    if (!password) {
      setError("Password cannot be empty");
      return;
    }
    if (password.length < 5) {
      setError("Please enter a valid password between 5-10 characters");
      return;
    }
    fetch("https://blog-app05.herokuapp.com/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Email already exists!");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating a user failed");
        }
        return res.json();
      })
      .then((data) => {
        navigate("/", { state: "Successfully Registered! Please login" });
      })
      .catch((err) => {
        alert(err);
      });
  };

  let content = (
    <div className="lg:w-1/3 w-full flex justify-center items-center shadow-2xl flex-col bg-white p-8 my-28">
      <h1 className="text-2xl font-semibold p-4">Register</h1>
      <p>{error}</p>
      <form className="w-full" onSubmit={submitHandler}>
        <div className="focus-within:text-green-600 focus:outline-none">
          <input
            value={name}
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            className={`w-full my-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error && error.toLowerCase().includes("name")
                ? "border-red-600"
                : ""
            }`}
          ></input>
        </div>
        <div>
          <input
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            className={`w-full my-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error && error.toLowerCase().includes("email")
                ? "border-red-600"
                : ""
            }`}
          ></input>
        </div>
        <div>
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            className={`w-full my-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error && error.toLowerCase().includes("password")
                ? "border-red-600"
                : ""
            }`}
          />
        </div>
        <div className="flex justify-center items-center my-2 w-full flex-col">
          <button
            className="font-semibold p-3 bg-cyan-300 rounded-lg hover:bg-purple-400 transition-all ease-in-out delay-100"
            type="submit"
          >
            Register
          </button>
          <p className="my-2">
            Already have an account?{" "}
            <a href="/" className="text-blue-600">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
  return (
    <div>
      <section className="flex justify-center items-center">{content}</section>
      <Footer />
    </div>
  );
}

export default Register;
