import { useState } from "react";
import { Button } from "@mui/material";
import CustomModal from "./CustomModal";
import { useSetRecoilState } from "recoil";
import { listState } from "../atoms";
import addCourseApi from "../utils/addCourseApi";

const AddItem = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => {
    setOpen((prevValue) => !prevValue);
  };

  const handleClose = () => {
    setOpen((prevValue) => !prevValue);
  };
  const setList = useSetRecoilState(listState);
  const handleSubmit = async (courseObj) => {
    try {
      const data = await addCourseApi(courseObj);
      handleClose();
      setList((prevList) => [...prevList, { ...courseObj, id: data.id }]);
      setError(null);
    } catch (err) {
      setError(err);
      console.log("error in adding item", err);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{
          display: "flex",
          margin: "20px auto",
        }}
      >
        Add New Course
      </Button>

      <CustomModal
        open={open}
        onClose={handleClose}
        type="ADD"
        onSubmit={handleSubmit}
      ></CustomModal>
      {error && <p>{error}</p>}
    </>
  );
};

export default AddItem;
