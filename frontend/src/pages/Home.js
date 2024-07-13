import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-bg h-screen justify-center items-center pt-4">
      <div className="bg-white rounded-3xl w-7/12 mx-auto p-5">
        <div className="flex flex-col mx-auto gap-3">
          <div className="bg-lightest-gray rounded-3xl justify-center items-center">
            <div className="flex-col mx-auto">
              <div className="text-center font-montserrat text-3xl my-7 text-green-900 font-bold">
                What do you want to eat today?
              </div>
              <form className="flex flex-row font-montserrat text-2xl">
                <div className="mx-auto">
                  <input
                    type="radio"
                    id="Appetizers"
                    value="Appetizers"
                    name="foodCategory"
                  ></input>
                  <label for="Appetizers"> Appetizers</label>
                  <br />

                  <input
                    type="radio"
                    id="Salads"
                    value="Salads"
                    name="foodCategory"
                  ></input>
                  <label for="Salads"> Salads</label>
                  <br />

                  <input
                    type="radio"
                    id="Main-courses"
                    value="Main-courses"
                    name="foodCategory"
                  ></input>
                  <label for="Main-courses"> Main-courses</label>
                  <br />
                  <input
                    type="radio"
                    id="Side-dish"
                    value="Side-dish"
                    name="foodCategory"
                  ></input>
                  <label for="Side-dish"> Side-dish</label>
                  <br />
                  <input
                    type="radio"
                    id="Pasta"
                    value="Pasta"
                    name="foodCategory"
                  ></input>
                  <label for="Pasta"> Pasta</label>
                  <br />
                </div>

                <div className="mx-auto">
                  <input
                    type="radio"
                    id="snacks"
                    name="foodCategory"
                    value="Snacks"
                  />
                  <label htmlFor="snacks"> Snacks</label>
                  <br />

                  <input
                    type="radio"
                    id="soups"
                    name="foodCategory"
                    value="Soups"
                  />
                  <label htmlFor="soups"> Soups</label>
                  <br />

                  <input
                    type="radio"
                    id="breakfast"
                    name="foodCategory"
                    value="Breakfast"
                  />
                  <label htmlFor="breakfast"> Breakfast</label>
                  <br />

                  <input
                    type="radio"
                    id="lunch"
                    name="foodCategory"
                    value="Lunch"
                  />
                  <label htmlFor="lunch"> Lunch</label>
                  <br />

                  <input
                    type="radio"
                    id="dinner"
                    name="foodCategory"
                    value="Dinner"
                  />
                  <label htmlFor="dinner"> Dinner</label>
                  <br />
                </div>
                <div className="mx-auto">
                  <input
                    type="radio"
                    id="breads"
                    name="foodCategory"
                    value="Breads"
                  />
                  <label htmlFor="breads"> Breads</label>
                  <br />

                  <input
                    type="radio"
                    id="sandwiches"
                    name="foodCategory"
                    value="Sandwiches"
                  />
                  <label htmlFor="sandwiches"> Sandwiches</label>
                  <br />

                  <input
                    type="radio"
                    id="cookies"
                    name="foodCategory"
                    value="Cookies"
                  />
                  <label htmlFor="cookies"> Cookies</label>
                  <br />

                  <input
                    type="radio"
                    id="cakes"
                    name="foodCategory"
                    value="Cakes"
                  />
                  <label htmlFor="cakes"> Cakes</label>
                  <br />

                  <input
                    type="radio"
                    id="desserts"
                    name="foodCategory"
                    value="Desserts"
                  />
                  <label htmlFor="desserts"> Desserts</label>
                  <br />
                </div>
              </form>
            </div>
            <div className="text-center font-montserrat text-3xl my-7 text-green-900 font-bold flex items-center justify-center">
              <input
                placeholder="Anything Else?..."
                className="block w-1/2 rounded-md border-0 py-3 pl-4 text-gray-900 placeholder:text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wood-green sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-lightest-gray rounded-3xl flex-row justify-center items-center">
              <div className="flex-col mx-auto">
                <div className="text-center font-montserrat text-3xl my-7 text-green-900 font-bold">
                  What To Avoid?
                </div>
                <form className="flex flex-row font-montserrat text-2xl">
                  <div className="mx-auto">
                    <input
                      type="checkbox"
                      id="Gluten"
                      value="Gluten"
                      name="AvoidIngredient"
                    ></input>
                    <label for="Gluten"> Gluten</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Dairy"
                      value="Dairy"
                      name="AvoidIngredient"
                    ></input>
                    <label htmlFor="Dairy"> Dairy</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Eggs"
                      value="Eggs"
                      name="AvoidIngredient"
                    ></input>
                    <label htmlFor="Eggs"> Eggs</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Nuts"
                      value="Nuts"
                      name="AvoidIngredient"
                    ></input>
                    <label htmlFor="Nuts"> Nuts</label>
                    <br />
                  </div>

                  <div className="mx-auto">
                    <input
                      type="checkbox"
                      id="Sesame"
                      value="Sesame"
                      name="AvoidIngredient"
                    ></input>
                    <label htmlFor="Sesame"> Sesame</label>
                    <br />

                    <input
                      type="checkbox"
                      id="SoyBeans"
                      value="Soy Beans"
                      name="AvoidIngredient"
                    ></input>
                    <label htmlFor="SoyBeans"> Soy Beans</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Fish"
                      value="Fish"
                      name="AvoidIngredient"
                    />
                    <label htmlFor="Fish"> Fish</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Seafood"
                      value="Seafood"
                      name="AvoidIngredient"
                    />
                    <label htmlFor="Seafood"> Seafood</label>
                    <br />
                  </div>
                  <div className="mx-auto">
                    <input
                      type="checkbox"
                      id="Avocado"
                      value="Avocado"
                      name="AvoidIngredient"
                    />
                    <label htmlFor="Avocado"> Avocado</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Eggplant"
                      value="Eggplant"
                      name="AvoidIngredient"
                    />
                    <label htmlFor="Eggplant"> Eggplant</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Garlic"
                      value="Garlic"
                      name="AvoidIngredient"
                    />
                    <label htmlFor="Garlic"> Garlic</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Parsley"
                      value="Parsley"
                      name="AvoidIngredient"
                    />
                    <label htmlFor="Parsley"> Parsley</label>
                    <br />
                  </div>
                </form>
              </div>
              <div className="text-center font-montserrat text-3xl my-7 text-green-900 font-bold flex items-center justify-center">
                <input
                  placeholder="Anything Else?..."
                  className="block w-1/2 rounded-md border-0 py-3 pl-4 text-gray-900 placeholder:text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wood-green sm:text-sm sm:leading-6"
                  />
              </div>
            </div>
            <div className="bg-lightest-gray rounded-3xl flex-row justify-center items-center">
              <div className="flex-col mx-auto">
                <div className="text-center font-montserrat text-3xl my-7 text-green-900 font-bold">
                  I am...
                </div>
                <form className="flex flex-row font-montserrat text-2xl">
                  <div className="mx-auto">
                    <input
                      type="checkbox"
                      id="Vegan"
                      value="Vegan"
                      name="restriction"
                    />
                    <label htmlFor="Vegan"> Vegan</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Vegetarian"
                      value="Vegetarian"
                      name="restriction"
                    />
                    <label htmlFor="Vegetarian"> Vegetarian</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Diabetic"
                      value="Diabetic"
                      name="restriction"
                    />
                    <label htmlFor="Diabetic"> Diabetic</label>
                    <br />
                  </div>
                  <div className="mx-auto">
                    <input
                      type="checkbox"
                      id="Ketogenic"
                      value="Ketogenic"
                      name="restriction"
                    />
                    <label htmlFor="Ketogenic"> Ketogenic</label>
                    <br />

                    <input
                      type="checkbox"
                      id="EatingHealthy"
                      value="Eating healthy"
                      name="restriction"
                    />
                    <label htmlFor="EatingHealthy"> Eating healthy</label>
                    <br />

                    <input
                      type="checkbox"
                      id="LowFat"
                      value="Low-fat"
                      name="restriction"
                    />
                    <label htmlFor="LowFat"> Low-fat</label>
                    <br />
                  </div>
                </form>
              </div>
              <div className="text-center font-montserrat text-3xl mt-14  text-green-900 font-bold flex items-center justify-center">
                <input
                  placeholder="Anything Else?..."
                  className="block w-1/2 rounded-md border-0 py-3 pl-4 text-gray-900 placeholder:text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wood-green sm:text-sm sm:leading-6"
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
      <Link to="">
        <button
          className="flex justify-center rounded-xl mt-4 bg-wood-green px-4 py-4 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-light-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood-green"
        >
          Generate Recipe{" "}
        </button>
      </Link>
      </div>
    </div>
  );
};

export default Home;
