import { Box, Paper, Typography } from "@mui/material";
import ai from "./ai.png";

type Props = {};

const AIStrikePrice = (props: Props) => {
  return (
    <Paper sx={{ p: 3, mb: 10 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img src={ai} alt="ai" width={100} />
        <Typography sx={{ ml: 3, fontSize: "2rem" }}>
          <b>AI Strike Price</b>
        </Typography>
      </Box>
    </Paper>
  );
};

export default AIStrikePrice;
