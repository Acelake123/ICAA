import Chart from "../cart/Chart";
import Transaction from "../cart/Transaction";
import Card from "../cart/card";

export default function Overview() {
  return (
    <>
      <section className="grid grid-cols-3 grid-rows-3 gap-3 p-5 relative ">
        <Card title="Bitcoin" price="0.00" eth="1.00" />
        <Card title="Bitcoin" price="0.00" eth="1.00" />
        <Card title="Bitcoin" price="0.00" eth="1.00" />
        <Transaction />
        <Chart />
      </section>
    </>
  );
}
