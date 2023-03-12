import { GlobalContext } from "@/contexts/GlobalContext";
import { useContext } from "react";

const useGlobalState = () => {
  return useContext(GlobalContext);
};

export default useGlobalState;
