import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style-card.css";
import { Card, Button } from "antd";
function CardItem({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const formatPriceWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleButtonMouseEnter = () => {
    setHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div className="link-card-item">
      <Link  to="/detail">
        <Card
          className="card-item"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {item.valuePromotion !== null && <Button className="value-promotion">-{item.valuePromotion}%</Button>}
          <img className="image-product" src={item.image} alt="..." />
          <p className="name-product">{item.nameProduct}</p>
          <p className="price-product">
            {formatPriceWithCommas(item.price)} VND
          </p>
        </Card>
      </Link >
      <Button
        className={`button-buy-now ${hovered ? "visible" : "hidden"}`}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
        onClick={""}
      >
        Mua ngay
      </Button>
    </div>
  );
}

export default CardItem;
