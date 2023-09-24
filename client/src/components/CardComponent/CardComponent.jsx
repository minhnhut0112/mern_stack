import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import product1 from "../../assets/image/12.jpg";
import "./style.scss";

const CardComponent = () => {
  return (
    <div>
      <Card className="card">
        <img src={product1} className="image" alt="card" height={350} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            textAlign={"center"}
            component="div"
          >
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Jordan
          </Typography>
          <Typography>235$</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardComponent;
