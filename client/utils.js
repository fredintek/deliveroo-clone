import { groupBy } from "lodash";

export const currencyFormat = (num) => {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const groupByKey = (arr, key) => {
  return groupBy(arr, key);
};
