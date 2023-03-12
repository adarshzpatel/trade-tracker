import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type TradeDataItem = {
  timestamp: Date;
  reason: string;
  change: number;
  delta: number;
  type: "Profit" | "Loss" | "Breakeven";
  id: number;
  currentBalance: number;
};

type GlobalContextType = {
  data: TradeDataItem[];
  addNewTrade: ((newBalance:number,reason:string) => void) 
  deleteTrade: (id:number) => void
};

export const GlobalContext = createContext<GlobalContextType>({
  data: [
    {
      currentBalance:0,
      change:0,
      delta:0,
      id:0,
      reason:"Initial",
      timestamp: new Date(),
      type:"Breakeven"
    },
  ],
  addNewTrade: (newBal:number,reason:string) => {return},
  deleteTrade: (id:number) => {return}
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<TradeDataItem[]>([]);


  useEffect(()=>{
    try {
      const savedData = localStorage.getItem("trade-tracker") || "[]"
      setData(JSON.parse(savedData) as TradeDataItem[])
    } catch(err){
      console.error(err)
    }
  },[])
  useEffect(()=>{
    if(localStorage){
      localStorage.setItem('trade-tracker',JSON.stringify(data))
    }
  },[data])

  const deleteTrade = (id:number) => {
    setData(state => state.filter(it => it.id !== id))
  }

  const getLatestBalance = () => {
    return data[data.length - 1]?.currentBalance;
  };

  const addNewTrade = (newBalance: number, reason: string) => {
    try {
;
      const timestamp = new Date();
      const id = data.length + 1
      const prevBalance = getLatestBalance() || 0;
      const change = newBalance - prevBalance;  
      const delta = (change / prevBalance) * 100;
      const newTrade:TradeDataItem = {
        id,
        timestamp,
        change,
        delta,
        type: prevBalance <= newBalance ? "Profit" : "Loss",
        reason,
        currentBalance:newBalance
      };
      setData((data) => [...data, newTrade]);
      toast.success("New trade added 🚀")
    } catch (err) {
      console.log(err);
      toast.error("Failed to add trade");
    }
  };

 
  return (
    <GlobalContext.Provider value={{ data, addNewTrade,deleteTrade }}>
      {children}
    </GlobalContext.Provider>
  );
};
