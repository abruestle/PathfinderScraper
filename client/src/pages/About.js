import React from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import ReadMe from "../components/ReadMe";


const About = () => (
    <div>
    <Hero backgroundImage="https://i.imgur.com/37xXobO.png">
      <h1>Pathfinder Scraper</h1>
      <h2>A React App for retrieving Pathfinder information</h2>
    </Hero>
    <Container style={{ marginTop: 30 }}>
      {/* <Row>
        <Col size="md-12">
          <h1>Pathfinder Scraper</h1>
        </Col>
      </Row> */}
      <Row>
        <Col size="md-12">
        <ReadMe />
          {/* <Markdown source="Readme" />, */}
        </Col>
      </Row>
    </Container>
  </div>
);

export default About;
