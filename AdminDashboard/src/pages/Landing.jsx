import { Grid, Typography } from "@mui/material";

export const Landing = () => {
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"}>makCourse Admin</Typography>
            <Typography variant={"h5"}>
              A place to learn, earn and grow
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          <img
            src={"./images/teacher.jpeg"}
            style={{ Width: "100%", maxHeight: "400px" }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
