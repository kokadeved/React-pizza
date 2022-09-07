import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/Pizzablock";
import "../scss/app.scss";
import { Skeleton } from "../components/Pizzablock/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filterSlice";
import axios from "axios";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.ffilter
  );
  // const sortType = sort.sortProperty;
  const dispatch = useDispatch();
  const searchValue = useContext(SearchContext);
  const [pizzas, setPizza] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const fetchPizzas = () => {
    setIsPending(true);
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://63109ae6826b98071a45be60.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((resp) => {
        setPizza(resp.data);
        setIsPending(false);
      });

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">pizza</h2>
      <div className="content__items">
        {/* {isPending ? Skeleton : pizzas} */}
        {isPending
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza) => (
              <PizzaBlock
                key={pizza.imageUrl}
                // object as a props
                {...pizza}
              />
            ))}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default Home;
