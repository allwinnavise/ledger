import axios from "axios";
import './spendings.css';
import calendar from './calendar.png';
import { Link} from 'react-router-dom';
import { useState } from "react";
import Addspending from "./addSpending";
function Spendings({totalSpent,setTotalSpent,spendings,setSpendings,setTransactionHistory,setTransactionDates,transactionDates}){
    const [amount,setAmount]=useState("");
    const [category,setCategory]=useState("");
    const [description,setDescription]=useState("");
    const [showform,setShowform]=useState(false);
    const submitSpending=async()=>{
        const currentSpendings=Number(totalSpent)+Number(amount);
        setTotalSpent(currentSpendings);
        await axios.patch("http://localhost:3500/totalspending/-aPNIugBKM0",{totalspent:currentSpendings})
        const date= new Date().toLocaleDateString("en-GB");
        const currentTime = new Date().toLocaleTimeString();
        const newData={amount,category,description,date,currentTime,type:"spending"};
        await axios.post("http://localhost:3500/spendings",newData);
        await axios.post("http://localhost:3500/transactionHistory",newData);
        const dateExists = transactionDates.some(item => item.date ===newData.date);
        if (!dateExists) {
            const newDate = { date: newData.date };

            await axios.post(
                "http://localhost:3500/transactionDates",
                newDate
            );
            setTransactionDates(prev => [...prev, newDate]);
        }
        setTransactionHistory(prev =>[...prev,newData]);
        setSpendings(prev=>[...prev,newData])
        setAmount("");
        setCategory("");
        setDescription("");
    }
    return(
        <>
          <main className="spendings-main">
            <nav>
                <ul className='nav-bar'>
                    <Link className="link" to="/"><li className='nav'>Home</li></Link>
                    <Link className="link" to="/savings"><li className='nav'>Savings</li></Link>
                    <Link className="link" to="/dailyexpenses"><li className='nav'>Daily Expenses</li></Link>
                </ul>
            </nav>
            <div className="date">
                <img src={calendar}></img>
                <p>{new Date().toLocaleDateString("en-GB")}</p>
            </div>
            <ul className="spendings" >
                {[...spendings.filter(item =>(item.date===new Date().toLocaleDateString("en-GB")))].reverse().map(item =>(
                    
                        <li className="spendings-details">
                            <div><p className="spent-amount">-₹{item.amount}</p></div>
                            <div><p className="time" >Time:{item.currentTime}</p></div>
                            <div><p className="category" >category : {item.category}</p></div>
                        </li>
              
                ))}
            </ul>
            <button className="addspending" onClick={()=>(setShowform(!showform))}><span className="add-symbl">+</span>Add Transaction</button>
            {showform&&
            <>
             <div className="overlay" >
                <Addspending
                                totalSpent={totalSpent}
                                setTotalSpent={setTotalSpent}
                                amount={amount}
                                setAmount={setAmount}
                                category={category}
                                setCategory={setCategory}
                                description={description}
                                setDescription={setDescription}
                                submitSpending={submitSpending}
                                setShowform={setShowform}
                />
              </div>
            </>
            
            }
            
          </main>
            
        </>
        
    );
}
export default Spendings;
