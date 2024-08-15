import React, { useState } from "react";
import "./card.css";
import StarRating from "../StarRating";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Card = ({ card, isLoading }) => {
  if (isLoading) {
    return (
      <>
        <CardLoadingSate />
        <CardLoadingSate />
        <CardLoadingSate />
        <CardLoadingSate />
        <CardLoadingSate />
        <CardLoadingSate />
      </>
    );
  }

  return (
    <div className="card-container">
      <div className="card-image">
        <img className="image-class" src={card.image} />
      </div>
      <div className="card-text-content">
        <div className="card-title">{card.title}</div>
        <div className="card-catogery">{card.category}</div>
        <div className="card-price">
          {" "}
          <div className="card-price-title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-currency-rupee"
              viewBox="0 0 16 16"
            >
              <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
            </svg>
            {card.price}
          </div>
          <span className="prev-price">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-currency-rupee"
              viewBox="0 0 16 16"
            >
              <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
            </svg>
            1100
          </span>
          <span className="card-offer">88% off</span>
        </div>
        <div className="card-ratings">
          <span
            className={`card-rating-title ${
              card.rating.rate >= 3.5 ? "good" : "bad"
            }`}
          >
            {card.rating.rate}
          </span>
          <StarRating rating={card.rating.rate} />
          <span className="card-rating-count">({card.rating.count})</span>
        </div>
      </div>
      <div className="card-btn-container">
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;

const CardLoadingSate = () => {
  return (
    <div className="card-container-loading-state">
      <Stack spacing={3}>
        <Skeleton variant="circular" width={200} height={200} />
        <Skeleton variant="rectangular" width={350} height={30} />
        <Skeleton variant="rectangular" width={350} height={30} />
        <Skeleton variant="rectangular" width={350} height={30} />
        <Skeleton variant="rectangular" width={125} height={30} />
        {/* <Skeleton variant="rounded" width={210} height={60} /> */}
      </Stack>
    </div>
  );
};
