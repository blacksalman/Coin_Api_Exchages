import React from 'react'

const Table = ({ exchanges, loading, setFilter, filter }) => {
  if (loading) {
    return <h2>Loading...</h2>
  }
  
  return (
    <>
    <input type='text' placeholder='Find an exchange' onChange={event => setFilter(event.target.value)}/>
    <table className='table'>
      <thead>
        <tr>
          <th>EXCHANGES</th>
          <th>24H TRADE VOLUME</th>
        </tr>
      </thead>
      <tbody>
          {exchanges.filter(filterData => {
            if (filter === '') {
              return filterData
            }
            else if (filterData.name.toLowerCase().includes(filter.toLowerCase())) {
              return filterData
            }
        }).map((exchange, index) =>
        
        {
          
          return (
        
            <tr key={index}>
              
              <td>
                <div className='d-flex'>
                  <span>
                    {index + 1}
                  </span>
                  <span style={{position: 'relative', left: '15px'}}>
                    {exchange.url ? <img className="exchangeImage" src={exchange.url} alt='exchangeImage' /> : ' '}
                  </span>
                  <span style={{position: 'relative', left: '25px'}}>
                    {exchange.name}
                  </span>
                </div>
              </td>
            <td>${(exchange.volume_1day_usd/1.0e9).toFixed(2) } billion</td>
          </tr>
        )})}
      </tbody>
      </table>
      </>
  )
  
}

export default Table