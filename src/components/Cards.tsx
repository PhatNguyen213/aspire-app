import { ReactNode } from "react";
import AddIcon from "../assets/box.svg";

const TopSection = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-end text-left text-base">{children}</div>;
};

const CardsDashBoard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex mt-[34px] gap-6">
        <p className="cursor-pointer text-[#222222] text-[14px] font-['Avenir_Next'] font-bold border-b-[2px] border-[#23CEFD]">
          My debit cards
        </p>
        <p className="text-[#222222] text-[14px] font-['Avenir_Next'] opacity-30 cursor-not-allowed">
          My company cards
        </p>
      </div>
      <div className="w-full min-h-[767px] mt-4 border border-[#FCFCFC] rounded-lg shadow-[0_2px_12px_#00000014]">
        {children}
      </div>
    </>
  );
};

const AvailableBalance = () => {
  return (
    <div>
      <p>Available balance</p>
      <div className="flex items-center gap-3">
        <span className="w-[40px] h-[24px] bg-[#01D167] text-[13px] inline-flex justify-center items-center text-white">
          S$
        </span>
        <span className="text-[26px] font-bold">3,000</span>
      </div>
    </div>
  );
};

const AddCardButton = () => {
  return (
    <button className="flex items-center ml-auto gap-2 bg-[#325BAF] font-semibold text-[13px] text-white">
      <img src={AddIcon} />
      New card
    </button>
  );
};

const Cards = () => {
  return (
    <main className="bg-white p-[3.75rem]">
      <TopSection>
        <AvailableBalance />
        <AddCardButton />
      </TopSection>
      <CardsDashBoard>
        <div className="p-10 h-full grid grid-cols-2">
          <div>
            <div className="w-[414px] h-[248px] bg-[#01D167] rounded-lg" />
          </div>
          <div>Hello 1</div>
        </div>
      </CardsDashBoard>
    </main>
  );
};

export default Cards;
