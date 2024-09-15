import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import salad from "../assets/salad.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const clientId = process.env.REACT_APP_CLIENTID;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
  }

  return (
    // <div className="bg-gradient-to-bl from-green-darkest to-green-600">
      <div class="py-10 md:py-12 xl:container m-auto px-6 md:px-12 font-montserrat">
        <div class="relative md:flex items-center lg:gap-12">
          <div class="w-full px-20 md:hidden">
            <img src={salad} alt="project illustration" height="" width="" />
          </div>
          <div class="text-center px-10 lg:text-left md:mt-12 lg:mt-0 sm:w-10/12 md:w-2/3 sm:mx-auto lg:mr-auto lg:w-6/12">
            <h1 class="font-bold text-4xl lg:text-5xl xl:text-6xl text-white drop-shadow-md my-4">
              Welcome Back
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block text-xl xl:text-2xl font-medium leading-6 text-white"
                  >
                    Email address
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    autoComplete="email"
                    placeholder="Enter your email"
                    required
                    className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 placeholder:text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wood-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xl xl:text-2xl font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 placeholder:text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wood-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md bg-green-darkest hover:bg-green-950 px-3 py-4 text-2xl leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-900"
                >
                  Sign In
                </button>
              </div>
              {error && <div className="text-red-800">{error}</div>}
            </form>
            <p className="mt-8 text-center text-lg xl:text-xl text-white">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-green-darkest hover:text-green-lighter"
              >
                Sign up now
              </Link>
            </p>
          </div>
          <div class="w-full md:5/12 lg:w-7/12 mx-auto hidden md:block">
            <img src={salad} alt="project illustration" height="" width="" />
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Login;
