import React from 'react'

const Ai = () => {
  return (
    <>
      <div className="main">
        <div className="container">
          <div className="left">
            <div className="question">
              <div className="leftheader">
                <h3  className='threeline'>&#x2630;</h3>
                <button className='newchat'>&#x2b; New Chat</button>
              </div>
              <div className="recent">
                <h2 className='recentname'>Recent</h2>
                <div className="previous">
                  &#x2709; React Api Integration
                </div>
                <div className="previous">
                  &#x2709; React Api Integration
                </div>
                <div className="previous">
                  &#x2709; React Api Integration
                </div>
              </div>
              <div className="leftfooter">
                <ul>
                  <li>&#x1F3C3; Activity</li>
                  <li>&#x2049; Help</li>
                  <li>&#x260F; Contact</li>
                  <li>&#x2699; Setting</li>
                </ul>

              </div>

            </div>
          </div>
          <div className="rightmain">
            <div className="rightheader">
              <h1 className='gemini'>Gemini</h1>
              <img src=".\IMG-20240513-WA0026.jpg" alt="" />
            </div>
            <div className="rightoutput">
              <div className="mainoutput">
                <div className="inputcontent">
                  <h2></h2>
                </div>
                <div className='answer'>
                 
                </div>
              </div>
            </div>
            <div className="input">
              <input className='inputs' type="text" name="" id="" placeholder='Ask Gemini' />
              <button><h2>&#x27A4;</h2></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Ai
