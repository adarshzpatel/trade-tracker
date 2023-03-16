import useGlobalState from '@/hooks/useGlobalState'
import { Card, Grid,Metric,Text } from '@tremor/react'
import React, { useMemo } from 'react'

type Props = {}

const Stats = (props: Props) => {
  const {data} = useGlobalState()
  const profit = useMemo(()=>{
    return data.reduce((prev,next)=>{
      return next.type === 'Profit' ?  prev + next.change : prev
    },0)
  },[data])
  const avgProfit = useMemo(()=>{
    return ((profit -data[0]?.change)/ (data.length-1)).toFixed(2)
  },[profit,data])
  const loss = useMemo(()=>{
    return data.reduce((prev,next)=>{
      return next.type === 'Loss' ?  prev + next.change : prev
    },0)
  },[data])
  const avgLoss = useMemo(()=>{
    return (loss / (data.length-1)).toFixed(2)
  },[profit,data])

  const netProfit = useMemo(()=>{
    return profit + loss - data[0]?.change
  },[profit,loss])
  return (
    <Grid className='mt-4 gap-4' >
       <Card>
        <Text>Net Change</Text>
        <Metric>${netProfit.toFixed(2)}</Metric>
      </Card>
      <Card>
        <Text>Total Profit</Text>
        <Metric>${(profit - data[0]?.change).toFixed(2)} </Metric>
      </Card>
      <Card>
        <Text>Total Loss</Text>
        <Metric>{loss}.toFixed(2)</Metric>
      </Card>
      <Card>
        <Text>Avg. Profit</Text>
        <Metric>${avgProfit}</Metric>
      </Card>
      <Card>
        <Text>Total Loss</Text>
        <Metric>${avgLoss}</Metric>
      </Card>
    </Grid>
  )
}

export default Stats