import DetailsIcon from "../../assets/card-details.svg";
import BusinessIcon from "../../assets/business-and-finance.svg";
import FileStorageIcon from "../../assets/file-storage.svg";
import NextIcon from "../../assets/next.svg";
import DownArrowIcon from "../../assets/down-arrow.svg";
import UpArrowIcon from "../../assets/up-arrow.svg";
import { ReactNode, useState } from "react";
import { Transaction as Trans } from "../Cards";

const Transaction = ({
  logo,
  name,
  date,
  amount,
}: {
  logo: string;
  name: string;
  date: string;
  amount: number;
}) => {
  return (
    <div className="p-6 min-h-[100px]">
      <div className="flex items-center gap-4">
        <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-[#009DFF1A]">
          <img src={logo} />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[14px] font-semibold">{name}</span>
          <span className="text-[13px] text-[#AAAAAA]">{date}</span>
        </div>
        <span className="ml-auto text-[14px] font-bold text-[#01D167]">
          {amount}
        </span>
        <img src={NextIcon} alt="Next" />
      </div>
      <div className="mt-3 pl-[64px] flex text-[#325BAF] text-[12px] font-semibold gap-2">
        <div className="w-[24px] h-[20px] bg-[#325BAF] rounded-[12px] flex items-center justify-center">
          <img className="w-[10px] h-[10px]" src={BusinessIcon} />
        </div>
        {amount > 0 ? "Refund on debit card" : "Charged to debit card"}
      </div>
    </div>
  );
};

export const DetailPanel = ({
  logo,
  text,
  disabled = false,
  transactions,
}: {
  logo: string;
  text: string;
  disabled?: boolean;
  transactions?: Trans[];
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="w-[366px] min-w-[50%]">
      <div className="h-[72px] shadow-[0_0_8px_#0000000A] text-[14px] text-[#0C365A] flex items-center gap-3 p-7 rounded-lg  bg-[#F5F9FF]">
        <img src={logo} />
        {text}
        <button
          className="ml-auto"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <img src={expanded ? DownArrowIcon : UpArrowIcon} />
        </button>
      </div>
      <div
        className={`grid grid-rows-[0fr] transition-[grid-template-rows] ease-out duration-500 ${
          expanded && !disabled && "grid-rows-[1fr]"
        }`}
      >
        <div className="overflow-hidden border border-t-0 border-[#F0F0F0]">
          {transactions?.map(({ name, date, amount }, index) => (
            <Transaction
              key={index}
              name={name}
              date={date}
              amount={amount}
              logo={FileStorageIcon}
            />
          ))}
          <div className="bg-[#DDFFEC] rounded-lg border border-[#DDFFEC] text-[#01D167] text-[13px] font-semibold px-[103px] py-4">
            View all card transactions
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TransactionDetails({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 px-[40px]">
      <DetailPanel disabled logo={DetailsIcon} text="Card details" />
      {children}
    </div>
  );
}
