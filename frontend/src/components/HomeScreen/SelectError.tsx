import { Box, Typography } from "@mui/material";
import tapImg from "./tap.png";

type Props = {};

const SelectError = (props: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={tapImg} alt="tap" width={200} />
      <Typography sx={{ fontSize: "1.7rem", mt: 5 }}>
        Please Select An
      </Typography>
      <Typography sx={{ fontSize: "1.7rem" }}>Index And Expiry</Typography>
    </Box>
  );
};

export default SelectError;
