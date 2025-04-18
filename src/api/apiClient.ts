import card from "./mock.json";

export const getCardInfomation = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(card), 1500);
  });
};
