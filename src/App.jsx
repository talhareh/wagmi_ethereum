import { useContext, useEffect, useState } from "react";
import NetworkSwitch from "./utils/NetworkSwitch";
import { HeroSection, Admin } from "./pages";
import { AppContext } from "./utils/utils";
import { Route, Routes } from "react-router-dom";
import { presaleReadFunction } from "./ConnectivityAssets/hooks";
import Header from "./components/Header";

function App() {
  const { account, chainId, adminAddress, setAdminAddress } =useContext(AppContext);
  const [openNetworkSwitch, setOpenNetworkSwitch] = useState(false);

  useEffect(() => {
    if (account && chainId > 0 && chainId !== 56) {
      setOpenNetworkSwitch(true);
    }
  }, [chainId, account]);

  useEffect(() => {
    (async () => {
      try {
        const ownerAddress = await presaleReadFunction("owner");
        setAdminAddress(ownerAddress);
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NetworkSwitch open={openNetworkSwitch} setOpen={setOpenNetworkSwitch} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
            </>
          }
        />
        {/* {adminAddress?.toLowerCase() === account?.toLowerCase() */}
        { 1===1 && (
          <Route
            path="/admin"
            element={
              <>
                <Header />
                <Admin />
              </>
            }
          />
        )}
      </Routes>
    </>
  );
}

export default App;
