import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import salad from "../assets/salad.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, lastName, email, password);
  };

  return (
    // <div className="bg-gradient-to-bl from-green-darkest to-green-600">
    <div class="py-10 md:py-12 xl:container m-auto px-6 md:px-12 font-montserrat">
      <div class="relative md:flex items-center lg:gap-12">
        <div class="w-full px-20 md:hidden">
          <img src={salad} alt="project illustration" height="" width="" />
        </div>
        <div class="text-center px-5 lg:text-left md:mt-12 lg:mt-0 sm:w-10/12 md:w-2/3 sm:mx-auto lg:mr-auto lg:w-6/12">
          <h1 class="font-bold text-4xl lg:text-5xl xl:text-6xl text-white drop-shadow-md my-4">
            Welcome to EatExact
          </h1>
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <div className="grid gap-2 grid-cols-2 my-2 ">
                <div className="mt-2">
                  <label
                    htmlFor="name"
                    className="flex text-xl xl:text-2xl font-medium leading-6 text-white mb-2"
                  >
                    First name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name.charAt(0).toUpperCase() + name.slice(1)}
                    placeholder="Enter first name"
                    required
                    className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 placeholder:text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wood-green sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="mt-2">
                  <label
                    htmlFor="lastname"
                    className="flex text-xl xl:text-2xl font-medium leading-6 text-white mb-2"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName.charAt(0).toUpperCase() + lastName.slice(1)}
                    placeholder="Enter last name"
                    required
                    className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 placeholder:text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wood-green sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
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
                  onChange={(e) => {setPassword(e.target.value)}}
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
                Sign Up
              </button>
            </div>
            {/* <div className="flex justify-center items-center ">
                <div id="googleLoginButton"></div>
              </div> */}
            {error && <div className="text-red-800 font-semibold drop-shadow-sm bg-opacity-40 bg-white p-2 rounded-md">{error}</div>}
          </form>
          <p className="mt-8 text-center text-lg xl:text-xl text-white">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-green-darkest hover:text-green-lighter"
            >
              Sign in now
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

export default Signup;
