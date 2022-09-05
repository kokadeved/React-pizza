import React from "react";
import { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/Pizzablock";
import "../scss/app.scss";
import { Skeleton } from "../components/Pizzablock/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/filterSlice";

const Home = () => {
  const categoryId = useSelector((state) => state.ffilter.categoryId);
  const sortType = useSelector((state) => state.ffilter.sort.sortProperty);
  const dispatch = useDispatch();

  // let url = `https://63109ae6826b98071a45be60.mockapi.io/ite?category=${categoryId}`;
  const [pizzas, setPizza] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setIsPending(true);

    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    // const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://63109ae6826b98071a45be60.mockapi.io/item?category=${categoryId}&sort${sortType}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setPizza(data);
        setIsPending(false);
      });

    //IIFE
    // (function (url) {
    //   fetch(url)
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //       setPizza(data);
    //       setIsPending(false);
    //     });
    // })(url);

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          // onClickCategory={(id) => setCategoryId(id)}
          onClickCategory={onChangeCategory}
        />
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
    </div>
  );
};

export default Home;
