import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import axios from "axios";
import StarRating from "./Components/StarRating";
import Card from "./Components/Card";
function App() {
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const sortingList = [
    { label: "Price: Low to High", value: "LOWTOHIGH" },
    { label: "Price: High to Low", value: "HIGHTOLOW" },
    { label: "Popularity", value: "POPULARITY" },
    { label: "Ratings", value: "RATINGS" },
  ];

  // Fetching data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");

        const data = await response.data;

        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category))
        ).sort();

        setCategoryList(uniqueCategories);
        setProducts(data);
        window.localStorage.setItem("products", JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleCategorySelection = (category) => {
    setActiveCategory(category);
    setSearchQuery(category);
  };

  const handleSortChanges = (sortOption) => {
    const sortedProducts = [...filteredProducts]; // Create a shallow copy
    setSortOrder(sortOption);
    switch (sortOption) {
      case "LOWTOHIGH":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "HIGHTOLOW":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "POPULARITY":
        sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
        break;
      case "RATINGS":
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        console.log("Unknown sort option");
    }

    setFilteredProducts(sortedProducts); // Update state with sorted products
  };

  useEffect(() => {
    // Filter products based on search query
    const query = searchQuery.toLowerCase();
    const result = products.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(query)
      )
    );
    setFilteredProducts(result);
  }, [searchQuery, products]);

  useEffect(() => {
    // Save filtered products to local storage
    console.log("sort", sortOrder);
  }, [sortOrder]);

  return (
    <div>
      <Header setSearchQuery={setSearchQuery} />
      <section className="body-container">
        <div className="card-filter-section">
        
          <div className="category-section">
            <span
              onClick={() => {
                console.log(categoryList);
              }}
              className="category-title"
            >
              Category
            </span>{" "}
            <span className="category-card-container">
              {categoryList.map((category, index) => (
                <span
                  onClick={() => handleCategorySelection(category)}
                  key={`category ${index}`}
                  className={`category-card ${
                    activeCategory === category ? "active" : ""
                  }`}
                >
                  {category}
                </span>
              ))}
              <span
                onClick={() => {
                  setActiveCategory(null);
                  setSortOrder(null);
                  setSearchQuery("");
                }}
                className="category-card"
              >
                Reset
              </span>
            </span>
          </div>

          <div className="sort-section">
            <span className="sort-title">Sort by:</span>
            <span className="sort-card-container">
              {sortingList.map((list, index) => (
                <span
                  key={`sort ${index}`}
                  onClick={() => {
                    const sortOption = list.value;
                    handleSortChanges(sortOption);
                  }}
                  className={`sort-card ${
                    sortOrder === list.value ? "active" : ""
                  }`}
                >
                  {list.label}
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className="card-body-container">
          {isLoading ? (
            <Card key={121} isLoading={isLoading} />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((card) => <Card key={card.id} card={card} />)
          ) : (
            <h1>OOPs! No result found</h1>
          )}
        </div>
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
