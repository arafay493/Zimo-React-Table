import Table from "@/components/Table";

export default function Home() {
  return <div className="relative overflow-hidden">
    <div className="absolute top-[30%] 2xl:top-[15%] left-1/2 w-screen">
      <div className="absolute h-[520px] w-full bg-no-repeat bg-contain" style={{backgroundImage : "url(/assets/logo.png)"}}></div>
      <div className="absolute top-[20px] md:top-[60px] xl:top-[80px] 2xl:top-[140px] -left-[40px] sm:-left-[80px] h-[180px] w-[50%] 2xl:h-[260px] bg-no-repeat bg-contain" style={{backgroundImage : "url(/assets/acc.png)"}}></div>
      <div className="absolute top-[120px] md:top-[240px] xl:top-[340px] 2xl:top-[540px] -left-[40px] sm:-left-[80px] h-[180px] w-[50%] 2xl:h-[260px] bg-no-repeat bg-contain" style={{backgroundImage : "url(/assets/purchase_history.png)"}}></div>
    </div>
    <Table />
  </div>;
}
