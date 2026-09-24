import axios from 'axios';
import { useState } from 'react';
import './addSpending.css';
function Addspending({setAmount,setCategory,setDescription,date,amount,category,description,submitSpending,totalSpent,setTotalSpent,setShowform}){
    return(
        <>
          <main className='addspendings-main' id="add-spendings">
            <form className='add-form' onSubmit={(e)=>{ e.preventDefault();
                 submitSpending();
                 setTotalSpent(Number(totalSpent)+Number(amount));
                 setShowform(false);               
             }}>
            <svg onClick={()=>{setShowform(false);}} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z" fill="#0F1729"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" fill="#0F1729"/>
            </svg>
            <label>Amount:</label>
            <input placeholder='₹0.00'  type="digit" required value={amount} onChange={(e)=>(
                setAmount(e.target.value)
            )}></input>
            <label>Category:</label>
            <select placeholder="where you spent?" value={category} onChange={(e)=>(
                setCategory(e.target.value)
            )}>
                <option value="" disabled>where you spent?</option>
                <option value="food">Food</option>
                <option value="snacks">Snacks</option>
                <option value="entertainment">Entertainment</option>
                <option value="stationary">Stationary</option>
                <option value="medical">Medical</option>
                <option value="housing">Housing</option>
                <option value="others">Others</option>
            </select>
            <label>Description:</label>
            <input placeholder='give a small description on your spending..' type='text' required value={description} onChange={(e)=>(
                setDescription(e.target.value)
            )}></input>
            <button className='spent-submit' type='submit'>ADD</button>
          </form>
          </main>
        </>
    );
}
export default Addspending;