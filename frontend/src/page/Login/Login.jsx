import { useState } from "react";
import COVER_IMAGE from "../../../public/image/login.jpg";
import WHO_LOGO from "../../../public/image/World_Health_Organization.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const onSubmit = (data) => {
    axios
      .post("/api/login", data)
      .then((response) => {
        if (response.data.role) {
          // Save user data in local storage
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("role", response.data.role);

          navigate("/");
        } else {
          console.log("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.currentTarget.id === "username") {
        document.getElementById("password")?.focus();
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
        <div className="relative">
          <img
            src={COVER_IMAGE}
            alt="Cover"
            className="w-[500px] h-full hidden md:block object-cover opacity-85"
          />
          <img
            src={WHO_LOGO}
            alt="WHO Logo"
            className="w-auto h-12 object-scale-down absolute top-[4%] left-6 hidden md:block"
          />

          <span className="text-medium font-medium text-white absolute bottom-10 left-7 right-7">
            Unlocking the power of data to revolutionize healthcare. Welcome to
            a world where insights drive innovation, and every login opens doors
            to better patient care.
          </span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center p-8 md:p-14"
        >
          <div className="relative block mb-28">
            <span className="text-sm font-medium absolute top-[-20px] right-0 ">
              HealthLens Analytics
            </span>
          </div>

          <span className="mb-3 text-3xl font-semibold text-center">
            Sign in
          </span>
          <span className="text-center font-normal text-gray-400 mb-6 max-w-sm">
            Please sign in to access our platform for healthcare data analytics.
          </span>
          <div className="py-3">
            <label htmlFor="username" className="mb-2 text-md">
              Username
            </label>
            <input
              {...register("username", {
                required: "Username is required",
              })}
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-2 border rounded-md my-2 focus:outline-none"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              onKeyDown={handleKeyDown}
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="py-3 pt-1">
            <label htmlFor="password" className="mb-2 text-md">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md my-2 focus:outline-none"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              onKeyDown={handleKeyDown}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
