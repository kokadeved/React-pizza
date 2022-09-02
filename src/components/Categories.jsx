import React from "react";

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const kindOfPizza = ["All", "Pepperoni", "Cheese", "Mexicano", "Carbonara"];

  return (
    <div className="categories">
      <ul>
        {kindOfPizza.map((item, index) => {
          return (
            <li
              onClick={() => setActiveIndex(index)}
              key={index}
              className={activeIndex === index ? "active" : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
