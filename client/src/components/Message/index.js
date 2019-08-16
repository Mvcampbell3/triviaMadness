import React from 'react';
import "./message.css";

const Message = (props) => {
  return (
    <div className={props.showMessage ? "messageBox" : "hideMessage"}>
      <div className="messageWrapper">
        <h3 className="messageTitle">{props.messageTitle}</h3>
        <p className="messageContent">{props.messageContent}</p>
        <button className="formBtn" onClick={props.handleClearMessage}>OK</button>
      </div>
    </div>
  );
}

export default Message;