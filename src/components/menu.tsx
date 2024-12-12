import { Button, SwipeableDrawer } from "@mui/material";
import { useState } from "react";
// import { CiMenuBurger } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

interface DrawerProps {
  children: any;
  display: string;
}

export const DrawerComponent = ({ children, display }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        sx={{
          display: {
            md: display,
          },
        }}
        onClick={onOpen}
      >
        <FaSearch />
      </Button>

      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        PaperProps={{ sx: { width: "100%" } }}
      >
        <Button sx={{
          width:'100%',
          display:"flex",
          justifyContent: "flex-start"
        }} onClick={onClose}>
          <FaArrowLeft fontSize={28} />
        </Button>
        {children}
      </SwipeableDrawer>
    </>
  );
};
