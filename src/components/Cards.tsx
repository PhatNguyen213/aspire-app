import VisaLogo from "../assets/Visa.svg";
import TransactionsIcon from "../assets/transactions.svg";
import TopSection, { AspireLogo } from "./dashboard/TopSection";
import CardsDashBoard, { Carousel } from "./dashboard/Dashboard";
import TransactionDetails, {
  DetailPanel,
} from "./dashboard/TransactionDetails";
import { getCardInfomation } from "../api/apiClient";
import { useEffect, useState } from "react";

const FourDotsGroup = () => {
  return (
    <span className="inline-flex gap-1">
      <Dot />
      <Dot />
      <Dot />
      <Dot />
    </span>
  );
};

const Dot = () => (
  <span className="inline-block w-2.5 h-2.5 rounded-full bg-white" />
);

const VisaCard = ({
  name,
  thru,
  isActive,
}: {
  name: string;
  thru: string;
  isActive: boolean;
}) => {
  if (!isActive) return null;
  return (
    <div className="p-7 w-[414px] h-[248px] bg-[#01D167] rounded-lg flex flex-col justify-between">
      <AspireLogo className="text-white ml-auto w-[85px] h-[25px]" />
      <p className="text-left text-white font-bold tracking-[0.58px] text-2xl">
        {name}
      </p>
      <div className="flex gap-6 items-center">
        <FourDotsGroup />
        <FourDotsGroup />
        <FourDotsGroup />
        <p className="tracking-[3.46px] text-white text-[14px] font-bold">
          2020
        </p>
      </div>
      <div className="flex gap-2 items-center text-white text-[13px] leading-5 font-bold">
        <span className="tracking-[0.31px]">Thru:</span>
        <span className="tracking-[1.56px]">{thru}</span>
        <span className="ml-12 tracking-[0.31px]">CVV:</span>
        <span className="text-[24px] tracking-[2.88px]">***</span>
      </div>
      <img src={VisaLogo} className="ml-auto" />
    </div>
  );
};

export interface Transaction {
  name: string;
  date: string;
  amount: number;
}

interface Card {
  id: string;
  name: string;
  thru: string;
  transactions: Transaction[];
}

interface CardInfo {
  balance: string;
  cards: Card[];
}

const Cards = () => {
  const [data, setData] = useState<CardInfo>();
  const [activeCard, setActiveCard] = useState<number>(0);
  useEffect(() => {
    async function fetchData() {
      const card = await getCardInfomation();
      if (card) setData(card as CardInfo);
    }
    fetchData();
  }, []);
  const { cards } = data || {};
  return (
    <main className="bg-white p-[3.75rem]">
      <TopSection />
      <CardsDashBoard>
        <Carousel index={activeCard} selectCard={setActiveCard}>
          {cards?.map((card, index) => (
            <VisaCard
              isActive={activeCard === index}
              name={card.name}
              thru={card.thru}
            />
          ))}
        </Carousel>
        <TransactionDetails>
          <DetailPanel
            transactions={cards?.length ? cards[activeCard].transactions : []}
            logo={TransactionsIcon}
            text="Recent transactions"
          />
        </TransactionDetails>
      </CardsDashBoard>
    </main>
  );
};

export default Cards;
