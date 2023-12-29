import { useEffect, useState } from "react";
import { styled } from "styled-components";
import SearchResult from "./Components/SearchResult";


 export const BASE_URL="http://localhost:9000";
const App = () => {
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [filterdata,setFilterData]=useState(null);
    const [searchfilter,setSearchFilter]=useState("All");
 useEffect(()=>{

    const fetchData=async()=>{
       try {
        setLoading(true);
        const response = await fetch(BASE_URL);
        const json = await response.json();

        setData(json);
       // console.log(json);
         setFilterData(json);
        setLoading(false);

       } catch (error) {
        setError("Unable to fetch data...")
       }
     };
    fetchData();
   },[])


  
   if(error) return <div>{error} </div>
   if(loading) return <div>Loading... </div>

   const searchfood=(e)=>{
    const searchValue=e.target.value;
    //console.log(searchValue);

     if(searchValue=="")setFilterData(null);
    const filter=data?.filter((food)=>
    food.name.toLowerCase().includes(searchValue.toLowerCase()));

    setFilterData(filter);
   }

   const filterfood=(type)=>{
      if(type=='All'){
        setFilterData(data);
        setSearchFilter('All');
        return;
      }

    const filter=data?.filter((food)=>
    food.type.toLowerCase().includes(type.toLowerCase()));
    setFilterData(filter);
    setSearchFilter(type);

   }

   const arr=[
    {
      name:"all",
      type: "All"
   },
   {
    name:"Breakfast",
    type: "breakfast"
 },
 {
  name:"Lunch",
  type: "lunch"
  },
  {
  name:"Dinner",
  type: "dinner"
  },

]
  return (
  <>
   <MainContainer>
     <TopConatiner>
      <div className="logo">
        <img src="logo.svg" alt="" />
      </div>
      <div className="search">
      <input onChange={searchfood} placeholder="Search Food" />
      </div>

     </TopConatiner>
    <DownContainer>
        {arr.map((value)=>(
           <Button 
             isSelected={searchfilter==value.type}
           key={value.name} onClick={()=>filterfood(value.type)} >{value.type}</Button>
        ))

        }
         </DownContainer>
   </MainContainer>

    <SearchResult data={filterdata}/>

  </>
  );
};

export default App;




export const MainContainer=styled.div`
max-width: 1440px;
margin: 0 auto;
`

const TopConatiner=styled.section`
  display: flex;
  justify-content: space-between;
  height: 140px;
   align-items: center;
   
  .search{
   input{
    font-size: 16px;
    border: 1px solid red;
    background-color: transparent;
    color: white;
    padding: 0 10px;
   height: 40px;
   border-radius: 1px;
   
   &::placeholder{
    color: white;
   }
  }
  }
  @media (0<width<600px) {
    flex-direction: column;
    height: 80px;
    margin-bottom:20px;
    margin-top: 20px;
  }
`

const DownContainer=styled.div`
  display: flex;
  gap: 14px;
 justify-content: center;
 padding-bottom:40px;
 
`;


const Button=styled.button`
  background: ${({isSelected})=> (isSelected ? "#f22f2f":"rgba(255, 67, 67, 1)")};
  outline:1px solid ${({isSelected})=> (isSelected ? "white":"#ff4343")};
 
  height: 31px;
  padding: 5px 15px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    background-color: #f22f2f;
  }


`;

