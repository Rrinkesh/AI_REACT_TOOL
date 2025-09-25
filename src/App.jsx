import { useState, useEffect, useRef } from 'react'
import './App.css'
import { url } from './const'
import Answer from './components/Answer'
import Recentsearch from './components/Recentsearch'
import QuestionAnswer from './QuestionAnswer'

function App() {
  const [question, setquestion] = useState('')
  const [result, setresult] = useState([])
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')))
  const [selectedHistory, setSelectedHistory] = useState('')
  const [lastRenderedQuestion, setLastRenderedQuestion] = useState("")
  const [loader, setloader] = useState(false);
  const scrollToAns = useRef()
   //dark mode feature...
    const [darkmode,setdarkmode] =useState('dark');
    useEffect(() => {
  console.log(darkmode)
if(darkmode==='dark'){
  document.documentElement.classList.add('dark');
}
else{document.documentElement.classList.remove('dark');
}

}, [darkmode])


  useEffect(() => {
    askquestion();
  }, [selectedHistory])

  const isEnter = (event) => {
    if (event.key == 'Enter') {
      askquestion();
    }
  }




  const askquestion = async () => {
    if (!question && !selectedHistory) {
      return false
    }
    if (question) {
      if (localStorage.getItem('history')) {
        let History = JSON.parse(localStorage.getItem('history'))
        History = [question, ...History]
        localStorage.setItem('history', JSON.stringify(History))
        setRecentHistory(History)
      }
      else {
        localStorage.setItem('history', JSON.stringify([question]))
        setRecentHistory([question])

      }
    }


    const payloadData = question ? question : selectedHistory
    if (payloadData === lastRenderedQuestion) {
      console.log("Same question dobara pucha gaya, skip kar diya 👍")
      return false
    }
    setLastRenderedQuestion(payloadData)
    const payload = {
      "contents": [{ "parts": [{ "text": payloadData }] }]
    }
    setloader(true)
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": "AIzaSyDHMzk4QVOgQQ_iT6CD8IncLKoK8lqA2RY"
      },

      body: JSON.stringify(payload)
    })
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("*");
    dataString = dataString.map((item) => item.trim());

    console.log(dataString)
    setresult([...result, { type: 'q', text: question ? question : selectedHistory }, { type: 'a', text: dataString }])
    setquestion('')
    setloader(false)
    console.log(result);
    scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;



   
  }

  return (
    <>
    <div className={darkmode=='dark'?'dark':'light'}>
    
      <div className='grid grid-cols-5 h-screen text-center'>
        <select onChange={(event)=>setdarkmode(event.target.value)} className='fixed text-white bottom-0 bg-black p-5'><option value="dark">Dark</option>
    <option value="light">Light</option>
    </select>
        <Recentsearch recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory} />
        <div className='col-span-4 p-16 '>
          <h1 className='text-5xl  p-3 font-bold bg-gradient-to-r from-blue-400 to-green-800 bg-clip-text text-transparent'>Hello ,user ask me anything</h1>
          {loader?
            <div role="status">
              <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>:null}
          <div ref={scrollToAns} className='container h-11/12 text-2xl overflow-auto'>
            <QuestionAnswer  result={result} />
          </div>
          <div className=' h-16 w-1/2 bg-zinc-600 text-white rounded-4xl p-1 pr-5  m-auto flex'>
            <input type="text" placeholder='ask me anything' onKeyDown={isEnter} value={question} className='w-full h-full p-3 outline-none' onChange={(e) => setquestion(e.target.value)} />
            <button className='p-3 border-4 rounded-4xl cursor-pointer hover:bg-amber-300' onClick={askquestion}> Ask</button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App     