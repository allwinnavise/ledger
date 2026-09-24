import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './savings.css';
import history from './history.png';
function Savings({savingsbalance,setSavingsBalance,setTransactionHistory,setTransactionDates,transactionDates}){
     console.log("Savings component rendered");
    const [savings,setSavings]=useState([]);
    const [newsavings,setNewSavings]=useState();
    const [showform,setShowform]=useState(false);
    const [savingsId,setSavingsId]=useState();
    const [source,setSource]=useState("");
    useEffect(()=>{
        const fetchSavings=async()=>{
        const response= await axios.get("http://localhost:3500/savings");
        setSavings(response.data);
        const balanceResponse=await axios.get("http://localhost:3500/savingsbalance");
        const currentBalance=balanceResponse.data[0];
        setSavingsId(currentBalance.id);
        console.log(balanceResponse.data[0])
        setSavingsBalance(currentBalance.balance);
    }
    fetchSavings();
    },[])
    const addSavings=async(tempsav,newBalance)=>{
        await axios.post("http://localhost:3500/savings",tempsav);
        await axios.patch("http://localhost:3500/savingsbalance/rZqDkt1ULJY",{balance:newBalance});
        await axios.post("http://localhost:3500/transactionHistory",tempsav);
        const dateExists = transactionDates.some(item => item.date === tempsav.date);
        if (!dateExists) {
            const newDate = { date: tempsav.date };

            await axios.post(
                "http://localhost:3500/transactionDates",
                newDate
            );
            setTransactionDates(prev => [...prev, newDate]);
        }
        setTransactionHistory(prev =>[...prev,tempsav]);
    }
    return(
        <main className="savings-main">
            <nav>
                <ul className='nav-bar'>
                    <Link className="link" to="/"><li className='nav'>Home</li></Link>
                    <Link className="link" to="/spendings"><li className='nav'>Today's Spendings</li></Link>
                    <Link className="link" to="/dailyexpenses"><li className='nav'>Daily Expenses</li></Link>
                </ul>
            </nav>
          <div className="current-savings"><p>Current Savings : <span>₹{savingsbalance}</span></p></div>
          <div className="add-savings"><button onClick={()=>{setShowform(!showform);}}>Add today's savings!!+</button></div>
         {showform&&<form className="savings-form" onSubmit={async(e)=>{e.preventDefault();
                                            const newBalance=Number(savingsbalance)+Number(newsavings); 
                                            setSavingsBalance(newBalance);
                                            setShowform(false);
                                            const date= new Date().toLocaleDateString("en-GB");
                                            const currentTime = new Date().toLocaleTimeString();
                                            const tempsav={amount:newsavings,date:date,time:currentTime,source:source,type:"savings"};
                                            setNewSavings();
                                            setSavings([...savings,tempsav]);
                                            await addSavings(tempsav,newBalance);
                                            }}>
                        <svg onClick={()=>{setShowform(false);}} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z" fill="#0F1729"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" fill="#0F1729"/>
                        </svg>
                        <input type="number" required placeholder="Add savings" value={newsavings} onChange={(e)=>setNewSavings(e.target.value)}
                        
                        ></input>
                        <input type="text" required placeholder="enter source of money" value={source} onChange={(e)=>setSource(e.target.value)}></input>
                        <button  type="submit">Add</button>
                    </form>
        }
            <section className="savings-history">
                    <div className="savings-history-header">
                        <img src={history}></img>
                        <h1>Savings History</h1>
                    </div>
            {savings.slice().reverse().map((item)=>(
               item.amount&&
                    <div className="savings-details">
                        <div>+₹{item.amount}</div>
                        <div>{item.date}</div>
                        <div>{item.time}</div>
                    </div>    
            ))}
            
            {!savings.some(item => Object.hasOwn(item,"amount"))&&
               <div className="no-savings">
                    <div>No savings yet!!!</div>
                </div>
            }
            </section>
        </main>
    );
}
export default Savings;