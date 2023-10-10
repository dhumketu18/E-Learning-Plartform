import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import UpdateItem from "./UpdateItem";
import { useRecoilState } from "recoil";
import { updateState } from "../atoms";

const Course = (course) => {
  console.log("course from oc", course);
  const { title, description, price, imageLink } = course;
  const [update, setUpdate] = useRecoilState(updateState);
  return (
    <>
      <CardActionArea
        onClick={() => {
          setUpdate((value) => {
            return !value;
          });
        }}
      >
        <Card>
          <CardHeader title={title} subheader={`price ${price}`} />
          <CardMedia component="img" image={imageLink} alt="course" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
      {update && <UpdateItem {...course} />}
    </>
  );
};
export default Course;
