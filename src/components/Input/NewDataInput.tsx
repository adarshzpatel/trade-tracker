import useGlobalState from "@/hooks/useGlobalState";
import { Button, Card, TextInput, Title } from "@tremor/react";
import React, { ChangeEvent, useState } from "react";

type Props = {};

const NewDataInput = (props: Props) => {
  const [newBal, setNewBal] = useState<string>("0.00");
  const [reason, setReasaon] = useState<string>("");
  const { addNewTrade } = useGlobalState();
  const allowed = "0123456789.-"
  
  const handleNewBalChange = (e:ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setNewBal(val)
    console.log(val)
  }

  return (
    <Card marginTop="mt-4">
      <Title>Update Current Balance</Title>
      <form onSubmit={(e)=>{e.preventDefault();addNewTrade(Number(newBal),reason)}}>

      <TextInput
      marginTop="mt-4"
      id="newBal"
      name="newBal"
      
      value={newBal}
      onChange={handleNewBalChange}
      />
      <TextInput
        id="reason"
        name="reason"
        value={reason}
        placeholder="Why did i take this trade ?"
        onChange={(e) => setReasaon(e.target.value)}
        marginTop="mt-4"
        />
      <Button type="submit" variant="primary" marginTop="mt-4" >
        Add Trade
      </Button>
        </form>
    </Card>
  );
};

export default NewDataInput;
