import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ChildSelectionPopup from "../components/ChildSelectionPopup";
import MenuSelectionPopup from "../components/MenuSelectionPopup";
import PatientSelectionPopup from "../components/PatientSelectionPopup";
import axios from 'axios';


const Home = () => {
  const { user } = useAuthContext();
  const [showPopup, setShowPopup] = useState(false);
  const [children, setChildren] = useState([]);
  const [menus, setMenus] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null); // New state for selected child
  const [category, setCategory] = useState(""); // State for selected category
  const [categoryInput, setCategoryInput] = useState(""); // State for text input field
  const [avoiding, setAvoiding] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [avoidAnythingElse, setAvoidAnythingElse] = useState("");
  const [restrictionAnythingElse, setRestrictionAnythingElse] = useState("");
  const [userPrompt, setUserPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/${user.email}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchChildren = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/familyMember`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await response.json();
      setChildren(data);
      setLoading(false);
      setShowPopup(data.length > 0);
    } catch (error) {
      console.error("Failed to fetch children data:", error);
      setLoading(false);
    }
  };

  const fetchMenus = async () => {
    // Fetch menus logic here
  };

  const fetchPatients = async () => {
    // Fetch patients logic here
  };

  useEffect(() => {
    fetchUserData();
  }, [user.token]);

  useEffect(() => {
    if (userData) {
      if (userData.role === "Individual") {
        fetchChildren();
      } else if (userData.role === "Professional") {
        fetchMenus();
      } else if (userData.role === "Dietitian") {
        fetchPatients();
      }
    }
  }, [userData]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    if (selectedChild) {
      console.log("Selected Child:", selectedChild);
    }
  }, [selectedChild]);

  const handleChildSelect = (childName) => {
    setSelectedChild(childName);
    setShowPopup(false); // Close popup after selection
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCategoryInput(""); // Clear text input when a radio button is selected
  };

  const handleCategoryInputChange = (e) => {
    setCategoryInput(e.target.value);
    setCategory(""); // Clear selected radio button when text input is changed
  };

  const handleAvoidingChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAvoiding([...avoiding, value]);
    } else {
      setAvoiding(avoiding.filter((item) => item !== value));
    }
  };

  const handleRestrictionsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRestrictions([...restrictions, value]);
    } else {
      setRestrictions(restrictions.filter((item) => item !== value));
    }
  };

  async function generateRecipePrompt() {
    const selectedCategory = category || categoryInput;
    const selectedChildDetails = children.find(
      (child) => child.name === selectedChild
    );
    const prompt = `
    Generate a recipe for the category: ${selectedCategory} for a ${
      selectedChildDetails.age
    } years old.
    Please avoid the following ingredients: ${[...avoiding, avoidAnythingElse]
      .filter(Boolean)
      .join(", ")}, ${
      selectedChildDetails ? selectedChildDetails.unlikedIngredients : ""
    }.
    Consider the following dietary restrictions: ${[
      ...restrictions,
      restrictionAnythingElse,
    ]
      .filter(Boolean)
      .join(", ")}, ${
      selectedChildDetails ? selectedChildDetails.dietaryRestrictions : ""
    }.
    It would be great if the recipe could include some of the favorite ingredients: ${
      selectedChildDetails ? selectedChildDetails.favoriteIngredients : ""
    }, if relevant.
    The recipe should be nutritious, delicious, and suitable for a child of this age. Please provide clear instructions and a list of necessary ingredients.
    If possible, suggest some variations or tips for making the recipe even more appealing to children.
    Thank you!
  `;
  setUserPrompt(prompt);
  console.log(prompt);

    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_API_URL}/api/chat`,
      //   { prompt },
      //   {
      //     headers: { Authorization: `Bearer ${user.token}` },
      //   }
      // );
      // console.log(response.data.result);
      setApiResponse('THIS IS A RECIPE!');
      // navigate("/api-response")
      navigate("/api-response", { state: { prompt, apiResponse: 'THIS IS A RECIPE!' } });
    } catch (error) {
      // console.error("Error:", error.message);
    }
  }

  return (
    <div className="bg-gray-bg h-screen justify-center items-center pt-4">
      <div className="bg-white rounded-3xl w-7/12 mx-auto p-5">
        <div className="flex flex-col mx-auto gap-3">
          <div className="bg-lightest-gray rounded-3xl justify-center items-center">
            <div className="flex-col mx-auto">
              <div className="text-center font-montserrat text-3xl my-7 text-green-900 font-bold">
                What do you want to eat today, {user.firstName}?
              </div>
              {loading && <div>Loading...</div>}
              <div>
                {showPopup && userData && userData.role === "Individual" && (
                  <ChildSelectionPopup
                    children={children}
                    onClose={togglePopup}
                    onSelectChild={handleChildSelect}
                  />
                )}
              </div>
              {showPopup && userData && userData.role === "Professional" && (
                <MenuSelectionPopup menus={menus} onClose={togglePopup} />
              )}
              {showPopup && userData && userData.role === "Dietitian" && (
                <PatientSelectionPopup
                  patients={patients}
                  onClose={togglePopup}
                />
              )}

              <form className="flex flex-row font-montserrat text-2xl">
                <div className="mx-auto">
                  <input
                    type="radio"
                    id="Appetizers"
                    value="Appetizers"
                    name="foodCategory"
                    checked={category === "Appetizers"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="Appetizers"> Appetizers</label>
                  <br />

                  <input
                    type="radio"
                    id="Salads"
                    value="Salads"
                    name="foodCategory"
                    checked={category === "Salads"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="Salads"> Salads</label>
                  <br />

                  <input
                    type="radio"
                    id="Main-courses"
                    value="Main-courses"
                    name="foodCategory"
                    checked={category === "Main-courses"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="Main-courses"> Main-courses</label>
                  <br />
                  <input
                    type="radio"
                    id="Side-dish"
                    value="Side-dish"
                    name="foodCategory"
                    checked={category === "Side-dish"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="Side-dish"> Side-dish</label>
                  <br />
                  <input
                    type="radio"
                    id="Pasta"
                    value="Pasta"
                    name="foodCategory"
                    checked={category === "Pasta"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="Pasta"> Pasta</label>
                  <br />
                </div>

                <div className="mx-auto">
                  <input
                    type="radio"
                    id="snacks"
                    name="foodCategory"
                    value="Snacks"
                    checked={category === "Snacks"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="snacks"> Snacks</label>
                  <br />

                  <input
                    type="radio"
                    id="soups"
                    name="foodCategory"
                    value="Soups"
                    checked={category === "Soups"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="soups"> Soups</label>
                  <br />

                  <input
                    type="radio"
                    id="breakfast"
                    name="foodCategory"
                    value="Breakfast"
                    checked={category === "Breakfast"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="breakfast"> Breakfast</label>
                  <br />

                  <input
                    type="radio"
                    id="lunch"
                    name="foodCategory"
                    value="Lunch"
                    checked={category === "Lunch"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="lunch"> Lunch</label>
                  <br />

                  <input
                    type="radio"
                    id="dinner"
                    name="foodCategory"
                    value="Dinner"
                    checked={category === "Dinner"}
                    onChange={handleCategoryChange}
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
                    checked={category === "Breads"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="breads"> Breads</label>
                  <br />

                  <input
                    type="radio"
                    id="sandwiches"
                    name="foodCategory"
                    value="Sandwiches"
                    checked={category === "Sandwiches"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="sandwiches"> Sandwiches</label>
                  <br />

                  <input
                    type="radio"
                    id="cookies"
                    name="foodCategory"
                    value="Cookies"
                    checked={category === "Cookies"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="cookies"> Cookies</label>
                  <br />

                  <input
                    type="radio"
                    id="cakes"
                    name="foodCategory"
                    value="Cakes"
                    checked={category === "Cakes"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="cakes"> Cakes</label>
                  <br />

                  <input
                    type="radio"
                    id="desserts"
                    name="foodCategory"
                    value="Desserts"
                    checked={category === "Desserts"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="desserts"> Desserts</label>
                  <br />
                </div>
              </form>
              <div className="text-center font-montserrat text-3xl my-7 text-green-900 font-bold flex items-center justify-center">
                <input
                  type="text"
                  placeholder="It's not listed, let me just type it..."
                  className="block w-1/2 rounded-md border-0 py-3 pl-4 text-gray-900 placeholder:text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wood-green sm:text-sm sm:leading-6"
                  value={categoryInput}
                  onChange={handleCategoryInputChange}
                />
              </div>
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
                      onChange={handleAvoidingChange}
                    />
                    <label htmlFor="Gluten"> Gluten</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Dairy"
                      value="Dairy"
                      name="AvoidIngredient"
                      onChange={handleAvoidingChange}
                    />
                    <label htmlFor="Dairy"> Dairy</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Eggs"
                      value="Eggs"
                      name="AvoidIngredient"
                      onChange={handleAvoidingChange}
                    />
                    <label htmlFor="Eggs"> Eggs</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Nuts"
                      value="Nuts"
                      name="AvoidIngredient"
                      onChange={handleAvoidingChange}
                    />
                    <label htmlFor="Nuts"> Nuts</label>
                    <br />
                  </div>

                  <div className="mx-auto">
                    <input
                      type="checkbox"
                      id="Sesame"
                      value="Sesame"
                      name="AvoidIngredient"
                      onChange={handleAvoidingChange}
                    />
                    <label htmlFor="Sesame"> Sesame</label>
                    <br />

                    <input
                      type="checkbox"
                      id="SoyBeans"
                      value="Soy Beans"
                      name="AvoidIngredient"
                      onChange={handleAvoidingChange}
                    />
                    <label htmlFor="SoyBeans"> Soy Beans</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Fish"
                      value="Fish"
                      name="AvoidIngredient"
                      onChange={handleAvoidingChange}
                    />
                    <label htmlFor="Fish"> Fish</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Seafood"
                      value="Seafood"
                      name="AvoidIngredient"
                      onChange={handleAvoidingChange}
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
                      onChange={handleAvoidingChange}
                    />
                    <label htmlFor="Avocado"> Avocado</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Eggplant"
                      value="Eggplant"
                      name="AvoidIngredient"
                      onChange={handleAvoidingChange}
                    />
                    <label htmlFor="Eggplant"> Eggplant</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Garlic"
                      value="Garlic"
                      name="AvoidIngredient"
                      onChange={handleAvoidingChange}
                    />
                    <label htmlFor="Garlic"> Garlic</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Parsley"
                      value="Parsley"
                      name="AvoidIngredient"
                      onChange={handleAvoidingChange}
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
                  value={avoidAnythingElse}
                  onChange={(e) => setAvoidAnythingElse(e.target.value)}
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
                      onChange={handleRestrictionsChange}
                    />
                    <label htmlFor="Vegan"> Vegan</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Vegetarian"
                      value="Vegetarian"
                      name="restriction"
                      onChange={handleRestrictionsChange}
                    />
                    <label htmlFor="Vegetarian"> Vegetarian</label>
                    <br />

                    <input
                      type="checkbox"
                      id="Diabetic"
                      value="Diabetic"
                      name="restriction"
                      onChange={handleRestrictionsChange}
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
                      onChange={handleRestrictionsChange}
                    />
                    <label htmlFor="Ketogenic"> Ketogenic</label>
                    <br />

                    <input
                      type="checkbox"
                      id="EatingHealthy"
                      value="Eating healthy"
                      name="restriction"
                      onChange={handleRestrictionsChange}
                    />
                    <label htmlFor="EatingHealthy"> Eating healthy</label>
                    <br />

                    <input
                      type="checkbox"
                      id="LowFat"
                      value="Low-fat"
                      name="restriction"
                      onChange={handleRestrictionsChange}
                    />
                    <label htmlFor="LowFat"> Low-fat</label>
                    <br />
                  </div>
                </form>
              </div>
              <div className="text-center font-montserrat text-3xl mt-14 text-green-900 font-bold flex items-center justify-center">
                <input
                  placeholder="Anything Else?..."
                  className="block w-1/2 rounded-md border-0 py-3 pl-4 text-gray-900 placeholder:text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wood-green sm:text-sm sm:leading-6"
                  value={restrictionAnythingElse}
                  onChange={(e) => setRestrictionAnythingElse(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={generateRecipePrompt}
          className="flex justify-center rounded-xl mt-4 bg-wood-green px-4 py-4 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-light-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood-green"
        >
          Generate Recipe{" "}
        </button>
      </div>
    </div>
  );
};

export default Home;
