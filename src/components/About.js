import React from 'react'

const About = () => {
  const outerBox = {
    'width':'100%',
    'height':'60vh',
    'display':'flex',
    'flexDirection':'column',
    'borderRadius':'20px',
    'boxShadow':'0px 0px 50px #999999',
    'overflow':'hidden'
  }
  const upperBox = {
    'height':'20vh',
    'backgroundColor':'#bdbdbd',
    'display':'flex',
    'justifyContent':'center',
    'alignItems':'center'
  }
  const lowerBox = {
    'height':'40vh',
    'backgroundColor':'#d6d6d6',
    'display':'flex',
    'justifyContent':'center',
    'alignItems':'center',
    'padding':'0px 250px',
    'textAlign':'justify'
  }
  return (
    <div style={outerBox}>
      <div style={upperBox}>
        <h1 style={{'fontSize':'60px'}}>
          iNotebook
        </h1>
      </div>
      <div style={lowerBox}>
        <p style={{'fontSize':'20px'}}>Welcome to iNotebook, your trusted digital sanctuary for safeguarding your private thoughts and notes. Our mission is to provide a secure haven for your most cherished ideas, ensuring they remain confidential and protected. With advanced encryption and robust server security, your notes are shielded from prying eyes. Whether it's personal reflections, creative musings, or important reminders, iNotebook is your digital companion, committed to preserving your privacy. Join us in embracing a worry-free note-taking experience, where your secrets are kept safe and sound. Discover the peace of mind that comes with iNotebook today.</p>
      </div>
    </div>
  )
}

export default About
