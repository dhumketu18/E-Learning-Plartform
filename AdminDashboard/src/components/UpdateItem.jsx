import CustomModal from "./CustomModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { listState, updateState } from "../atoms";
import updateCourseApi from "../utils/updateCourseApi";

const UpdateItem = (course) => {
  const [update, setUpdate] = useRecoilState(updateState);
  const setList = useSetRecoilState(listState);
  const closeHandler = () => {
    setUpdate((value) => {
      return !value;
    });
  };
  const updateHandler = (course) => {
    setList((prevList) => {
      return prevList.map((item) => (item._id === course._id ? course : item));
    });
    try {
      updateCourseApi(course);
      closeHandler();
    } catch (Error) {
      console.log(Error);
    }
  };
  return (
    <CustomModal
      course={course}
      open={update}
      onClose={closeHandler}
      type="UPDATE"
      onSubmit={updateHandler}
    ></CustomModal>
  );
};

export default UpdateItem;
