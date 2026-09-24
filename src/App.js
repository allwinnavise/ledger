import { useEffect,useState } from 'react';
import axios from "axios";
import './App.css';
import Home from './homepage';
import Spendings from './spendings';
import Savings from './savings';
import ExpensesHistory from './expensesHistory';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [savingsbalance,setSavingsBalance]=useState("0.00");
  const [totalSpent,setTotalSpent]=useState(0.00);
  const [spendings,setSpendings]=useState([]);
  const [transactionHistory,setTransactionHistory]=useState([]);
  const [transactionDates,setTransactionDates]=useState([]);
  useEffect(()=>{
        const fetchSpendings=async()=>{
        const response=await axios.get("http://localhost:3500/spendings");
        setSpendings(response.data);
        const response_totalSpending=await axios.get("http://localhost:3500/totalspending");
        setTotalSpent((response_totalSpending.data)[0].totalspent);
        const transaction=await axios.get("http://localhost:3500/transactionHistory");
        setTransactionHistory(transaction.data);
        const transDates=await axios.get("http://localhost:3500/transactionDates");
        setTransactionDates(transDates.data)
        console.log(transactionDates.data);
        
    }
    fetchSpendings();
    },[])
  return(
    <>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/spendings" element={<Spendings
                                    totalSpent={totalSpent}
                                    setTotalSpent={setTotalSpent}
                                    spendings={spendings}
                                    setSpendings={setSpendings}
                                    setTransactionHistory={setTransactionHistory}
                                    setTransactionDates={setTransactionDates}
                                    transactionDates={transactionDates}
                       />}
        />
        <Route path="/savings" element={<Savings 
                          savingsbalance={savingsbalance}
                          setSavingsBalance={setSavingsBalance}
                          transactionDates={transactionDates}
                          setTransactionHistory={setTransactionHistory}
                          setTransactionDates={setTransactionDates}
                        />}
         />
        <Route path="/dailyexpenses" element={<ExpensesHistory
                          totalSpent={totalSpent}
                          setTotalSpent={setTotalSpent}
                          transactionHistory={transactionHistory}
                          transactionDates={transactionDates}
                         />}
        />
       </Routes>
      
      
      
      
    </>
  );
}

export default App;
