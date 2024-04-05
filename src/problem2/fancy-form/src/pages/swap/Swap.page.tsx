import React from 'react';
import CurrencySwapForm from "../../components/CurrencySwapForm";

type IProps ={}
const SwapPage = (props: IProps) => {
  return (
    <main className={"swap-page"}>
      <section className={"form-section"}>
        <CurrencySwapForm />
      </section>
    </main>
  );
};


export default SwapPage;
