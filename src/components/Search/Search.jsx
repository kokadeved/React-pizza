import React from "react";
import { SearchContext } from "../../App";

import styles from "./Search.module.scss";

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  return (
    <div>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.valu)}
        className={styles.input}
        placeholder="Search for pizzas"
      />
    </div>
  );
};

export default Search;
