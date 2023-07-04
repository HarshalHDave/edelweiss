import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React from "react";

type Props = {};

const RiskAssessment = (props: Props) => {
  const [risk, setRisk] = React.useState("hedge");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setRisk(newAlignment);
  };

  const calculatedOptions = [
    {
      id: "OPTIONID",
      price: "121.00",
    },
  ];

  return (
    <Box>
      <ToggleButtonGroup
        color="primary"
        value={risk}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="low">Low Risk</ToggleButton>
        <ToggleButton value="hedge">Hedge</ToggleButton>
        <ToggleButton value="high">High Risk</ToggleButton>
      </ToggleButtonGroup>

      <TableContainer
        sx={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden",
          width: "90%",
          marginTop: "1rem",
        }}
      >
        <Table>
          <TableHead></TableHead>
          <TableBody>
            {calculatedOptions.map((option) => (
              <TableRow>
                <TableCell sx={{ borderBottom: "1px solid #ccc" }}>
                  {option.id}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #ccc",
                    textAlign: "end",
                  }}
                >
                  ₹ {option.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RiskAssessment;
