import { Link } from 'react-router-dom';
import './expensesHistory.css';
function ExpensesHistory({totalSpent,transactionHistory,transactionDates}){
    const today=new Date();
    const yesterday=new Date();
    yesterday.setDate(today.getDate()-1);
    const todayString=today.toLocaleDateString("en-GB");
    const yesterdayString=yesterday.toLocaleDateString("en-GB");
    return(
        <>
          <main className="expenseshistory-main">
            <nav>
                <ul className='nav-bar'>
                    <Link className="link" to="/"><li className='nav'>Home</li></Link>
                    <Link className='link' to="/spendings"><li className='nav'>Today's Spendings</li></Link>
                    <Link className='link' to="/savings"><li className='nav'>Savings</li></Link>
                </ul>
            </nav>
            <div>Total Expenses:{totalSpent}</div>
            <section className='expense-history'>
                <div >
                    {transactionDates.slice().reverse().map(itemDate =>(
                        <div key={itemDate.id} className='specific-date'>
                            <h1>{itemDate.date==yesterdayString? "Yesterday" 
                            :itemDate.date==todayString? "Today" : itemDate.date}</h1>
                            {transactionHistory.filter(item => item.date==itemDate.date).slice().reverse().map(item =>(
                                <div className='expensesHistory-details'>
                                    <div>{item.amount}</div>
                                    <div>{item.time || item.currentTime}</div>
                                    <div>{item.category || item.source}</div>
                                    <div className={item.type=="spending" ? "negative" : "positive"}>{item.type}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
          </main>
        </>
    );
}
export default ExpensesHistory;