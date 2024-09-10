import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import SelectableSection from "../components/SelectableSection";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [children, setChildren] = useState([]);
  const [menus, setMenus] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [category, setCategory] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const [avoiding, setAvoiding] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [restrictionAnythingElse, setRestrictionAnythingElse] = useState("");
  const [avoidAnythingElse, setAvoidAnythingElse] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [userType, setUserType] = useState(null);
  const [gridColumns, setGridColumns] = useState("");

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const categoriesArray = [
    "Appetizers",
    "Salads",
    "Main Courses",
    "Side dishes",
    "Stir-Fry",
    "Pasta",
    "Snacks",
    "Soups",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Breads",
    "Sandwiches",
    "Cookies",
    "Cakes",
    "Desserts",
    "Smoothies",
    "Grilling",
    "Casseroles",
    "Pizza",
    "Wraps & Rolls",
    "One-Pot Meals",
    "Comfort Food",
    "Seafood",
  ];

  const restrictionsArray = [
    "Gluten",
    "Dairy",
    "Eggs",
    "Nuts",
    "Sesame",
    "Soy Beans",
    "Fish",
    "Seafood",
    "Avocado",
    "Eggplant",
    "Garlic",
    "Parsley",
  ];

  const lifestylesArray = [
    "Vegan",
    "Vegetarian",
    "Diabetic",
    "Paleo",
    "Ketogenic",
    "High-Protein",
    "Eating Healthy",
    "Low-fat",
  ];

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
      if (data.length > 0) {
        if (userData && userData.age) {
          setUserType("family");
        } else {
          setUserType("justKids");
        }
      } else {
        setUserType("justMe");
      }
    } catch (error) {
      console.error("Failed to fetch children data:", error);
      setLoading(false);
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/menu`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await response.json();
      setMenus(data);
      setUserType("pro");
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch menus data:", error);
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    // Fetch patients logic here
  };

  // Update gridColumns after userType is set
  useEffect(() => {
    if (userType && userData.role === "Individual" && children.length) {
      setGridColumns(
        children.length >= 2
          ? `grid grid-cols-2 md:grid-cols-${
              userType === "family" ? children.length + 1 : children.length
            } gap-x-5 gap-y-2 md:gap-x-10`
          : `grid grid-cols-${
              userType === "family" ? "2" : "1"
            } gap-x-5 gap-y-2 md:gap-x-10`
      );
    }

    if (userType && userData.role === "Professional" && menus.length) {
      setGridColumns(`grid grid-cols-2 md:grid-cols-${menus.length} gap-x-5 gap-y-2 md:gap-x-10`);
    }
  }, [userType, children, menus]);

  useEffect(() => {
    fetchUserData();
  }, [user.token]);

  useEffect(() => {
    // fetch appropriate data according to role
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

  useEffect(() => {
    //used for debugging
    if (selectedChild) {
      console.log("Selected Child:", selectedChild);
    }
    if (selectedMenu) {
      console.log("Selected Menu:", selectedMenu);
    }
    if (category) {
      console.log("Selected category:", category);
    }
    if (avoiding) {
      console.log("Selected avoiding:", avoiding);
    }
    if (restrictions) {
      console.log("Selected restrictions:", restrictions);
    }
    if (gridColumns) {
      console.log("grid cols:", gridColumns);
    }
    if (userType) {
      console.log("User Type is:", userType);
    }
  }, [selectedChild, selectedMenu, category, avoiding, restrictions, userType, gridColumns]);

  const handleChildSelect = (selection) => {
    if (selection !== userData.firstName) {
      setSelectedChild(selection);
    } else {
      setSelectedChild(userData);
    }
  };

  const handleMenuSelect = (selection) => {
    setSelectedMenu(selection);
  };

  const handlePatientSelect = (selection) => {};

  const handleCategorySelect = (selectedCategory, selectedOptions) => {
    setCategory(selectedCategory);
    setCategoryInput(""); // Clear input if a category is selected
  };

  const handleAvoidingSelect = (selectedAvoiding, selectedOptions) => {
    setAvoiding(selectedOptions);
  };

  const handleLifestyleSelect = (selectedLifestyle, selectedOptions) => {
    setRestrictions(selectedOptions);
  };

  const showError = () => {
    setError(true);
    setTimeout(function () {
      setError(false);
    }, 5000);
  };

  async function generateRecipePrompt() {
    setLoading(true);
    const selectedCategory = category || categoryInput;

    const individualPropmt = (selectedCategory, selectedData) => {
      const prompt = `
      Generate a recipe for the category: ${selectedCategory} for a ${
        selectedData.age
      } years old.
      Please avoid the following ingredients: ${[...avoiding, avoidAnythingElse]
        .filter(Boolean)
        .join(", ")}, ${selectedData ? selectedData.unlikedIngredients : ""}.
      Consider the following dietary restrictions: ${[
        ...restrictions,
        restrictionAnythingElse,
      ]
        .filter(Boolean)
        .join(", ")}, ${selectedData ? selectedData.dietaryRestrictions : ""}.
      If relevant and suitable for the recipe type, include some of the favorite ingredients: ${
        selectedData ? selectedData.favoriteIngredients : ""
      }. If these ingredients are not appropriate for the recipe, please omit them.
      The recipe should be nutritious, delicious, easy to prepare and age appropriate. Please provide clear instructions and a list of necessary ingredients.
      If possible, suggest some variations or tips for making the recipe even more appealing to individual in the age of ${
        selectedData.age
      }.
      **IMPORTANT:** Please format the recipe using proper HTML tags. Use <h1> for the recipe title, <h2> for section titles like "Ingredients" and "Instructions", <ul> and <ol> for lists, and <p> for additional notes. Do **not** include <html>, <head>, <body>, or other unnecessary HTML elements. The response should only include the recipe content in HTML.
      Thank you!
    `;
      return prompt;
    };

    const professionalPropmt = (selectedCategory) => {
      const prompt = `
      I’m a professional chef looking to create a recipe for my restaurant that caters to individuals with specific dietary restrictions.
      Please create a ${selectedCategory} recipe for a ${selectedMenu} menu that avoids the following allergens and ingredients: ${[...avoiding, avoidAnythingElse]}. 
      The recipe should adhere to ${[...restrictions, restrictionAnythingElse]} lifestyle.
      I prefer more traditional and recognizable ingredients that are commonly used in fine dining, rather than unconventional options. Focus on creativity,
      flavor balance, and presentation while keeping the recipe grounded in ingredients that are approachable for a professional restaurant setting.
      The recipe should be detailed, including ingredient measurements, and presented in a way that is practical for fine-dining plating, and also delicious. 

      **IMPORTANT:** Please format the recipe using proper HTML tags. Use <h1> for the recipe title, <h2> for section titles like "Ingredients" and "Instructions",
      <ul> and <ol> for lists, and <p> for additional notes. Do **not** include <html>, <head>, <body>, or other unnecessary HTML elements.
      The response should only include the recipe content in HTML.
      Thank you!`;

      return prompt;
    };

    async function callAiAPI(prompt, selectionData) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/chat`,
          { prompt },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        console.log(response.data.result);
        setApiResponse(response.data.result);
        navigate("/api-response", {
          state: {
            userFirstName: user.firstName,
            selectedCategory,
            apiResponse: response.data.result,
            selectionData,
          },
        });
      } catch (error) {
        console.error("Error:", error.message);
      }
      // console.log("generated prompt:", prompt)
    }

    console.log(userType);

    switch (userType) {
      case "justMe":
        {
          const generatedPrompt = individualPropmt(selectedCategory, userData);
          setUserPrompt(generatedPrompt);
          console.log(generatedPrompt);
          callAiAPI(generatedPrompt, userData);
        }
        break;
      case "family":
        {
          if (selectedChild.name) {
            const selectedChildDetails = children.find(
              (child) => child.name === selectedChild
            );
            const generatedPrompt = individualPropmt(
              selectedCategory,
              selectedChildDetails
            );
            setUserPrompt(generatedPrompt);
            console.log(generatedPrompt);
            callAiAPI(generatedPrompt, selectedChildDetails);
          } else {
            const generatedPrompt = individualPropmt(
              selectedCategory,
              userData
            );
            setUserPrompt(generatedPrompt);
            console.log(generatedPrompt);
            callAiAPI(generatedPrompt, userData);
          }
        }
        break;
      case "justKids":
        {
          const selectedChildDetails = children.find(
            (child) => child.name === selectedChild
          );
          const generatedPrompt = individualPropmt(
            selectedCategory,
            selectedChildDetails
          );
          setUserPrompt(generatedPrompt);
          console.log(generatedPrompt);
          callAiAPI(generatedPrompt, selectedChildDetails);
        }
        break;
      case "pro":
        {
          const selectedMenuDetails = menus.find(
            (menu) => menu.name === selectedMenu
          );

          const generatedPrompt = professionalPropmt(selectedCategory);
          setUserPrompt(generatedPrompt);
          console.log(generatedPrompt);
          console.log(selectedMenu)
          callAiAPI(generatedPrompt, selectedMenuDetails);
        }
        break;
      case "dietitian":
        {
        }
        break;
      default:
        console.log(`Something went wrong generating prompt`);
    }
  }

  return (
    <div className="md:px-10 xl:px-64">
      {loading && (
        <div className="fixed inset-0 mt-16 bg-white bg-opacity-50 flex justify-center items-center">
          {
            <dotlottie-player
              src="https://lottie.host/6b28fa19-0ef9-4105-9034-51916a5a97e2/Qx8yCbiZXs.json"
              background="transparent"
              speed="1"
              style={{ width: "150px", height: "150px" }}
              direction="1"
              playMode="normal"
              loop
              autoplay
            ></dotlottie-player>
          }
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-x-14 px-5">
        {/* Child/Menu/Patient Selection Section */}
        {gridColumns && children.length > 0 && (
          <>
            <div className="lg:col-span-2">
              <SelectableSection
                label="Who's Hungry?"
                options={
                  userData
                    ? userData.age
                      ? children
                          .map((child) => child.name)
                          .concat(userData.firstName)
                      : children.map((child) => child.name)
                    : children.map((child) => child.name)
                }
                onSelect={handleChildSelect}
                allowMultiple={false}
                gridColumns={gridColumns}
              />
            </div>
          </>
        )}
        {gridColumns && menus.length > 0 && (
          <>
            <div className="lg:col-span-2">
              <SelectableSection
                label="Which menu?"
                options={menus.map((menu) => menu.name)}
                onSelect={handleMenuSelect}
                allowMultiple={false}
                gridColumns={gridColumns}
              />
            </div>
          </>
        )}
        {gridColumns && patients.length > 0 && (
          <>
            <div className="lg:col-span-2">
              <SelectableSection
                label="Who's Hungry?"
                options={patients.map((patient) => patient.name)}
                onSelect={handlePatientSelect}
                allowMultiple={false}
                gridColumns={gridColumns}
              />
            </div>
          </>
        )}
        {/* Category Selection Section */}
        <div className="lg:col-span-2">
          <SelectableSection
            label="Let's pick a category!"
            options={categoriesArray}
            onSelect={handleCategorySelect}
            allowMultiple={false}
            gridColumns="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-x-5 gap-y-2 md:gap-x-10"
          />
        </div>

        {/* Avoiding Ingredients Selection Section */}
        <div className="lg:col-span-1">
          <SelectableSection
            label="Allergens and ingredients to avoid?"
            options={restrictionsArray}
            onSelect={handleAvoidingSelect}
            allowMultiple={true}
            appendInput={true}
            gridColumns="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-2 md:gap-x-5"
          />
          <div className="text-center my-3">
            <input
              type="text"
              placeholder="Anything Else?..."
              className="w-full rounded-md py-3 pl-4 focus:ring-2 focus:ring-inset focus:ring-green-600 placeholder:text-md shadow-md placeholder:text-gray-500"
              value={avoidAnythingElse}
              onChange={(e) => setAvoidAnythingElse(e.target.value)}
            />
          </div>
        </div>

        {/* Lifestyle Selection Section */}
        <div className="lg:col-span-1">
          <SelectableSection
            label="Specific Lifestyle?"
            options={lifestylesArray}
            onSelect={handleLifestyleSelect}
            allowMultiple={true}
            appendInput={true}
            gridColumns="grid grid-cols-2 gap-x-5 gap-y-2 md:gap-x-5"
          />
          <div className="text-center my-3">
            <input
              type="text"
              placeholder="Anything Else?..."
              className="w-full rounded-md py-3 pl-4 focus:ring-2 focus:ring-inset focus:ring-green-600 placeholder:text-md shadow-md placeholder:text-gray-500"
              value={restrictionAnythingElse}
              onChange={(e) => setRestrictionAnythingElse(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <div className="">
          <button
            onClick={userType === "pro" ? (
              !category || !selectedMenu ? showError : generateRecipePrompt
            ) : !category || !selectedChild ? showError : generateRecipePrompt
            }
            className={`w-full text-center rounded-md py-3 px-12 text-sm lg:text-lg text-white shadow-md bg-green-600 hover:bg-green-700`}
          >
            Generate Recipe
          </button>
        </div>
      </div>
      <div className="flex justify-center pt-2">
        {error && (
          <div className="text-red-800">
            Forgot to Choose Something?
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
