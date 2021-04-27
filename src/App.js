import React, { useEffect, useState, useMemo, Component } from 'react';
import './App.css';

import Cable from 'actioncable';

function App() {

  const cable = Cable.createConsumer('ws://localhost:3000/cable');

  const [currentMessage, setcurrentMessage] = useState("")
  const [chat, setChat] = useState([])  


  const chatChannel = useMemo(() => {
    return cable.subscriptions.create(
      { channel: 'ChatChannel' }
      ,  {
      connected: () => {},
      received: (data) => {
        setChat(oldArray => [...oldArray, data])
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent
        });
      }
      // draw: callback
      // word:
    });
  }, []);

  const handleSendEvent = (event) => {
    event.preventDefault();
    chatChannel.create(currentMessage);
    setcurrentMessage(
      ''
    );
  }

  const updateCurrentMessage = (event) => {
    setcurrentMessage(event.target.value);
  }

  const handleChatInputKeyPress = (event) => {
    if(event.key === 'Enter') {
      handleSendEvent(event);
    }
  }

  const renderChatLog = () => {
    console.log(chat)
 

    return chat.map((el) => {
      return (
        <li key={`chat_${el.id}`}>
          <span className='chat-message'>{ el.content }</span>
          <span className='chat-created-at'>{ el.created_at }</span>
        </li>
      );
    });
  }

    return (
      <div className='App'>
        <div className='stage'>
          <h1>Chat</h1>
          <div className='chat-logs'>
              <ul className='chat-logs'>
                  { renderChatLog() }
              </ul>
          </div>
            <input
              value={ currentMessage}
              onKeyPress={ (e) => handleChatInputKeyPress(e) }
              onChange={ (e) => updateCurrentMessage(e) }
              type='text'
              placeholder='Enter your message...'
              className='chat-input' />
          <button
            onClick={ (e) => handleSendEvent(e) }
            className='send'>
            Send
          </button>
          
        </div>
      </div>
    );

}

export default App;

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentChatMessage: '',
//       chatLogs: []
//     };
//   }
  
//   updateCurrentChatMessage(event) {
//     this.setState({
//       currentChatMessage: event.target.value
//     });
//   }

//   createSocket() {
//     let cable = Cable.createConsumer('ws://localhost:3000/cable');
//     this.chats = cable.subscriptions.create({
//       channel: 'ChatChannel'
//     }, {
//       connected: () => {},
//       received: (data) => {
//         let chatLogs = this.state.chatLogs;
//         chatLogs.push(data);
//         this.setState({ chatLogs: chatLogs });
//       },
//       create: function(chatContent) {
//         this.perform('create', {
//           content: chatContent
//         });
//       }
//     });
//   }

//   componentDidMount() {
//     this.createSocket();
//   }

//   handleSendEvent(event) {
//     event.preventDefault();
//     this.chats.create(this.state.currentChatMessage);
//     this.setState({
//       currentChatMessage: ''
//     });
//   }



//   handleChatInputKeyPress(event) {
//     if(event.key === 'Enter') {
//       this.handleSendEvent(event);
//     }
//   }

//   renderChatLog() {
//     return this.state.chatLogs.map((el) => {
//       return (
//         <li key={`chat_${el.id}`}>
//           <span className='chat-message'>{ el.content }</span>
//           <span className='chat-created-at'>{ el.created_at }</span>
//         </li>
//       );
//     });
//   }

//   render() {
//     return (
//       <div className='App'>
//         <div className='stage'>
//           <h1>Chat</h1>
//           <div className='chat-logs'>
//               <ul className='chat-logs'>
//                   { this.renderChatLog() }
//               </ul>
//           </div>
//             <input
//               value={ this.state.currentChatMessage }
//               onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
//               onChange={ (e) => this.updateCurrentChatMessage(e) }
//               type='text'
//               placeholder='Enter your message...'
//               className='chat-input' />
//           <button
//             onClick={ (e) => this.handleSendEvent(e) }
//             className='send'>
//             Send
//           </button>
          
//         </div>
//       </div>
//     );
//   }
// }

// export default App;