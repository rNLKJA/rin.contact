import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

const testimonials = [
  {
    name: "Dr Vassili Kitsios",
    title: "Senior Research Scientist at CSIRO",
    text: "Sunchuangy, was a leading student in his final year project of his Masters of Data Science. It delivered to the CSIRO Environment department. The focus of the project was on developing machine learning solutions for forecasting the role that climate variability plays on the affordability of agricultural crops, and their implications for food security. He is a very competent programmer, project manager and communicator. I would highly recommend him for any data science role, be it in technology / solution development, or in a more client facing role.",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQH9HVyAIgy6Og/profile-displayphoto-shrink_100_100/0/1669590620718?e=1709164800&v=beta&t=GOlNTQ4im9aLoo4U5lqoXGyR33_G0J_sd22l_dujEgM",
  },
  {
    name: "Ritwik Giri",
    title: "Ex - Deloitte USI",
    text: "On our final year data science project, on food security and climate change, I had the opportunity of working alongside Rin. He was a valuable asset to our project team. He displayed a proactive attitude towards his assigned work. His brilliant coding skills played a vital role in the successful delivery of our project. Furthermore, Rin possesses exceptional documentation skills, a quality that significantly contributed to the smooth flow of information within the team. His management of information exchange among team members demonstrated not only his attention to detail but also his understanding of the importance of clear communication in project success.",
    avatar:
      "https://media.licdn.com/dms/image/D4D03AQHRE1OOdua5PQ/profile-displayphoto-shrink_100_100/0/1677820341185?e=1709164800&v=beta&t=xsGnXY4cey298u39QHwylqPSIDh4YJMxIr7AYIoy6s0",
  },
  {
    name: "Eric Wei",
    title: "Software Developer - Melbourne Cloud",
    text: "Rin is an extraordinary talent and a true inspiration in the academic realm. His charisma and leadership are unparalleled, making him an asset in any collaborative setting. He masterfully balances personal warmth with professional rigor, ensuring a harmonious and focused team environment. As a Scrum Master, Rin's organizational skills and ability to nurture team spirit stand out remarkably. His technical prowess is beyond commendable, and his approachable nature when solving problems is invaluable. In my eyes, Rin's blend of personal charm, leadership, and technical skills make him an exceptional colleague and a natural leader.",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQHNskzOZSjtOw/profile-displayphoto-shrink_100_100/0/1696105648229?e=1709164800&v=beta&t=TTBcBW6Fu9KRLS8hmA12bHzEvxQDT_FYkvhT1pnQk80",
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
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="justify-all"
              >
                <Avatar
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  sx={{ width: 80, height: 80, mb: 2 }}
                />
                <Typography
                  className="text-wrap"
                  variant="subtitle1"
                  component="p"
                >
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
