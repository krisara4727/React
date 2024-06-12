import "./card.css";
import { forwardRef } from "react";

const Card = forwardRef(({ data, refs }) => {
  return (
    <div ref={refs}>
      <img
        src={data.images["480w_still"].url}
        alt="image"
        className="card__image"
        style={{ height: "200px", width: "200px" }}
      />
    </div>
  );
});

export default Card;
