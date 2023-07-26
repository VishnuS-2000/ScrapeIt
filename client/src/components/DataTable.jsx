import useSWR from "swr"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Tooltip
  } from '@chakra-ui/react'

import axios from "../axios"

export const DataTable=({toggler})=>{

    const fetcher=async(url)=>{
        const response=await axios.get(url)
        return response?.data?.result
      }

    const {data,loading,error}=useSWR(`${process.env.REACT_APP_BACKEND_URL}/insight`,fetcher,{
        refreshInterval:1000
    });



    const handleDelete=async(id)=>{
        try{
            const response=await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/insight/${id}`);
            if(response.status==200){
                alert("Deleted successfully")
            }
        }
        catch(err){
            alert("Internal Server Error: " );
            console.log(err)
        }
    }

    const handleFavourite=async(id)=>{
        try{
            const response=await axios.put(`${process.env.REACT_APP_BACKEND_URL}/insight/${id}`);
          
        }
        catch(err){
            alert("Internal Server Error: " );
            console.log(err)
        }
    }

    return <div className="flex flex-col bg-violet-50 w-full min-h-screen px-3 tablet:px-12 desktop:px-20 py-8">
            <div className="text-xl tablet:text-xl desktop:text-2xl font-[600] text-slate-700 flex items-center space-x-3">
                <button type="button" onClick={()=>{toggler(0)}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
</svg>

                </button>
                <span>Results</span>
                </div>

            <TableContainer bgColor={'white'} className="my-5 rounded-md" whiteSpace={'pre-wrap'}>
  <Table variant='simple' size="sm">
    <Thead>
      <Tr>
        <Th>Domain Name</Th>
        <Th>Word Count</Th>
        <Th>Favourite</Th>
        <Th>WebLinks</Th>
        <Th>Media Links</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data?.map((insight,index)=>{
        return <Tr key={index} className="">
                <Td className="font-[500] text-slate-600 " verticalAlign="top">
                    <div className="">
                    {insight?.data.domain}
                    <div className="text-xs">
                    CreatedAt {new Date(insight?.createdAt).toLocaleString()}
                        </div>
                    </div>
                    </Td>
                <Td className="font-[400] text-slate-700 " verticalAlign="top">
                    <div className="">
                    {insight?.data.wordsLength}
                    </div>
                 </Td>
                <Td className="font-[400] " verticalAlign="top">
                    <div className="">
                    {insight?.favourite?'Yes':'No'}
                        </div>
                    </Td>
                <Td className="" verticalAlign="top">
                    <ul className="">
                    {insight?.data?.webLinks?.map((link)=>{
                        return <li key={index} className="flex">
                            <a  href={`${link?.url}`} className="text-blue-600 hover:underline hover:text-purple-600 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>

{link?.length>50?`${link?.slice(0,50)} ...`:`${link}`}</a>
                            </li>
                    })}
                    </ul>
                </Td>
                <Td className="" verticalAlign="top">

                    <div className="flex flex-col ">

                
                    <ul>
                    {insight?.data?.mediaLinks?.imageLinks?.map((link)=>{
                        return <li key={index} className="flex">
                            <a  href={`${link}`} className="text-blue-600 hover:underline hover:text-purple-600 flex items-center">
                       
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                          </svg>
                            


                    
                                {link?.length>25?`${link?.slice(0,25)} ...`:`${link}`}
                                </a>
                            </li>
                    })}
                    </ul>


                    <ul>
                    {insight?.data?.mediaLinks?.videoLinks?.map((link)=>{
                        return <li key={index} className="flex">
                            <a  href={`${link}`} className="text-blue-600 hover:underline hover:text-purple-600 flex items-center">
                       
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
                          </svg>
                            


                    
                                {link?.length>25?`${link?.slice(0,25)} ...`:`${link}`}
                                </a>
                            </li>
                    })}
                    </ul>

                    </div>

                    
                </Td>
                
                <Td className="flex space-x-5 "verticalAlign="top">
                <Tooltip label="Remove">

                        <button type="button" onClick={()=>handleDelete(insight?.id)} className="hover:text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
</svg>

                        </button>
                </Tooltip>
                        <Tooltip label="Favourite">
                        <button type="button" onClick={()=>handleFavourite(insight?.id)} className="hover:text-slate-500">
                        
                        {!insight?.favourite?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>:
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-6 h-6 text-red-600">
  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
</svg>

}
                            
                        </button>

                        </Tooltip>
                    </Td>

        </Tr>
      })}
    </Tbody>
    
  </Table>
</TableContainer>
    </div>

}

