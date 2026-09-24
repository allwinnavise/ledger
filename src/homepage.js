import { Link } from 'react-router-dom';
import './homepage.css';
import homepagewlpr from './homepagewlpr.jpg';
function Home() {
  return (
    <>
      <main className='homepage-main'>
        <nav>
            <ul className='nav-bar'>

                <Link className="link" to="/spendings"><li className='nav'>Today's Spendings</li></Link>
                <Link className="link" to="/savings"><li className='nav'>Savings</li></Link>
                <Link className="link" to="/dailyexpenses"><li className='nav'>Daily Expenses</li></Link>
            </ul>
        </nav>
        <div className='homeimage'>
                <img src={homepagewlpr} alt="home image"/>
        </div>
      </main>
    </>
  );
}

export default Home;
