import { CardInfo } from "../components/Cards";
import card from "./mock.json";
import { v4 as uuidv4 } from "uuid";

const KEY = "aspireapp";

const getData = (): CardInfo => {
  const data = localStorage.getItem(KEY);
  if (!data) {
    localStorage.setItem(KEY, JSON.stringify(card.account));
    return card.account;
  }
  return JSON.parse(data);
};

export const getCardInfomation = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getData()), 1000);
  });
};

export const addNewCard = (name: string): Promise<CardInfo> => {
  return new Promise((resolve) => {
    const data = getData();
    if (data) {
      const newCards = data.cards.concat({
        id: uuidv4(),
        name,
        thru: "11/25",
        number: "**** **** **** 3120",
        transactions: [],
      });
      const newData = { ...data, cards: newCards };
      localStorage.setItem(KEY, JSON.stringify(newData));
      resolve(newData);
    }
  });
};
