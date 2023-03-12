import Head from "next/head";
import { Inter } from "next/font/google";
import {
  Card,
  Col,
  ColGrid,
  SelectBox,
  SelectBoxItem,
  Title,
} from "@tremor/react";
import Chart from "@/components/Chart/Chart";
import NewDataInput from "@/components/Input/NewDataInput";
import RecentTrades from "@/components/RecentTrades";
import useGlobalState from "@/hooks/useGlobalState";
import moment from "moment";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selecetedDate, setSelectedDate] = useState(
    moment(new Date()).calendar()
  );
  const { data } = useGlobalState();
  const uniqueDates = [
    ...new Set(data.map((item) => moment(item?.timestamp).format("L"))),
  ];

  return (
    <>
      <main>
        <ColGrid gapX="gap-x-4" gap-gapY="gap-y-4" numCols={4}>
          <Col numColSpan={1}>
            <SelectBox
              value={selecetedDate}
              onValueChange={setSelectedDate}
              placeholder="Select Date"
              icon={undefined}
              maxWidth="max-w-none"
              marginTop="mt-0"
            >
              {uniqueDates.map((item) => (
                <SelectBoxItem value={item} text={item} key={`date-${item}`} />
              ))}
            </SelectBox>
          </Col>
          <Col numColSpan={2}>
            <Chart />
            <NewDataInput />
          </Col>
          <Col numColSpan={1}>
            <RecentTrades />
          </Col>
        </ColGrid>
      </main>
    </>
  );
}
