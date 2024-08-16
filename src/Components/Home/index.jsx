import React from "react";
import Card from "../Card";
import "../../App.css";

const Home = ({
  products,
  setProducts,
  categoryList,
  setCategoryList,
  isLoading,
  setIsLoading,
  searchQuery,
  setSearchQuery,
  filteredProducts,
  setFilteredProducts,
  activeCategory,
  setActiveCategory,
  sortOrder,
  setSortOrder,
  sortingList,
  handleCategorySelection,
  handleSortChanges,
  setCartItem,
  cartItem,
  setShowCart,
}) => {
  return (
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
          </span>
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
          filteredProducts.map((card) => (
            <Card
              key={card.id}
              card={card}
              cartItem={cartItem}
              setCartItem={setCartItem}
              setShowCart={setShowCart}
            />
          ))
        ) : (
          <h1>OOPs! No result found</h1>
        )}
      </div>
    </section>
  );
};

export default Home;
