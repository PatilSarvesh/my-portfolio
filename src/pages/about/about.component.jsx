import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./about.styles.css";
import Profile from "../../assets/img/profile/profile.webp";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const About = () => {
  return (<div id="about">
    <div className="about">
      <h1 className="pt-3 text-center font-details pb-3">ABOUT ME</h1>
      <Container>
        <Row className="pt-3 pb-5 align-items-center">
          <Col xs={12} md={6}>
            <Row className="justify-content-center mb-2 mr-2 ">
              <Image className="profile justify-content-end" alt="profile" src={Profile} thumbnail="thumbnail" fluid="fluid"/>
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <Row className=" align-items-start p-2 my-details rounded">
              Hi there! I am
              <strong>&nbsp;Sarvesh Patil</strong>
              <br/>
              A software engineer from India focused on backend and cloud-native systems. I build reliable APIs, Python services, AWS workflows, and developer tools that stay understandable as they grow.
              <br/>
              My current work is Python and AWS, with a foundation in C#, .NET, REST APIs, and production automation.
              <br/>
              I am a quick learner and can adapt to the requirements.
              <br/>
              Apart from the technical stuff i play Chess, Cricket.
              <br/>

              <br/>
              <Col className="d-flex justify-content-center flex-wrap">
                <div>
                  <a href="#contact">
                    <Button className="m-2" variant="outline-primary">
                      Let's talk
                    </Button>
                  </a>
                </div>
                <div>
                  <a href="/Sarvesh_Patil_Resume.html" target="_blank" rel="noopener noreferrer">

                  <Button className="m-2" variant="outline-success" download>
                    My Resume
                  </Button>
                  </a>
                </div>
                }
                {/* <div>
                    <a href="https://github.com/PatilSarvesh" target="_blank" rel="noopener noreferrer">
                      <Button className="m-2" variant="outline-dark">
                        GitHub
                      </Button>
                    </a>
                  </div>
                  <div>
                    <a href="https://www.linkedin.com/in/patilsarvesh/" target="_blank" rel="noopener noreferrer">
                      <Button className="m-2" variant="outline-info">
                        LinkedIn
                      </Button>
                    </a>
                  </div> */
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  </div>);
};

export default About;
