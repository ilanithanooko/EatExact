import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router-dom";

const Response = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const { prompt, apiResponse } = location.state || {};

  return (
    <div className="bg-gray-bg h-screen justify-center items-center pt-4">
      <div className="bg-white rounded-3xl w-7/12 mx-auto p-5">
        <div className="flex justify-end ">
          <div className="bg-wood-green text-white rounded-3xl p-4 mb-6 w-8/12">
            {prompt}
          </div>
        </div>
        <div className="flex justify-start ">
          <div className="bg-lightest-gray text-black rounded-3xl p-4 mb-6 font-semibold w-8/12">
            {apiResponse}
            <div className="flex justify-end ">
              <div>
                <br/>
                <i class="fa-regular fa-heart fa-lg"></i>  <i class="fa-regular fa-pen-to-square fa-lg"></i>  <i class="fa-brands fa-whatsapp fa-lg"></i>  <i class="fa-brands fa-telegram fa-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Response;
