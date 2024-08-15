import { Star } from "lucide-react";

const StarRating = ({ rating = 1 }) => {
  const stars = Array(5)
    .fill(null)
    .map((_, index) => {
      if (index < rating) {
        return <Star key={index} size={24} color="lightgray" fill="yellow" />;
      } else {
        return <Star key={index} size={24} color="lightgray" fill="none" />;
      }
    });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "4px",
      }}
    >
      {stars}
    </div>
  );
};

export default StarRating;
