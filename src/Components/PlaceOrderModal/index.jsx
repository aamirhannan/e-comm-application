import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./place-order-modal.css";
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
  const [userAddress, setUserAddress] = useState([
    {
      id: 1,
      name: "John",
      email: "john@example.com",
      address: "1745 T Street Southeast",
      phoneNo: "9876543210",
      city: "New York",
      state: "NY",
      postalCode: "10017",
    },
    {
      id: 2,
      name: "John",
      address1: "1745 T Street Southeast",
      phoneNo: "9876543210",
      email: "john@example.com",
      city: "New York",
      state: "NY",
      postalCode: "10017",
    },
    {
      id: 3,
      name: "John",
      address1: "1745 T Street Southeast",
      phoneNo: "9876543210",
      email: "john@example.com",
      city: "New York",
      state: "NY",
      postalCode: "10017",
    },
  ]);

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
          <div className="address-selection">
            <span className="address-title">Choose your delivery address</span>
            <div className="address-card-container">
              <div className="address-card">
                {userAddress.map((address) => (
                  <div className="address-card-content" key={address.id}>
                    <span className="address-name">{address.name}</span>
                    <span className="address-details">
                      {address.address}, {address.city}, {address.state}{" "}
                      {address.postalCode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
