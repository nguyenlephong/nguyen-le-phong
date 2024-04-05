import React from 'react';
import {PriceItemType, SwapFormDataType} from "configs/app.type";
import {SubmitHandler, useForm} from "react-hook-form"
import {MdSwapVert} from "react-icons/md";
import {Avatar, Button, Dropdown, List, Spin} from "antd";
import {SEOs} from "configs/app.conf";
import {RiArrowDropDownLine} from "react-icons/ri";
import {useQuery} from "@tanstack/react-query";
import {getListOfPrices} from "services/Prices.service";
import {useSetState} from "ahooks";
import uniqBy from "lodash/uniqBy"

type IProps = {}
type IState = {
  swap: boolean
}
const CurrencySwapForm = (props: IProps) => {
  const [state, setState] = useSetState<IState>({
    swap: false
  })
  
  const {data: listOfPrices, isLoading} = useQuery<PriceItemType[]>({
    queryKey: ['getListOfPrices'], queryFn: getListOfPrices,
    retry: false
  })
  
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm<SwapFormDataType>()
  
  const onSubmit: SubmitHandler<SwapFormDataType> = (data) => {
    console.log(data)
  }
  
  const onChangeCurrency = (item: PriceItemType, field: keyof SwapFormDataType) => {
    setValue(field, item.currency)
  }
  
  const onSwapPosition = () => {
    setState({swap: !state.swap})
    const fromValue = getValues("fromCurrency")
    setValue("fromCurrency", getValues("toCurrency"))
    setValue("toCurrency", fromValue)
    
  }
  
  return (
    <form className={"form-container"} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={"form-title"}>Swap</h2>
      
      <Spin spinning={isLoading}>
        <div className="form-field">
          <label htmlFor="from" className={"lbf"}>Amount to send</label>
          <div className={"field-wrap-row"}>
            <input type={"number"} className={"f-input borderless"} defaultValue="0.0" {...register("amountToSend")} />
            <Dropdown
              overlayStyle={{
                minWidth: 260,
                maxHeight: 420,
                overflow: "auto",
                borderRadius: 8
              }}
              rootClassName={"currency-dropdown-container"}
              dropdownRender={() => (
                <div className={"dropdown-list-container"}>
                  <List
                    itemLayout="horizontal"
                    dataSource={uniqBy(listOfPrices, 'currency')}
                    renderItem={(item, index) => (
                      <List.Item
                        onClick={() => onChangeCurrency(item, "fromCurrency")}
                        style={{padding: "8px 12px", cursor: "pointer"}}>
                        <List.Item.Meta
                          style={{alignItems: "center"}}
                          avatar={<Avatar src={`/photos/tokens/${item.currency}.svg`}/>}
                          title={<p className={"t-label"}>{item.currency}</p>}
                          description={item.price}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              )} placement="bottomRight">
              <Button size={"large"} className={"currency-dropdown-btn"} style={{background: "transparent", color: "#fff"}}>
                <div className={"btn-icon-dropdown"}>
                  <div className={"d-row-gap"}>
                    <img alt={"1INCH" + SEOs.altImg} className={"t-logo"} src={"/photos/tokens/1INCH.svg"} width={24}
                         height={24}/>
                    <p className="t-label">1INCH</p>
                  </div>
                  <RiArrowDropDownLine size={24}/>
                </div>
              </Button>
            </Dropdown>
          
          </div>
        </div>
      </Spin>
      
      <div className={"form-action"}>
        <button className={"switch-currency-btn"} onClick={onSwapPosition}>
          <MdSwapVert size={32} color={"#02172D"}/>
        </button>
      </div>
      
      <Spin spinning={isLoading}>
        <div className="form-field">
          <label htmlFor="from" className={"lbf"}>Amount to receive</label>
          <div className={"field-wrap-row"}>
            <input type={"number"} className={"f-input borderless"}
                   defaultValue="0.0" {...register("amountToReceive")} />
            <Dropdown
              overlayStyle={{
                minWidth: 260,
                maxHeight: 420,
                overflow: "auto",
                borderRadius: 8
              }}
              rootClassName={"currency-dropdown-container"}
              dropdownRender={() => (
                <div className={"dropdown-list-container"}>
                  <List
                    itemLayout="horizontal"
                    dataSource={uniqBy(listOfPrices, 'currency')}
                    renderItem={(item, index) => (
                      <List.Item
                        onClick={() => onChangeCurrency(item, "toCurrency")}
                        style={{padding: "8px 12px", cursor: "pointer"}}>
                        <List.Item.Meta
                          style={{alignItems: "center"}}
                          avatar={<Avatar src={`/photos/tokens/${item.currency}.svg`}/>}
                          title={<p className={"t-label"}>{item.currency}</p>}
                          description={item.price}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              )} placement="bottomRight">
              <Button size={"large"} className={"currency-dropdown-btn"} style={{background: "transparent", color: "#fff"}}>
                <div className={"btn-icon-dropdown"}>
                  <div className={"d-row-gap"}>
                    <img alt={"1INCH" + SEOs.altImg} className={"t-logo"} src={"/photos/tokens/1INCH.svg"} width={24}
                         height={24}/>
                    <p className="t-label">1INCH</p>
                  </div>
                  <RiArrowDropDownLine size={24}/>
                </div>
              </Button>
            </Dropdown>
          
          </div>
        
        </div>
      </Spin>
      
      <div className="form-action">
        <button type={"submit"} className={"form-button"}>Confirm Swap</button>
      </div>
    </form>
  );
};


export default CurrencySwapForm;

