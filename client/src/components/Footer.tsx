// src/componetns/Footer.tsx

import { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "rgb(0,80,240)",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        position: "relative",
        bottom: 0
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <a href="https://api.whatsapp.com/send?phone=541166407890&text=Hola%20federico%20!" target="_blank">
              <Typography color="white" variant="h5">
                Federico Marquez
              </Typography>
            </a>
          </Grid>
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle1">
              {`${new Date().getFullYear()} | React | Material UI | React Router`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;