import useGlobalState from "@/hooks/useGlobalState";
import { AreaChart, Card, Flex, Icon, Metric, Tab, TabList, Text } from "@tremor/react";
import React, { useState } from "react";
import { BiDollar } from "react-icons/bi";

type Props = {};

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const Chart = (props: Props) => {
  const [property,setProperty] = useState("currentBalance")
  const { data } = useGlobalState();
  return (
    <Card>
      <Text>Balance</Text>
      <Metric>${data[data.length-1]?.currentBalance}</Metric>

      <AreaChart
        data={data}
        categories={[property]}
        dataKey="id"
        height="h-72"
        colors={["indigo", "emerald", "rose"]}
        valueFormatter={dataFormatter}
        marginTop="mt-4"
        autoMinValue
      />
    </Card>
  );
};

export default Chart;
