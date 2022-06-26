import React, { useState, useEffect, useRef } from "react";
import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process } from "../store/action/index";
import { useDispatch } from "react-redux";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";

const Chat = ({ username, roomname, socket }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    socket.on("message", (data) => {
      //decypt
      const ans = to_Decrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== "") {
      //encrypt here
      const ans = to_Encrypt(text);
      socket.emit("chat", ans);
      setText("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={7} className="mt-5 rounded shadow bg-white">
          <h4 className="mt-2 text-primary text-center">
            {username}'s <span style={{ fontSize: "1rem" }}> Chat Box</span>
          </h4>
          <div
            className="chat-message bg-light rounded"
            style={{ height: "70vh", overflow: "scroll" }}
          >
            {messages.map((i) => {
              if (i.username === username) {
                return (
                  i.text !== "" && (
                    <div className="d-flex justify-content-end m-4">
                      <div className="d-block">
                        <p className="m-0">
                          {i.text}{" "}
                          <span className="text-success small">
                            <i>- You</i>
                          </span>
                        </p>
                      </div>
                    </div>
                  )
                );
              } else {
                return (
                  i.text !== "" && (
                    <div className="d-flex justify-content-start m-4">
                      <p className="m-0">
                        {i.text}{" "}
                        <span className="text-success small">
                          <i>- {i.username}</i>
                        </span>
                      </p>
                    </div>
                  )
                );
              }
            })}
            <div ref={messagesEndRef} />
          </div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="enter your message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendData();
                }
              }}
            />
            <Button onClick={sendData} variant="success" id="button-addon2">
              Button
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
