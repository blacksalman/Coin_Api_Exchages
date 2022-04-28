import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Table from './components/Table';
import Pagination from './components/Pagination';

function App() {
  const [getExchange, setGetExchange] = useState([]);
  const [getIcons, setGetIcon] = useState([]);
  const [exchange, setExchange] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [exchangesPerPage, setExchangesPerPage] = useState(10);
  const [filterExchange, setFilterExchange] = useState('');

  useEffect(() => {
    const fetchExchanges = async () => {
      setLoading(true);
      const config = {
        method: 'get',
        url: 'https://rest.coinapi.io/v1/exchanges',
        headers: {
          'X-CoinAPI-Key': 'B3795660-80F3-4324-93B6-02D8E5FFFCB6'
        }
      };

      const resData = await axios(config);
      const res = resData.data.filter(res => res.volume_1day_usd > 1.0e9)
      setGetExchange(res);
      setLoading(false);
    }

    fetchExchanges();

    const fetchIcons = async () => {
      setLoading(true);
      const config = {
        method: 'get',
        url: 'https://rest.coinapi.io/v1/exchanges/icons/32',
        headers: { 
          'X-CoinAPI-Key': 'B3795660-80F3-4324-93B6-02D8E5FFFCB6'
        }
      };

      const res = await axios(config);
      setGetIcon(res.data);
      setLoading(false);
    }

    fetchIcons();

  }, []);

  useEffect(() => {
    const listExchanges = getExchange.map(exchange => ({ ...exchange, ...getIcons.find(icon => icon.exchange_id === exchange.exchange_id) }))
  setExchange(listExchanges)

  }, [getExchange, getIcons])

  //Get current posts
  const indexOfLastPost = currentPage * exchangesPerPage;
  const indexOfFirstPost = indexOfLastPost - exchangesPerPage;
  const currentPosts = exchange.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const setFilter = (filter) => setFilterExchange(filter);

  return (
    <div className="container mt-5">
      <h1 className='text-primary mb-3'>Top crypto exchanges</h1>
      <Table exchanges={currentPosts} loading={loading} setFilter={setFilter} filter={filterExchange} />
      <Pagination postsPerPage={exchangesPerPage} totalPosts={exchange.length} paginate={paginate} />
    </div>
  );
}

export default App;
