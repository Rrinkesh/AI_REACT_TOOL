import { useState,useEffect, Children } from "react"
import { checkHeading, replaceHeading } from "../../Helper"





const Answer =({ans,index,totalresult,type})=>{

    const [heading,setheading]=useState(false);
    const [answer,setanswer]=useState(ans);
   


    useEffect(() => {
      if(checkHeading(ans)){
        setheading(true);
        setanswer(replaceHeading(ans))
      }}
       ,[ans])

    

    
return(     
    <>

    {index==0&&totalresult>1?<span className="py-2 block text-3xl text-red-600">  {answer}</span>:
    heading?<span className="py-2 block  text-blue-900">{answer}</span>:<span className={type=='q'?'pl-1':'pl-5'}>

      {answer}
    </span>
    }

    </>
)
}
export default Answer