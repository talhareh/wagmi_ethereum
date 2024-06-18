/* eslint-disable react/prop-types */
import Backdrop from "@mui/material/Backdrop";
import { RingLoader } from "react-spinners";

export default function Loading({ loading }) {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: 220000000,
        }}
        open={loading}
      >
        <RingLoader color="#a3a8a5" size={150} />
      </Backdrop>
    </div>
  );
}
