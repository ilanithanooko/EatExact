import salad from "../assets/salad.png";
import foodBar from "../assets/foodBar.png"; 
import { Link } from "react-router-dom";

// LandingPage functional component
const LandingPage = () => {
  return (
    <div class="py-10 md:py-12 xl:container m-auto px-6 md:px-12 font-montserrat">
      {/* Main container with padding and margin for responsive design */}
      <div class="relative md:flex items-center lg:gap-12">
        {/* Flex container to align content on medium screens */}
        
        {/* Image for smaller screens */}
        <div class="w-full px-20 md:hidden">
          <img src={salad} alt="project illustration" height="" width="" />
        </div>

        {/* Text content section */}
        <div class="text-center lg:text-left md:mt-12 lg:mt-0 sm:w-10/12 md:w-2/3 sm:mx-auto lg:mr-auto lg:w-6/12">
          {/* Headline with responsive font sizes */}
          <h1 class="font-bold text-4xl lg:text-5xl xl:text-6xl text-white drop-shadow-md">
            Discover Your Perfect Meal Today with{" "}
            <span className="text-green-darkest">EatExact</span>
          </h1>

          {/* Description paragraph */}
          <p class="mt-8 text-white text-xl">
            Navigating food choices with dietary restrictions can be tough,
            but <span className="text-green-darkest font-bold">EatExact</span>{" "}
            simplifies the process. Whether you're vegan, diabetic, on a keto
            diet, or avoiding allergens, our AI-driven platform delivers
            suitable, tasty recipes directly to your screen, making meal
            discovery easy and enjoyable.
          </p>

          {/* Container for the food bar image and button */}
          <div>
            {/* Food bar image */}
            <div class="mt-5 flex">
              <img src={foodBar} class="" alt="" />
            </div>

            {/* 'Get Started' button */}
            <div className="mt-5">
              <Link to="/login">
                <button class="bg-green-darkest hover:bg-green-950 text-white text-xl py-4 px-8 rounded-full">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Image for larger screens */}
        <div class="w-full md:5/12 lg:w-7/12 mx-auto hidden md:block">
          <img src={salad} alt="project illustration" height="" width="" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
