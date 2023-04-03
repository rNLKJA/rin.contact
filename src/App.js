import { Container, Grid } from "@mui/material";

import Portrait from "./portfolio/portfolio";
import ElevatorPitch from "./brief/elevatorPtich";
import Footer from "./footer/footer";
import Skills from "./skill/skill";
// import Projects from "./project/project";

function App() {
  return (
    <div className="grid w-full">
      <Portrait />

      <Container maxWidth="xl">
        <Grid container spacing={1} style={{ maxHeight: "50vh" }}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <ElevatorPitch />
              </Grid>
              <Grid item xs={12} md={6}>
                <Skills />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
