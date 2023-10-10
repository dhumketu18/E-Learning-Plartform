import { Box, Modal, Typography } from "@mui/material";
import CourseForm from "./CourseForm";
import { createPortal } from "react-dom";

const CustomModal = ({ open, onClose, type, course, onSubmit }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return createPortal(
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {type === "ADD" ? "Add new course here" : "Update course"}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <CourseForm
            course={course}
            type={type}
            onClick={onSubmit}
          ></CourseForm>
        </Typography>
      </Box>
    </Modal>,
    document.body
  );
};
export default CustomModal;
