import VisaLogo from "../assets/Visa.svg";
import TransactionsIcon from "../assets/transactions.svg";
import DeactivateIcon from "../assets/Deactivate card.svg";
import GPayIcon from "../assets/GPay.svg";
import FreezeIcon from "../assets/Freeze card.svg";
import ReplaceIcon from "../assets/Replace card.svg";
import SpendLimitIcon from "../assets/Set spend limit.svg";
import TopSection, { AspireLogo } from "./dashboard/TopSection";
import CardsDashBoard, { Carousel } from "./dashboard/Dashboard";
import TransactionDetails, {
  DetailPanel,
} from "./dashboard/TransactionDetails";
import { getCardInfomation, setFreezeStatus } from "../api/apiClient";
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

const VisaCard = ({ card, isActive }: { card: Card; isActive: boolean }) => {
  if (!isActive) return null;
  return (
    <div
      className={`transition-colors p-7 w-[414px] h-[248px] bg-[#01D167] rounded-lg flex flex-col justify-between ${
        card.freeze ? "bg-[#AAAAAA]" : ""
      }`}
    >
      <AspireLogo className="text-white ml-auto w-[85px] h-[25px]" />
      <p className="text-left text-white font-bold tracking-[0.58px] text-2xl">
        {card.name}
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
        <span className="tracking-[1.56px]">{card.thru}</span>
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
  number: string;
  transactions: Transaction[];
  freeze: boolean;
}

export interface CardInfo {
  balance: string;
  cards: Card[];
}

const ActionItem = ({
  logo,
  text,
  onClick,
}: {
  logo: string;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <div className="flex flex-col max-w-[62px] items-center justify-center text-[13px] text-[#0C365A] gap-2">
      <button onClick={onClick}>
        <img src={logo} className="w-8 h-8" />
      </button>
      {text}
    </div>
  );
};

const Actions = ({
  cardId,
  freeze,
  setData,
}: {
  cardId?: string;
  freeze?: boolean;
  setData: (data: CardInfo) => void;
}) => {
  return (
    <div className="px-7 py-5 h-[116px] w-[414px] bg-[#EDF3FF] rounded-2xl flex items-center justify-between">
      <ActionItem
        onClick={() => setFreezeStatus(cardId).then(setData)}
        logo={FreezeIcon}
        text={`${freeze ? "Unfreeze" : "Freeze"} card`}
      />
      <ActionItem logo={SpendLimitIcon} text="Set spend limit" />
      <ActionItem logo={GPayIcon} text="Add to GPay" />
      <ActionItem logo={ReplaceIcon} text="Replace card" />
      <ActionItem logo={DeactivateIcon} text="Cancel card" />
    </div>
  );
};

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
      <TopSection setData={setData} />
      <CardsDashBoard>
        <div className="flex flex-col gap-6">
          <Carousel index={activeCard} selectCard={setActiveCard}>
            {cards?.map((card, index) => (
              <VisaCard isActive={activeCard === index} card={card} />
            ))}
          </Carousel>
          <Actions
            setData={setData}
            freeze={cards && cards[activeCard].freeze}
            cardId={cards && cards[activeCard].id}
          />
        </div>
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
