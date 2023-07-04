import { Box, Paper, Typography } from "@mui/material";
import ai from "./ai.png";

type Props = {
  value: string;
};

const AIStrikePrice = (props: Props) => {
  return (
    <Paper sx={{ p: 3, mb: 10 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img src={ai} alt="ai" width={64} />
        <Typography sx={{ ml: 3, fontSize: "1.5rem" }}>
          <b>₹ {(Number(props.value ? props.value : 0) / 100).toFixed(2)} /-</b>
        </Typography>
      </Box>
    </Paper>
  );
};

export default AIStrikePrice;
