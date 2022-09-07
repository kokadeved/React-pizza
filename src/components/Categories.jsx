import React from "react";

const Categories = ({ categoryId, onClickCategory }) => {
  const kindOfPizza = ["All", "Pepperoni", "Cheese", "Mexicano", "Carbonara"];

  return (
    <div className="categories">
      <ul>
        {kindOfPizza.map((item, index) => {
          return (
            <li
              onClick={() => onClickCategory(index)}
              key={index}
              className={categoryId === index ? "active" : ""}
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
