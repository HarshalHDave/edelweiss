// @ts-nocheck
import React from "react";
import { Tooltip, Typography, Box, Stack } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  border: `0.4px solid #e0e0e0`,
  // padding: 5,
  // margin: 8,
  marginTop: 2,
  // marginBottom: -4,
}));

const ColorSpot = styled("span")<{ color: string }>(({ color }) => ({
  display: "inline-block",
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: color,
  border: `1px solid black`,
  marginRight: 5,
}));

const TooltipIcon = styled("span")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: "#fffefe",
  color: "#000",
  marginLeft: "4px",
  cursor: "pointer",
  border: `1px solid #8774a2`,
});

const Legend: React.FC = () => {
  const TooltipContent: React.FC<{ heading: string; paragraph: string }> = ({
    heading,
    paragraph,
  }) => (
    <>
      <Typography variant="subtitle2" component="h4">
        {heading}
      </Typography>
      <Typography variant="body2">{paragraph}</Typography>
    </>
  );

  return (
    <StyledBox>
      <Stack
            //   spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        marginTop={1}
        marginBottom={1}
        alignContent="center"
        sx={{
          width: "100%",
        }}
      >
        <Tooltip
          title={
            <TooltipContent
              heading="In-The-Money (ITM)"
              paragraph="An option is considered 'ITM' when its strike price is favorable compared to its spot price."
            />
          }
        >
          <Typography variant="body2">
            <ColorSpot color="#f1fef5" />
            <Typography variant="body2" component="span">
              In the money
              <TooltipIcon>i</TooltipIcon>
            </Typography>
          </Typography>
        </Tooltip>
        <Tooltip
          title={
            <TooltipContent
              heading="Strike Price"
              paragraph="For call options, the strike price is where the security can be bought by the option holder; for put options, the strike price is the price at which the security can be sold."
            />
          }
        >
          <Typography variant="body2">
            <ColorSpot color="#efebe7" />
            <Typography variant="body2" component="span">
              Strike Price
              <TooltipIcon>i</TooltipIcon>
            </Typography>
          </Typography>
        </Tooltip>
        <Tooltip
          title={
            <TooltipContent
              heading="Spot Price"
              paragraph="The current market price of an underlying stock or index."
            />
          }
        >
          <Typography variant="body2">
            <ColorSpot color="#5b288b" />
            <Typography variant="body2" component="span">
              Spot Price
              <TooltipIcon>i</TooltipIcon>
            </Typography>
          </Typography>
        </Tooltip>
        <Tooltip
          title={
            <TooltipContent
              heading="Implied Volatility (IV)"
              paragraph="A metric to capture the market's view of the likelihood of a fluctuation in a given security's price."
            />
          }
        >
          <Typography variant="body2">
            <Typography variant="body2" component="span">
              Implied Volatility (IV)
              <TooltipIcon>i</TooltipIcon>
            </Typography>
          </Typography>
        </Tooltip>
        <Tooltip
          title={
            <TooltipContent
              heading="Open Interest (OI)"
              paragraph="Open Interest (OI) is the total number of open F&O contracts at the end of the trading day and it can help you understand the market trend."
            />
          }
        >
          <Typography variant="body2">
            <Typography variant="body2" component="h4">
              Open Interest (OI)
              <TooltipIcon>i</TooltipIcon>
            </Typography>
          </Typography>
        </Tooltip>
      </Stack>
    </StyledBox>
  );
};

export default Legend;
