import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { TiThMenu } from "react-icons/ti";

export const AccordionComponent = ({ children }: any) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{
        height: "100vh",
        width: expanded ? "30%" : "5%",
        display: {
          xs: "none",
          md: "block",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<TiThMenu color="#1976D2" fontSize={25} />}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: expanded ? "100%" : "50%",
          transition: "width 0.5s ease-in-out",
        }}
      ></AccordionSummary>
      <AccordionDetails
        sx={{
          display: expanded ? "block" : "none",
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
