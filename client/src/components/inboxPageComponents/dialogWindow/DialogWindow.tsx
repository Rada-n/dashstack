import React, { useEffect, useRef, useState } from "react";
import { useLocalStrorage } from "../../../hooks/useLocalStrorage";
import styles from './DialogWindow.module.css'
import AddButton from "../../addButton/AddButton";
import { useUser } from "../../../providers/UserProvider";

const DialogWindow:React.FC = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
    const socket = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);
    const { currentUser, setCurrentUser } = useUser();
    const lastMessageRef = useRef()
  
    const connect = () => {
      if (!currentUser) return;

      socket.current = new WebSocket("ws://localhost:5000");
  
      socket.current.onopen = () => {
        setConnected(true);
        const message = {
          event: "connection",
          username: `${currentUser?.name || "Guest"} connected!`,
          id: Date.now(),
        };
        socket.current.send(JSON.stringify(message));
      };
  
      socket.current.onmessage = (event: MessageEvent): void => {
        const message = JSON.parse(event.data);
        setMessages((prev) => [message, ...prev]);
      };
  
      socket.current.onclose = () => {
        console.log("Socket was closed");
      };
  
      socket.current.onerror = () => {
        console.log("Socket error");
      };
    };
  
    const sendMessage = async () => {
      if (!value) return;
  
      const message = {
        username: currentUser?.name || "Guest",
        message: value,
        id: Date.now(),
        time: new Date(),
        event: "message",
      };
      
      socket.current.send(JSON.stringify(message));
      setValue("");
    };

    const formatTime = (time) => {
        let format = ''
        if (new Date(time).getHours() >= 12) {
            format = 'pm'
        } else {
            format = 'am'
        }

        return `${new Date(time).getHours()}.${new Date(time).getMinutes()} ${format}`
    }

   
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
  
    return (
        <section className={styles.dialogContainer}>
            <div className={styles.messageContainer}>
              {messages.map((mess) => (
                    <article key={mess.id} className={`${mess.event === 'connection' ? styles.contectMessage : mess.username === (currentUser?.name || 'Guest') ? styles.currentUserMessage : styles.otherUserMessage}`}>
                      <h4>{mess.username}</h4>
                      <span>{mess.message}</span>
                     {mess.event !== 'connection' && connected && <span className={styles.time}>{formatTime(mess.time)}</span>}
                    </article>
              ))}
            </div>
            <div ref={lastMessageRef} />
            <div>
                <div className={styles.inputContainer}>
                    {connected && <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {if (e.key === 'Enter') sendMessage()} }
                    placeholder="Write a message..."
                    className={styles.inputMessage}
                  />} 
                  <div className={styles.buttonContainer}>
                      <AddButton add={!connected ? connect : sendMessage}>{connected ? 'Send' : 'Connect' }</AddButton>
                  </div>
                </div>
            </div>
        </section>
        );
}

export default DialogWindow
