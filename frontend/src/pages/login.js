import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import salad from "../assets/salad.png";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode"

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
    var userObject = jwt_decode(response.credential)
  }

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleLoginButton"),
      { theme: "outline", size: "large"}
    );
  }, []);

  return (
    <div className="bg-dark-landing w-full bg-cover bg-center min-h-screen flex items-center justify-center font-montserrat">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-2">
          <div className="mt-36 ml-28">
            <div className="place-items-center">
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-white">
                    WELCOME BACK
                  </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-lg font-medium leading-6 text-white"
                      >
                        Email address
                      </label>
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
                          className="block text-lg font-medium leading-6 text-white"
                        >
                          Password
                        </label>
                        <div className="text-lg">
                          <a
                            href="#"
                            className="font-semibold text-wood-green hover:text-light-green"
                          >
                            Forgot password?
                          </a>
                        </div>
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
                        className="flex w-full justify-center rounded-md bg-wood-green px-3 py-4 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-light-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood-green"
                      >
                        Sign in
                      </button>
                    </div>
                    <div className="flex justify-center items-center ">
                      <div id="googleLoginButton"></div>
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                  </form>

                  <p className="mt-10 text-center text-xl text-white">
                    Not a member?{" "}
                    <Link
                      to="/signup"
                      className="font-semibold leading-6 text-wood-green hover:text-light-green"
                    >
                      Sign up now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-start-4 col-span-2 mt-5">
          <img src={salad} className="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
