import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Homepage = ({ socket }) => {
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");
  const navigate = useNavigate();

  const sendData = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinRoom", { username, roomname });
      navigate(`/chat/${roomname}/${username}`);
    } else {
      alert("username and roomname are must !");
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col className="mt-5 bg-white shadow rounded" md={4}>
          <h4 className="text-center mt-5">Welcome To Chat App</h4>
          <br />
          <Form>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                placeholder="Input your user name"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                placeholder="Input the room name"
                value={roomname}
                onChange={(e) => setroomname(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2 mb-4">
              <Button onClick={sendData} variant="primary" type="button">
                Join Chat
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
