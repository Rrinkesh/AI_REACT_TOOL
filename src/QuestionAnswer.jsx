import React from 'react'
import Answer from './components/Answer'

const QuestionAnswer = (props) => {
  return (
   <>
   <div className='text-white '>
              <ul className=''>
                {props.result.map((item, index) =>
                (<div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>{
                  item.type == 'q' ? <li className='p-4  border-4 text-center border-cyan-950 bg-zinc-500 rounded-tl-4xl rounded-bl-4xl rounded-br-4xl  w-fit' key={index + Math.random()}><Answer ans={item.text} index={index} totalresult={props.result.length} type={item.type} /></li>
                    : item.text.map((item, ansindex) => (
                      <li className='text-left text-white' key={ansindex + Math.random()}><Answer ans={item} type={item.type} index={index} totalresult={props.result.length} /></li>

                    ))
                }</div>))}
              </ul>

            </div>
   
   
   </>
  )
}

export default QuestionAnswer
