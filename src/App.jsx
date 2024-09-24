import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  let [length, setLength] = useState(0);
  let [numberAllowed,setNumberAllowed]=useState(false);
  let [charAllowed,setCharAllowed]=useState(false);
  let [password,setPassword]=useState("");

  const passwordRef=useRef(null);

  const passwordGenerator=useCallback(()=>{
let pass="";
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

if(numberAllowed){
  str+="0123456789"
}
if(charAllowed){
  str+="!@#$%^&*()_+[]{}<>?,."
}

for(let i=1;i<=length;i++){
let idx=Math.floor(Math.random()*str.length+1);
pass+=str.charAt(idx);
}
setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword]);

  const copyPasswordToClip=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h3 className='text-white text-center mb-3'>Password Generator</h3>
      <div className='flex-shadow rounded-lg overflow-hidden mb-4 flex items-center'>
  <input 
    type='text'
    value={password}
    className='outline-none w-full py-1 px-3'
    placeholder='Password'
    readOnly
    ref={passwordRef}
  />
  <button
    className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0 ml-2'
    onClick={copyPasswordToClip} >
    Copy
  </button>
</div>
<div className="flex text-sm gap-x-2">
  <div className="flex items-center gap-x-1">
    <input type='range' min={6} max={50} value={length}className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
    <label>Length:{length}</label>
  </div>
  <div className="flex items-center gap-x-1">
    <input type='checkbox' defaultValue={numberAllowed} id='numberInput' onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
    <label htmlFor='numberInput'>Numbers</label>
  </div>
  <div className="flex items-center gap-x-1">
    <input type='checkbox' defaultValue={charAllowed} id='charInput' onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
    <label htmlFor='charInput'>Characters</label>
  </div>
</div>

    </div>
    </>
  )
}



export default App
