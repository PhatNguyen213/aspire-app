import CardLogo from "../assets/Card.svg";
import CreditLogo from "../assets/Credit.svg";
import PaymentsLogo from "../assets/Payments.svg";
import HomeLogo from "../assets/Home.svg";
import AccountLogo from "../assets/Account.svg";
import { AspireLogo } from "./Cards";

const NavigationItem = ({ logo, label }: { logo: string; label: string }) => {
  return (
    <div className="flex justify-start gap-[1rem] items-center">
      <img src={logo} alt="Aspire Logo" />
      <span className="text-base text-left">{label}</span>
    </div>
  );
};

const NavigationBar = () => {
  return (
    <nav className="bg-[#0C365A] h-full text-white">
      <div className="pl-12 py-12 pr-[55px]">
        <AspireLogo className="text-[#01D167]" />
        <p className="text-[15px] text-left opacity-30 mt-6">
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </p>
        <div className="flex flex-col gap-14 mt-[5.5rem]">
          <NavigationItem logo={HomeLogo} label="Home" />
          <NavigationItem logo={CardLogo} label="Cards" />
          <NavigationItem logo={PaymentsLogo} label="Payments" />
          <NavigationItem logo={CreditLogo} label="Credits" />
          <NavigationItem logo={AccountLogo} label="Settings" />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
