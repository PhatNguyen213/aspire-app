import { Children, ReactNode } from "react";
import EyeIcon from "../../assets/remove_red_eye.svg";
import DeactivateIcon from "../../assets/Deactivate card.svg";
import GPayIcon from "../../assets/GPay.svg";
import FreezeIcon from "../../assets/Freeze card.svg";
import ReplaceIcon from "../../assets/Replace card.svg";
import SpendLimitIcon from "../../assets/Set spend limit.svg";

const CarouselDot = ({
  index,
  isActive,
  onClick,
}: {
  isActive: boolean;
  index: number;
  onClick: (idx: number) => void;
}) => {
  return (
    <button
      onClick={onClick.bind(null, index)}
      className={`w-2 h-2 p-0 opacity-20 bg-[#01D167] rounded-lg ${
        isActive && "w-4 opacity-100"
      }`}
    />
  );
};

const ActionItem = ({ logo, text }: { logo: string; text: string }) => {
  return (
    <div className="flex flex-col max-w-[62px] items-center justify-center text-[13px] text-[#0C365A] gap-2">
      <button>
        <img src={logo} className="w-8 h-8" />
      </button>
      {text}
    </div>
  );
};

const Actions = () => {
  return (
    <div className="px-7 py-5 h-[116px] w-[414px] bg-[#EDF3FF] mt-[56px] rounded-2xl flex items-center justify-between">
      <ActionItem logo={FreezeIcon} text="Freeze card" />
      <ActionItem logo={SpendLimitIcon} text="Set spend limit" />
      <ActionItem logo={GPayIcon} text="Add to GPay" />
      <ActionItem logo={ReplaceIcon} text="Replace card" />
      <ActionItem logo={DeactivateIcon} text="Cancel card" />
    </div>
  );
};

export const Carousel = ({
  children,
  index,
  selectCard,
}: {
  children: ReactNode;
  index: number;
  selectCard: (id: number) => void;
}) => {
  return (
    <div className="relative">
      <div className="absolute top-[-24px] right-0 text-[14px] mb-3 text-[#01D167] font-bold flex justify-end gap-1">
        <img src={EyeIcon} />
        Show card number
      </div>
      <div className="flex flex-col gap-3">
        {children}
        <div className="flex items-center justify-center gap-2">
          {Array(Children.count(children)).map((_, idx) => (
            <CarouselDot
              isActive={index === idx}
              index={idx}
              onClick={() => selectCard(index)}
            />
          ))}
        </div>
      </div>
      <Actions />
    </div>
  );
};

export default function CardsDashBoard({ children }: { children: ReactNode }) {
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
        <div className="px-10 py-16 h-full grid grid-cols-[auto_1fr]">
          {children}
        </div>
      </div>
    </>
  );
}
