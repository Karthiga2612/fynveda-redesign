import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Unknowns from "@/sections/Unknowns";
import IncomePercentile from "@/sections/IncomePercentile";
import Belief from "@/sections/Belief";
import StatementLedger from "@/sections/StatementLedger";
import WealthGrowth from "@/sections/WealthGrowth";
import DataFlow from "@/sections/DataFlow";
import Advisors from "@/sections/Advisors";
import Comparison from "@/sections/Comparison";
import EarlyAccess from "@/sections/EarlyAccess";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Unknowns />
      <IncomePercentile />
      <Belief />
      <StatementLedger />
      <WealthGrowth />
      <DataFlow />
      <Advisors />
      <Comparison />
      <EarlyAccess />
      <Footer />
    </main>
  );
}
