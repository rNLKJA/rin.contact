import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

const testimonials = [
  {
    name: "Alex Smith",
    title: "Data Analyst at Quantium",
    text: "Sunchuangyu's approach to data visualization is unparalleled. The experiment evaluation charts they created were instrumental in our analysis of historical HPLC data.",
    avatar: "/images/avatar1.png",
  },
  {
    name: "Jordan Lee",
    title: "Scrum Master at CSL",
    text: "Their leadership and coordination skills stand out. Sunchuangyu led our team to efficiently meet project targets while fostering a collaborative environment.",
    avatar: "/images/avatar2.png",
  },
  {
    name: "Morgan Taylor",
    title: "Senior Developer at HEX",
    text: "Sunchuangyu's ability to redesign and digitize learning content is remarkable, enhancing user engagement and educational reach with innovative solutions.",
    avatar: "/images/avatar3.png",
  },
];

const FeaturedTestimonials = () => {
  return (
    <Container component="section" maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom>
        Featured Testimonials
      </Typography>
      <Grid container spacing={4}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <Avatar
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  sx={{ width: 56, height: 56, mb: 2 }}
                />
                <Typography variant="subtitle1" component="p">
                  {testimonial.text}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  sx={{ mt: 2 }}
                >
                  {testimonial.name}, {testimonial.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedTestimonials;
