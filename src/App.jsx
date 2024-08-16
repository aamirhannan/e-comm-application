import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import axios from "axios";
import StarRating from "./Components/StarRating";
import Card from "./Components/Card";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import { CartContext } from "./Components/userContext";

function App() {
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [showCart, setShowCart] = useState(false);

  // console.log(CartContext);

  const { cartItem, setCartItem, clearCartItem } = useContext(CartContext);
  console.log(cartItem);

  const sortingList = [
    { label: "Price: Low to High", value: "LOWTOHIGH" },
    { label: "Price: High to Low", value: "HIGHTOLOW" },
    { label: "Popularity", value: "POPULARITY" },
    { label: "Ratings", value: "RATINGS" },
  ];
  const [userAddress, setUserAddress] = useState({
    name: "",
    phoneNo: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [cartSummary, setCartSummary] = useState({
    totalItems: 0,
    totalPrice: 0,
    discountPrice: 0,
    deliveryCharge: 0,
    totalCost: 0,
    prevAppliedDiscount: 0,
  });

  const [discountCouponValue, setDiscountCouponValue] = useState(null);

  const updateCartSummary = () => {
    let totalItems = 0;
    let totalPrice = 0;
    let totalCostBeforeDiscounts = 0;

    // Calculate totals from cart items
    cartItem.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
      totalCostBeforeDiscounts += item.price * item.quantity;
    });

    // Generate random values for discount and delivery charge
    const discountPrice = 33;
    const deliveryCharge = 40;
    setCartSummary({
      totalItems,
      totalPrice,
      discountPrice,
      deliveryCharge,
      totalCost: Number(
        totalCostBeforeDiscounts -
          discountPrice +
          deliveryCharge -
          discountCouponValue +
          7
      ).toFixed(2),
    });
  };

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
        const updateData = data.map((singleData) => ({
          ...singleData,
          quantity: 0,
          totalPrice: singleData.price,
          discount: Math.trunc(Math.random() * 100 + 1),
        }));
        setProducts(updateData);
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

  // const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const result = products.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(query)
      )
    );
    setFilteredProducts(result);
  }, [searchQuery, products]);

  useEffect(() => {
    console.log("sort", sortOrder);
  }, [sortOrder]);

  return (
    <div>
      <Header
        setSearchQuery={setSearchQuery}
        cartItem={cartItem}
        setShowCart={setShowCart}
      />

      {showCart ? (
        <Cart
          setCartItem={setCartItem}
          cartItem={cartItem}
          userAddress={userAddress}
          setUserAddress={setUserAddress}
          setShowCart={setShowCart}
          cartSummary={cartSummary}
          setCartSummary={setCartSummary}
          updateCartSummary={updateCartSummary}
          discountCouponValue={discountCouponValue}
          setDiscountCouponValue={setDiscountCouponValue}
        />
      ) : (
        <Home
          products={products}
          setProducts={setProducts}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortingList={sortingList}
          handleSortChanges={handleSortChanges}
          handleCategorySelection={handleCategorySelection}
          setCartItem={setCartItem}
          cartItem={cartItem}
          setShowCart={setShowCart}
        />
      )}

      {showCart === false && <Footer />}
    </div>
  );
}

export default App;
