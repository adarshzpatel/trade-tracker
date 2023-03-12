import useGlobalState from "@/hooks/useGlobalState";
import {
  Callout,
  Card,
  Col,
  Flex,
  Icon,
  Title,
} from "@tremor/react";
import moment from "moment";
import React from "react";
import { BiTrash } from "react-icons/bi";
type Props = {};

const RecentTrades = (props: Props) => {
  const { data,deleteTrade } = useGlobalState();
  return (
    <Card>
      <Title>Recent Trades</Title>
      <Col>
        {data?.map((it, index) => (
          <div  key={`ro-${it.id}`} className="flex gap-4 justify-between group">
            <div className="flex-1">

            <Callout
              title={`$ ${it?.change.toFixed(2)} ${it?.type} ${moment(
                it.timestamp
                ).calendar()}`}
                text={it.reason}
                color={`${it.type === "Profit" ? "emerald" : "red"}`}
                marginTop="mt-2"
                />
                </div>
            <button onClick={()=>deleteTrade(it.id)} className="hidden group-hover:block w-0 group-hover:w-10 -rotate-12 hover:scale-110 active:scale-100 hover:rotate-0 duration-300 transition-transform">
            <Icon icon={BiTrash} variant="outlined" color="red"/>
            </button>
          </div>
        ))}
      </Col>
    </Card>
  );
};

export default RecentTrades;
