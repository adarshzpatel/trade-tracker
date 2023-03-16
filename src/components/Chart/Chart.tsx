import useGlobalState from "@/hooks/useGlobalState";
import {
  AreaChart,
  Card,
  Flex,
  Icon,
  Metric,
  ProgressBar,
  Tab,
  TabList,
  Text,
} from "@tremor/react";
import React, { useState } from "react";
import { BiDollar } from "react-icons/bi";

type Props = {};

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const Chart = (props: Props) => {
  const [property, setProperty] = useState("currentBalance");
  const { data } = useGlobalState();
  const target = 2000
  const currentBal = data[data.length-1]?.currentBalance
  const progress = (currentBal / target) * 100
  return (
    <Card>
      <Text>Balance</Text>
        <Metric>${currentBal}</Metric>
        <Flex className="mt-4">
          <Text className="truncate">{`${progress.toFixed(2)}% ($ ${currentBal})`}</Text>
          <Text>${target}</Text>
        </Flex>
        <ProgressBar percentageValue={progress} className="mt-2" color="indigo" />

      <AreaChart
        data={data}
        categories={[property]}
        index="id"
        colors={["indigo", "emerald", "rose"]}
        valueFormatter={dataFormatter}
        autoMinValue
      />
    </Card>
  );
};

export default Chart;
