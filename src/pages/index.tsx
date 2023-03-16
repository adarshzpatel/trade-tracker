import Head from "next/head";
import { Inter } from "next/font/google";
import {
  Card,
  Col,
  Grid,
  SelectBox,
  SelectBoxItem,
} from "@tremor/react";
import Chart from "@/components/Chart/Chart";
import NewDataInput from "@/components/Input/NewDataInput";
import RecentTrades from "@/components/RecentTrades";
import useGlobalState from "@/hooks/useGlobalState";
import moment from "moment";
import { useState } from "react";
import Stats from "@/components/Stats";

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
        <Grid className="gap-4" numCols={1} numColsMd={4 }>
          <Col numColSpan={1}>
            <SelectBox
              value={selecetedDate}
              onValueChange={setSelectedDate}
              placeholder="Select Date"
              icon={undefined}
              >
              {uniqueDates.map((item) => (
                <SelectBoxItem value={item} text={item} key={`date-${item}`} />
              ))}
            </SelectBox>
            <Stats/>
          </Col>
          <Col numColSpan={1} numColSpanMd={2}>
            <Chart />
            <NewDataInput />
          </Col>
          <Col numColSpan={1}>
            <RecentTrades />
          </Col>
        </Grid>
      </main>
    </>
  );
}
