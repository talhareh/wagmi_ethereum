/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useAccount, useNetwork, useBalance} from "wagmi";


let initialState = {
  account: null,
  chainIdArray: [],
  chainId: 0,
  balance:null
};

export const AppContext = createContext(initialState);

export const ConectivityProvider = ({ children }) => {
  const { address, isDisconnected } = useAccount();
  const { chains, chain } = useNetwork();
  

  const chainIds = chains?.map((info) => info?.id);
  

  const [state, setState] = useState(initialState);
  const [adminAddress, setAdminAddress] = useState("");


  useEffect(() => {
    setState({
      account: address ?? null,
    });
  }, [isDisconnected, address]);
  
  return (
    <AppContext.Provider
      value={{
        account: state.account,
        chainIdArray: chainIds,
        chainId: chain?.id,
        adminAddress,
        setAdminAddress,
        
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
