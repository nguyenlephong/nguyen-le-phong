import React, {useEffect, useRef} from 'react';
import CurrencySwapForm from "../../components/CurrencySwapForm";
import "./Swap.style.css"
import {useSize} from "ahooks";

const SwapPage = () => {
  
  const refToolPageDetail = useRef(null);
  const size = useSize(refToolPageDetail);

  useEffect(() => {
    if (window.VANTA && size?.width && size?.height) {
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
