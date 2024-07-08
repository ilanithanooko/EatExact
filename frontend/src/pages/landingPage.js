import salad from "../assets/salad.png";
import acaiBowl from "../assets/delicious-sweet-acai-bowl-assortment.jpg";
import veggies from "../assets/flat-lay-assortment-fruits-vegetables.jpg";
import eggs from "../assets/lay-eggs-wooden-basket-wooden-floor.jpg";
import salmon from "../assets/slices-raw-red-salmon-top-view.jpg";
import glutenFree from "../assets/gluten-free-flour-cereals-millet-quinoa-corn-bread-brown-buckwheat-rice-with-text-gluten-free.jpg";
import nuts from "../assets/top-view-different-nuts-with-raisins-dried-fruits-grey-background-nut-snack-raisin-dry-fruit-nuts.jpg";
import fruits from "../assets/Weekend Notes.jpeg";

import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-dark-landing w-fullbg-dark-landing bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-6 gap-4 font-montserrat">
        <div className="col-start-2 col-span-2">
          <div className="mt-28 ml-28">
            <div className="grid grid-rows-2 gap-4">
              <div className="row-start-1 mb-5">
                <p className="text-white text-6xl font-bold">
                  Discover Your Perfect Meal Today with{" "}
                  <span className="text-wood-green">EatExact</span>
                </p>
              </div>

              <div className="text-white flex relative h-[104px] row-start-2">
                <img
                  src={salmon}
                  className="w-[104px] h-[104px] rounded-full absolute top-0 left-0"
                />
                <img
                  src={eggs}
                  className="w-[104px] h-[104px] rounded-full absolute top-0 left-0 ml-[70px]"
                />
                <img
                  src={acaiBowl}
                  className="w-[104px] h-[104px] rounded-full absolute top-0 left-0 ml-[140px]"
                />
                <img
                  src={glutenFree}
                  className="w-[104px] h-[104px] rounded-full absolute top-0 left-0 ml-[210px]"
                />
                <img
                  src={nuts}
                  className="w-[104px] h-[104px] rounded-full absolute top-0 left-0 ml-[280px]"
                />
                <img
                  src={veggies}
                  className="w-[104px] h-[104px] rounded-full absolute top-0 left-0 ml-[350px]"
                />
                <img
                  src={fruits}
                  className="w-[104px] h-[104px] rounded-full absolute top-0 left-0 ml-[420px]"
                />

                <div className="row-start-3 text-white text-xl font-montserrat mt-36">
                  Navigating food choices with dietary restrictions can be
                  tough, but{" "}
                  <span className="text-wood-green font-bold">EatExact</span>{" "}
                  simplifies the process. Whether you're vegan, diabetic, on a
                  keto diet, or avoiding allergens, our AI-driven platform
                  delivers suitable, tasty recipes directly to your screen,
                  making meal discovery easy and enjoyable.
                  <div className="mt-5">
                    <Link to="/login">
                      <button class="bg-wood-green hover:bg-light-green text-white font-bold py-4 px-8 rounded-full">
                        Get Started
                      </button>
                    </Link>
                  </div>
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

export default LandingPage;
