import React, {useEffect, useRef, useState} from 'react';
import CurrencySwapForm from "../../components/CurrencySwapForm";
import "./Swap.style.css"
import {useSize} from "ahooks";

type IProps ={}
const SwapPage = (props: IProps) => {
  
  const refToolPageDetail = useRef(null);
  const size = useSize(refToolPageDetail);

  useEffect(() => {
    if (window.VANTA) {
      window.VANTA.HALO({
        el: "#swap-page-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        size: 1.8,
        minHeight: size?.height,
        minWidth: size?.width
      })
    }
  }, [size]);
  
  return (
    <main id={"swap-page-bg"} className={"swap-page"} ref={refToolPageDetail}>
      <section className={"form-section"}>
        <CurrencySwapForm />
      </section>
    </main>
  );
};


export default SwapPage;
