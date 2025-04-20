import { Children, ReactNode, useState } from "react";
import EyeIcon from "../../assets/remove_red_eye.svg";

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

const withDefaultClass = (extraClass?: string) =>
  `col-start-1 col-end-1 row-start-1 row-end-1 ${extraClass || ""}`;

const getAnimatingCarouselCss = (direction?: "next" | "previous") => {
  if (direction === "next")
    return withDefaultClass(
      "transition-all duration-200 ease-out translate-x-[30%] opacity-0"
    );
  if (direction === "previous")
    return withDefaultClass(
      "transition-all duration-200 ease-out translate-x-[-30%] opacity-0"
    );
  return withDefaultClass();
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
  const [animating, setAnimating] = useState<"next" | "previous" | undefined>(
    undefined
  );
  return (
    <div className="relative">
      <div className="absolute top-[-24px] right-0 text-[14px] mb-3 text-[#01D167] font-bold flex justify-end gap-1">
        <img src={EyeIcon} />
        Show card number
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid place-items-center">
          <div
            onTransitionEnd={() => setAnimating(undefined)}
            className={`w-[414px] h-[248px] bg-[#01D167] rounded-lg ${
              animating === "next"
                ? withDefaultClass(
                    "transition-all duration-400 ease-out translate-x-[0%] opacity-100"
                  )
                : withDefaultClass("translate-x-[-50%] opacity-0")
            }`}
          >
            {animating === "next" ? Children.toArray(children)[index] : null}
          </div>
          {Children.map(children, (child, idx) => {
            return (
              <div className={getAnimatingCarouselCss(animating)} key={idx}>
                {child}
              </div>
            );
          })}
          <div
            onTransitionEnd={() => setAnimating(undefined)}
            className={`w-[414px] h-[248px] bg-[#01D167] rounded-lg ${
              animating === "previous"
                ? withDefaultClass(
                    "transition-all duration-400 ease-out translate-x-[0%] opacity-100"
                  )
                : withDefaultClass("translate-x-[50%] opacity-0")
            }`}
          >
            {animating === "previous"
              ? Children.toArray(children)[index]
              : null}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          {Array.from(Array(Children.count(children))).map((_, idx) => (
            <CarouselDot
              key={idx}
              isActive={index === idx}
              index={idx}
              onClick={() => {
                if (idx < index) setAnimating("previous");
                else setAnimating("next");
                selectCard(idx);
              }}
            />
          ))}
        </div>
      </div>
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
