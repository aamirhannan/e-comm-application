import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./place-order-modal.css";
import { CartContext } from "../userContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
};

export default function PlaceOrderModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
}) {
  const { user } = useContext(CartContext);
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <div className="place-order-modal">
          <h1>Order Placed Successfully</h1>
        </div>
      </Box>
    </Modal>
  );
}
