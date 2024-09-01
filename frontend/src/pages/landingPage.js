import salad from "../assets/salad.png";
import foodBar from "../assets/foodBar.png";

import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-bl from-green-darkest to-green-600">
      <div class="py-10 md:py-12 xl:container m-auto px-6 md:px-12">
        <div class="relative md:flex items-center lg:gap-12">
          <div class="w-full px-20 md:hidden">
            <img src={salad} alt="project illustration" height="" width="" />
          </div>
          <div class="text-center lg:text-left md:mt-12 lg:mt-0 sm:w-10/12 md:w-2/3 sm:mx-auto lg:mr-auto lg:w-6/12">
            <h1 class="font-montserrat font-bold text-4xl lg:text-5xl xl:text-6xl text-white drop-shadow-md">
            Discover Your Perfect Meal Today with{" "}
                  <span className="text-green-darkest">EatExact</span>
            </h1>
            <p class="mt-8 text-white text-xl font-montserrat">
            Navigating food choices with dietary restrictions can be
                  tough, but{" "}
                  <span className="text-green-darkest font-bold">EatExact</span>{" "}
                  simplifies the process. Whether you're vegan, diabetic, on a
                  keto diet, or avoiding allergens, our AI-driven platform
                  delivers suitable, tasty recipes directly to your screen,
                  making meal discovery easy and enjoyable.
            </p>
            <div>
              <div class="mt-5 flex">
                <img src={foodBar} class="" alt="" />
              </div>
              <div className="mt-5">
                     <Link to="/login">
                      <button class="bg-green-darkest hover:bg-green-950 text-white font-bold py-4 px-8 rounded-full">
                         Get Started
                      </button>
                     </Link>
                   </div>
              
            </div>
          </div>
          <div class="w-full md:5/12 lg:w-7/12 mx-auto hidden md:block">
            <img src={salad} alt="project illustration" height="" width="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
