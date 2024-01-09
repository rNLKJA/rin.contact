import React from "react";
import Button from "@mui/material/Button";
import Image from "next/legacy/image";
import { Zoom } from "react-awesome-reveal";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DownloadIcon from "@mui/icons-material/Download";

const HeroHeaderSection = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)"); // Adjust breakpoint as needed

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-5 pb-10 px-4 pb-10 items-center">
        <div>
          {" "}
          <Zoom triggerOnce>
            <Image
              src="/images/index/heroSection.png"
              alt="hero section image"
              width={1100}
              height={650}
              layout="responsive"
              sizes="(max-width: 768px) 100vw, 768px"
              quality={50}
            />
          </Zoom>
        </div>

        <div>
          <h1>Inspring, Innovation & Unlock the Power of Data Analytics</h1>
          <br />
          <p className="leading-8">
            Embrace the Meow-gic of Data and Modern Tech: Inspurr & Innovate
            with Expert Guidance with{" "}
            <a
              className="font-bold"
              href="https://www.linkedin.com/in/sunchuangyuhuang/"
            >
              Rin Huang
            </a>
            !
          </p>
          <br />
          <div className="flex flex-end items-center gap-4">
            <Button
              variant="contained"
              size="medium"
              style={{
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                },
              }}
              href="/about-me"
            >
              More about Rin
            </Button>
            <Button
              variant="outlined"
              size="medium"
              style={{ borderColor: "black", color: "black" }}
              onClick={handleOpen}
            >
              Resume
            </Button>
          </div>
        </div>
      </div>

      {isMobile
        ? // Mobile view: Display simplified content with links
          open && (
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90vw",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  outline: "none",
                }}
              >
                <MobileViewContent />
              </Box>
            </Modal>
          )
        : // Desktop view: Display the PDF viewer modal
          open && <PdfViewer open={open} handleClose={handleClose} />}
    </div>
  );
};

export default HeroHeaderSection;

const PdfViewer = ({ open, handleClose }) => {
  const pdfUrl = "/data/resume.pdf"; // Path to your PDF file

  return (
    <div className="flex justify-center items-center h-screen">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "1100px", // Max width set to 1100px
            width: "80vw", // Adjust as needed
            maxHeight: "80vh", // Adjust as needed
            height: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 id="modal-modal-title">Rin Huang's Resume</h2>
          <iframe
            src={pdfUrl}
            style={{ width: "100%", height: "70vh" }} // Adjust as needed
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <p id="modal-modal-description">
            You can download my resume by clicking the link below.
          </p>
          <Button
            href={pdfUrl}
            download="RinHuangResume.pdf"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "black",
              ":hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            }}
          >
            Download Resume
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const MobileViewContent = () => (
  <div style={{ textAlign: "center", padding: 20 }}>
    <h2>Welcome!</h2>
    <br />
    <p>
      Discover my journey and experiences on LinkedIn or download my resume to
      learn more.
    </p>
    <br />
    <div
      className={`flex ${
        useMediaQuery("(max-width: 600px)") ? "flex-col" : "flex-row"
      } justify-center items-center w-full`}
    >
      <Button
        className="flex w-full"
        variant="contained"
        href="https://www.linkedin.com/in/sunchuangyuhuang/"
        style={{
          margin: 5,
          backgroundColor: "black",
          color: "white",
        }}
        startIcon={<LinkedInIcon />}
      >
        View on LinkedIn
      </Button>
      <Button
        className="flex w-full"
        variant="outlined"
        href="/data/resume.pdf"
        download="RinHuangResume.pdf"
        startIcon={<DownloadIcon />}
        style={{ borderColor: "black", color: "black" }}
      >
        Download Resume
      </Button>
    </div>
  </div>
);
