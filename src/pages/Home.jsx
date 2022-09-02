import React from "react";
import { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/Pizzablock";
import "../scss/app.scss";
import { Skeleton } from "../components/Pizzablock/Skeleton";

let url = "https://63109ae6826b98071a45be60.mockapi.io/item";

const Home = () => {
  const [pizzas, setPizza] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    //IIFE
    (function (url) {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          setPizza(data);
          setIsPending(false);
        });
    })(url);

    // just fetch data

    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setPizza(data);
    //     setIsPending(false);
    //   });
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">pizza</h2>
      <div className="content__items">
        {isPending
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza) => (
              <PizzaBlock
                key={pizza.imageUrl}
                // object as a props
                {...pizza}
              />
            ))}
      </div>
    </>
  );
};

export default Home;
