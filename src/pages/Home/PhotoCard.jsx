import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import Img from "./portfolio.jpg";
import ContactIcons from "./ContactIcons";

const PhotoCard = () => {
  return (
    <div className="flex justify-center items-center home-div">
      <Card className="w-3/5" sx={{ maxWidth: 500, boxShadow: 5 }}>
        <CardMedia component="img" image={Img} sx={{ padding: 1 }} />
        <ContactIcons />
      </Card>
    </div>
  );
};

export default PhotoCard;
