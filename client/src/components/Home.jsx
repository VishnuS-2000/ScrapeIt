import {useState} from "react";
import {  Spinner } from '@chakra-ui/react';
import { FormControl } from "@chakra-ui/react";
import axios from "../axios";
import { Footer } from "./Footer";

export const Home=({toggler})=>{

  const [url,setUrl]=useState()
  const [loading,setLoading]=useState(false)
  const handleURLChange=({target})=>{
        setUrl(target?.value)    
  }

  const  isValidURL=(url)=>{
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // Protocol (optional)
      '((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])?)\\.)+[a-zA-Z]{2,}|' + // Domain name (e.g., example.com)
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP address (e.g., 192.168.1.1)
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // Port and path (optional)
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // Query string (optional)
      '(\\#[-a-zA-Z\\d_]*)?$', // Fragment identifier (optional)
      'i' // Case-insensitive flag
    );
  
    return pattern.test(url);
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();


    try{

      if(!url||!isValidURL(url)){
        alert("Please Provide a Valid URL");
        return
      }
      setLoading(true)
      const response=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/insight`,{
        url:url
      },{
        headers:{
          'Content-Type': 'application/json'
        }
      })

      if(response?.status===201){
        setLoading(false)
        toggler(1);

      }

    }catch(err){
        alert("Internal Server Error")
        console.log(err) 
         }
  }

    return  <><div className="flex flex-col w-full min-h-screen items-center w-full bg-violet-50 relative">

    <div className="flex flex-col gap-4 desktop:gap-8 tablet:gap-6 text-center absolute top-[23%] p-3">
    <h1 className="text-6xl  tablet:text-7xl desktop:text-8xl font-[700] text-transparent bg-gradient-to-r bg-clip-text from-[#4776E6] to-[#8E54E9]">ScrapeIt</h1>
     <p className="text-base tablet:text-lg desktop:text-xl font-[500] text-[#4b5563]">Get Powerful Insights about your Website in Minutes</p>
     
     
     <form onSubmit={handleSubmit} className="p-3 flex flex-col gap-3 relative w-full items-center">
    
    <FormControl>
    <input type="text" className="w-full tablet:w-[520px] desktop:w-[650px] py-3   rounded-md border outline-indigo-600 border-2 px-5 border-slate-400 placeholder:text-slate-400 placeholder:font-[500]" placeholder="Put your website URL here Eg:www.growth.cx" onChange={handleURLChange}/>
    </FormControl>


    <button type="submit" className="p-3 flex justify-center w-full hover:bg-slate-200 bg-gradient-to-r from-[#4776E6] to-[#8E54E9] font-[500] rounded-md text-white tablet:w-[120px] tablet:absolute tablet:right-[12px] tablet:bottom-[13.5px]">
      {!loading?<span>Get Insights</span>:
      <Spinner/>}
      
      </button>
  </form>
    
    </div>
  

  <button className="absolute bg-white border border-1 border-gray-200 rounded-full p-2 absolute top-[12%] left-[20%] ">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="rotate-12 w-8 h-8 tablet:w-12 tablet:h-12 desktop:w-16 desktop:h-16 ">
  <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
</svg>

  </button>


  <button className="bg-white border border-1 border-gray-200 rounded-full p-2 absolute top-[15%] tablet:top-[20%] right-[20%] text-indigo-600">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 tablet:w-12 tablet:h-12 desktop:w-12 desktop:h-12  desktop:w-24 desktop:h-24">
  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
</svg>


  </button>


  

    </div>
    <Footer/>
    </>
}

