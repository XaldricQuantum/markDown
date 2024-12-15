import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import gsap from 'gsap'

const PLACEHOLDER = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n";


function App() {
  const [maximized, setMaximized] = useState(null) // (null) , "editor", "preview"
  // const []
  const handleOnClick =  (window) => {
    setMaximized((prev) => prev === window ? null : window);
    console.log(maximized)
  }

  const handleChange = () => {
    console.log("Handle Cgange Here")
  }

  useEffect(() => {
    if (maximized === "editor") {
      gsap.to(document.getElementById("editor"), {
        height: "100vh",
        duration: 1,
        ease: "power1.inOut"
      });
      console.log(document.getElementById("editor-wrapper"))
      gsap.to(document.getElementById("preview-wrapper"), {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          document.getElementById("preview-wrapper").style.display='none' ;
        }
      });
    } else if (maximized === "preview") {
      gsap.to(document.getElementById("preview-wrapper"), {
        height: "100vh",
        duration: 1,
        ease: "power1.inOut"
      });
      gsap.to(document.getElementById("editor-wrapper"), {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          document.getElementById("editor-wrapper").style.display='none' ;
        }
      });
    } else if (maximized === null) {
      document.getElementById("editor-wrapper").style.display='flex';
      document.getElementById("preview-wrapper").style.display='flex';
      gsap.to(document.getElementById("editor-wrapper"), {opacity: 1, scale: 1, duration: 1, ease: "power1.inOut"})
      gsap.to(document.getElementById("editor"), {height: "45vh",})
      gsap.to(document.getElementById("preview-wrapper"), {opacity: 1, scale: 1, duration: 1, ease: "power1.inOut"})
    }
  }, [maximized])

  return (
    <>
      <div className='app'>
        <div className='editor-wrapper' id='editor-wrapper'>
          <Toolbar text='Editor' 
            icon={maximized === "editor" ? 'fa fa-compress' : 'fa-solid fa-maximize'} 
            onClick={() => handleOnClick('editor')} 
          />
          <textarea id='editor' placeholder={PLACEHOLDER} onChange={handleChange}/>
        </div>
        <div className='preview-wrapper' id='preview-wrapper'>
          <Toolbar 
            text="Preview"
            icon={maximized === "preview" ? 'fa fa-compress' : 'fa-solid fa-maximize'}
            onClick={() => handleOnClick('preview')}
          />
          <div id='preview'>Your text will appear nHeres</div>
        </div>
      </div>
    </>
  )
}

function Toolbar({text, icon, onClick}) {
  return (
    <div className="toolbar">
      <i className='fa fa-free-code-camp'></i>
      <span className='toolbar-text'>{text}</span>
      <span id='max-btn'><button onClick={onClick}><i className={icon} ></i></button></span>
    </div>
  );
}

export default App
