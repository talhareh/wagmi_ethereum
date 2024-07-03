/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useAccount, useNetwork, useBalance} from "wagmi";


let initialState = {
  account: null,
  chainIdArray: [],
  chainId: 0,
  bnbBalance:null,
  usdtBalance:null
};

export const AppContext = createContext(initialState);

export const ConectivityProvider = ({ children }) => {
  const { address, isDisconnected } = useAccount();
  const { chains, chain } = useNetwork();
  const { data: usdtData} = useBalance({
                                            address,
                                            token: '0x55d398326f99059fF775485246999027B3197955',
                                            chainId:56
                                          })
  //console.log(usdtBalance)
  const {data: bnbData} =useBalance({address})
  //console.log(bnbBalance)
  const chainIds = chains?.map((info) => info?.id);
  const [state, setState] = useState(initialState);
  const [adminAddress, setAdminAddress] = useState("");


  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      account: address ?? null,
      bnbBalance: bnbData?.formatted ?? null,
      usdtBalance: usdtData?.formatted ?? null
    }));
  }, [isDisconnected, address, bnbData, usdtData]);

  
  return (
    <AppContext.Provider
      value={{
        account: state.account,
        chainIdArray: chainIds,
        chainId: chain?.id,
        adminAddress,
        setAdminAddress,
        bnbBalance: state.bnbBalance,
        usdtBalance: state.usdtBalance
        
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
