import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Lobby from './components/Lobby';
import Chat from './components/Chat';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';

const App  = () =>{
  
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7021/chat")
      .configureLogging(LogLevel.Information)
      .build();

      connection.onclose( e => {
        setConnection();
        setMessages([]);
        setUsers([]); 
       });

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, {user, message}]);
      } );
    
      connection.on("UsersInRoom", (users) =>{
        setUsers(users);
      });

      await connection.start();
      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  }

  const closeConnection = async() =>
  {
    try {
      await connection.stop();
    } catch (error) {
      console.log(error)
    }
  }

  const sendMessage = async(message) =>{
    try {
      await connection.invoke("SendMessage", message); 
    } catch (error) {
      console.log(error);
    }
  }

  return <div className='app'>
    <h2>SolChat</h2>
    
    {!connection
    ?<Lobby joinRoom={joinRoom} />
    : <Chat messages ={messages} sendMessage={sendMessage} 
      closeConnection={closeConnection} users={users} />}
  </div>
}

export default App;
