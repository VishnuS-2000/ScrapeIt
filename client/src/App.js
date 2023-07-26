import { useState } from "react";


import { ChakraProvider } from "@chakra-ui/react";

import {Home} from "./components/Home";
import { DataTable } from "./components/DataTable";

function App() {

  const [active,setActive]=useState(0)

  const toggler=(id)=>{
    setActive(id)
  }

  const Tabs=[<Home key={0} toggler={toggler}/>,<DataTable key={1} toggler={toggler}/>]


  return (
    <ChakraProvider>
      {Tabs[active]}
    </ChakraProvider>
  );
}

export default App;
