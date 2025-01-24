import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import '/public/logo.svg'

const getLocalData = () => {
  const savedHistory = localStorage.getItem('MyAi');
  return savedHistory ? JSON.parse(savedHistory) : [];
};

const App = () => {
  const [input, setInput] = useState('');
  const [currentinput, setcurrentinput] = useState("")
  const [output, setOutput] = useState('');
  const [chatHistory, setChatHistory] = useState(getLocalData());
  const [loading, setLoading] = useState(false);

  const getApiData = async () => {
    setcurrentinput(input);
    if (!input.trim()) {
      setOutput('Please enter a question.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD77TufFU1gt_f3In5tyhMw9sSA_rfMSeg',
        { contents: [{ parts: [{ text: input }] }] }
      );

      const answer = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response available.';
      let formattedResponse = '';
      const responseArray = answer.split('**');

      responseArray.forEach((part, index) => {
        formattedResponse += index % 2 === 1 ? `<b>${part}</b>`: part;
      });

      const finalResponse = formattedResponse.split('*').join('<br />');
      setOutput(finalResponse);

      const newChatItem = { question:input,
                         answer : answer };
      setChatHistory([...chatHistory, newChatItem]);
    } catch (error) {
      console.error('Error fetching API data:', error);
      setOutput('Error: Unable to fetch data.');
    }
    setLoading(false);
  };

  const responsegetApiData = async () => {
    setcurrentinput(input);
    if (!input.trim()) {
      setOutput('Please enter a question.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD77TufFU1gt_f3In5tyhMw9sSA_rfMSeg',
        { contents: [{ parts: [{ text: input }] }] }
      );

      const answer = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response available.';
      let formattedResponse = '';
      const responseArray = answer.split('**');

      responseArray.forEach((part, index) => {
        formattedResponse += index % 2 === 1 ? `<b>${part}</b>`: part;
      });

      const finalResponse = formattedResponse.split('*').join('<br />');
      setOutput(finalResponse);

    } catch (error) {
      console.error('Error fetching API data:', error);
      setOutput('Error: Unable to fetch data.');
    }
    setLoading(false);
  };

  const deleteChat = (question) => {
    const updatedChatHistory = chatHistory.filter((chat) => chat.question !== question);
    setChatHistory(updatedChatHistory);
  };

  const cross = () => {
    const sidebar = document.querySelector(".left");
    sidebar.style.left = sidebar.style.left === "0%" ? "-40vh" : "0%";
  };

  const previousquestion = async(question) => {
    setInput(question)
    await responsegetApiData();
  }
  
  const newchat = () =>{
    setInput("")
    setOutput("")
    setcurrentinput("")
  }
  useEffect(() => {
    localStorage.setItem('MyAi', JSON.stringify(chatHistory));
  }, [chatHistory]);

  return (
    <div className="main">
      <div className="container">
        {/* Left Sidebar */}
        <div className="left">
          <div className="question">
            <div className="leftheader">
              <h3 onClick={()=>cross()} className="threeline">&#x2630;</h3>
              <button className="newchat" onClick={newchat}>
                &#x2b; New Chat
              </button>
            </div>
            <div className="recent">
              <h2 className="recentname">Recent</h2>
              {chatHistory.length === 0 ? (
                <p>No recent chats</p>
              ) : (
                chatHistory.map((chat, index) => (
                  <div onClick={()=>previousquestion(chat.question)} className="previous" key={index}>
                    <span  className="recentquestions">&#x2709; {chat.question}</span>
                    <button
                      onClick={() => deleteChat(chat.question)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="leftfooter">
              <ul>
                <li>&#x1F3C3; Activity</li>
                <li>&#x2049; Help</li>
                <li>&#x260F; Contact</li>
                <li>&#x2699; Settings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="rightmain">
          <div className="rightheader">
            <h1 className="gemini">Gemini</h1>
            <img className='geminilogo' src="./IMG-20240513-WA0026.jpg" alt="Gemini Logo" />
          </div>
          {currentinput ? <div className="rightoutput">
            <div className="mainoutput">
              <div className="inputcontent">
                <div className='inps'>
                <h1>{currentinput}</h1>
                </div>
              </div>
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div>
                  <img src="./public/logo.svg" alt="" />
                  <div
                  className="answer"
                  dangerouslySetInnerHTML={{ __html: output }}
                 />
                </div>
              )}
            </div>
          </div>
          :
          <div className="rightoutput">
          <div className="mainoutput1">
              <div className="inputcontent1">
                <h1>Hello Pratik</h1>
                <h1>How can I help you today?</h1>
              </div>
                <div className="answer1">
                  <div className="box">
                    <span>Suggest beautiful places to see on an upcoming road trip</span>
                    <div>&#x262E;</div>
                  </div>
                  <div className="box">
                  <span>Briefly summarize this concept: urban planning</span>
                  <div>&#x262E;</div>
                  </div>
                  <div className="box">
                  <span>Brainstorm team bonding activities for our work retreat</span>
                  <div>&#x262E;</div>
                  </div>
                  <div className="box">
                  <span>Improve the readability of the following code</span>
                  <div>&#x262E;</div>
                  </div>
                </div> 
          </div>
          </div>}
          <div className="input">
            <div className="in">
            <input
              className="inputs"
              type="text"
              placeholder="Ask Gemini"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className='submit' onClick={getApiData}>
              <h2>&#x27A4;</h2>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
