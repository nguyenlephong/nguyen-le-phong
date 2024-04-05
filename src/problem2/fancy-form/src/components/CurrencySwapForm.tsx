import React, {useEffect} from 'react';
import {PriceItemType, SwapFormDataType} from "configs/app.type";
import {SubmitHandler, useForm} from "react-hook-form"
import {MdSwapVert} from "react-icons/md";
import {Avatar, Button, Dropdown, List, message, Spin} from "antd";
import {SEOs} from "configs/app.conf";
import {RiArrowDropDownLine} from "react-icons/ri";
import {useQuery} from "@tanstack/react-query";
import {getListOfPrices} from "services/Prices.service";
import {useSetState} from "ahooks";
import uniqBy from "lodash/uniqBy"

type IProps = {}
type IState = {
  swap: boolean,
}
const CurrencySwapForm = (props: IProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, setState] = useSetState<IState>({
    swap: false
  })
  
  const {data: listOfPrices, isLoading} = useQuery<PriceItemType[]>({
    queryKey: ['getListOfPrices'], queryFn: getListOfPrices,
    retry: false
  })
  
  const {
    watch,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm<SwapFormDataType>({
    defaultValues: {
      fromCurrency: "BUSD",
      toCurrency: "LUNA",
    }
  })
  
  useEffect(() => {
    if (listOfPrices && listOfPrices?.length > 0) {
      const subscription = watch((value, {name, type}) => {
          if (name === "amountToSend") {
            const item = listOfPrices.find(x => x.currency === getValues("fromCurrency"))
            if (!item) return;
            const amountReceive = (Number(value.amountToSend) || 0) * item.price
            setValue("amountToReceive", amountReceive)
          }
        }
      )
      return () => subscription.unsubscribe()
    }
  }, [watch, listOfPrices])
  
  const onSubmit: SubmitHandler<SwapFormDataType> = (data) => {
    messageApi.open({
      type: 'success',
      content: `Swap ${data.amountToSend} ${data.fromCurrency} to ${data.amountToReceive} ${data.toCurrency} successful!`,
    }).then();
  }
  
  const onChangeCurrency = (item: PriceItemType, field: keyof SwapFormDataType) => {
    setValue(field, item.currency)
    if (field === "fromCurrency") {
      const amountSend = getValues("amountToSend")
      const amountReceive = amountSend * item.price
      setValue("amountToReceive", amountReceive)
    }
    
    if (field === "toCurrency") {
      const amountSend = getValues("amountToSend")
      const amountReceive = amountSend * item.price
      setValue("amountToReceive", amountReceive)
    }
  }
  
  const onSwapPosition = () => {
    setState({swap: !state.swap})
    const fromValue = getValues("fromCurrency")
    setValue("fromCurrency", getValues("toCurrency"))
    setValue("toCurrency", fromValue)
  }
  
  return (
    <>
      <form className={"form-container"} onSubmit={handleSubmit(onSubmit)}>
        {contextHolder}
        <h2 className={"form-title"}>Swap</h2>
        
        <Spin spinning={isLoading}>
          <div className="form-field">
            <label htmlFor="from" className={"lbf"}>Amount to send</label>
            <div className={"field-wrap-row"}>
              <input
                required={true}
                min={0}
                type={"number"}
                className={"f-input borderless"}
                {...register("amountToSend")}
              />
              
              <Dropdown
                overlayStyle={{
                  minWidth: 260,
                  maxHeight: 420,
                  overflow: "auto",
                  borderRadius: 8
                }}
                key={watch("fromCurrency")}
                rootClassName={"currency-dropdown-container"}
                dropdownRender={() => (
                  <div className={"dropdown-list-container"}>
                    <List
                      itemLayout="horizontal"
                      dataSource={
                        uniqBy(listOfPrices, 'currency')
                          .filter(x => x.currency !== getValues("toCurrency"))
                      }
                      renderItem={(item) => (
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
                )}
                destroyPopupOnHide={true}
                placement="bottomRight">
                <Button size={"large"} className={"currency-dropdown-btn"}
                        style={{background: "transparent", color: "#fff"}}>
                  <div className={"btn-icon-dropdown"}>
                    <div
                      key={watch("fromCurrency")}
                      className={"d-row-gap"}>
                      <img
                        alt={getValues("fromCurrency") + SEOs.altImg}
                        className={"t-logo"}
                        src={`/photos/tokens/${getValues("fromCurrency")}.svg`}
                        width={24}
                        height={24}
                      />
                      <p className="t-label">{getValues("fromCurrency")}</p>
                    </div>
                    <RiArrowDropDownLine size={24}/>
                  </div>
                </Button>
              </Dropdown>
            
            </div>
          </div>
        </Spin>
        
        <div className={"form-action"}>
          <div
            className={"switch-currency-btn"}
            onClick={onSwapPosition}
          >
            <MdSwapVert size={32} color={"#02172D"}/>
          </div>
        </div>
        
        <Spin spinning={isLoading}>
          <div className="form-field">
            <label htmlFor="from" className={"lbf"}>Amount to receive</label>
            <div className={"field-wrap-row"}>
              <input
                min={0}
                required={true}
                type={"number"}
                disabled={true}
                className={"f-input borderless"}
                {...register("amountToReceive")}
              />
              
              <Dropdown
                overlayStyle={{
                  minWidth: 260,
                  maxHeight: 420,
                  overflow: "auto",
                  borderRadius: 8
                }}
                key={watch("toCurrency")}
                destroyPopupOnHide={true}
                rootClassName={"currency-dropdown-container"}
                dropdownRender={() => (
                  <div className={"dropdown-list-container"}>
                    <List
                      itemLayout="horizontal"
                      dataSource={
                        uniqBy(listOfPrices, 'currency')
                          .filter(x => x.currency !== getValues("fromCurrency"))
                      }
                      renderItem={(item) => (
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
                <Button
                  size={"large"}
                  className={"currency-dropdown-btn"}
                  style={{background: "transparent", color: "#fff"}}
                >
                  <div className={"btn-icon-dropdown"}>
                    <div className={"d-row-gap"}>
                      <img
                        alt={getValues("toCurrency") + SEOs.altImg}
                        className={"t-logo"}
                        src={`/photos/tokens/${getValues("toCurrency")}.svg`}
                        width={24}
                        height={24}
                      />
                      <p className="t-label">{getValues("toCurrency")}</p>
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
    </>
  );
};


export default CurrencySwapForm;

