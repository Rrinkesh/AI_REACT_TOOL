import React from 'react'

const Recentsearch = ({recentHistory,setRecentHistory,setSelectedHistory}) => {


      const removeHistory = (index) => {
    let History = JSON.parse(localStorage.getItem('history'));
    History = History.filter((_, i) => index !== i)
    localStorage.setItem('history', JSON.stringify(History));
    setRecentHistory(History)
  }
  return (
    <>
    <div className='col-span-1 bg-zinc-400 pt-5 text-2xl min-h-screen m-0'>
          <h1 className='text-4xl pb-4'>RECENT HISTORY</h1>
          <ul className='text-left '>
            {recentHistory && recentHistory.map((item, index) => (
              <li key={index} onClick={() =>

                setSelectedHistory(item)

              } className='pl-3 cursor-pointer
               hover:bg-blue-400 flex justify-between ' >{item} <button className='cursor-pointer' onClick={(e) =>  {e.stopPropagation(), removeHistory(index)}}> <img src="./delete.png" alt="" /> </button></li>
            ))}</ul>
        </div>
    
    </>
  )
}

export default Recentsearch
