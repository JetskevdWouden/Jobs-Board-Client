import React from 'react'
import { Link } from 'react-router-dom'
import './CompaniesList.css'
import ReactPaginate from 'react-paginate'
import './Pagination.css'

const CompaniesList = (props) => {
  const { companies } = props

  if(!companies){
    return (
      <div style={{ textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    )
  }

  const listCompanies = companies && companies.rows.map(company => {
    return (
      <Link key={company.id} to={`/company/${company.id}`} className="companies-list">
        <div className="companies-list-link">
          <li key={company.id} >
            <table className="company-link-table">
                <tbody>
                    <tr>
                      <th>{company.name}</th>  
                    </tr>
                    <tr>
                      <tr>
                        <td className="application-count">
                            {company.applicationCount}
                        </td>
                        <td className="interview-count">
                            {company.interviewCount}
                        </td>
                        <td className="offer-count">
                            {company.offerCount}
                        </td>
                      </tr>
                    </tr>
                </tbody>
            </table>          
          </li>
        </div>
      </Link>
    )
  })

  const pagination = companies.pages > 1 &&
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={props.OnPageChange}
      forcePage={props.currentPage}
      pageCount={companies.pages}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{
        textTransform: "uppercase",
        fontSize: 20
      }}>
        Companies
      </h3>
      <form
        onSubmit={props.OnSubmit}
        autoComplete='off'
        className='form-list'>

        <input
          type='text'
          placeholder='search'
          name='companyName'
          value={props.companyName}
          onChange={props.OnSearchChange}>
        </input>

        <button>Submit</button>
      </form>
      <div className='option-list'>
        <label>Sort by: &nbsp;
          <select onChange={props.OnSortChange} value={props.sortBy}>
            <option value='applicationCount'>application count</option>
            <option value='interviewCount'>interview count</option>
            <option value='offerCount'>job offer count</option>
            <option value='jobOfferAfterApplyingRate'>success rate of applications</option>
          </select>
        </label>
        <div className="companies-list-header">
          {listCompanies}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
      </div>
      {pagination}
    </div>
  )
}

export default CompaniesList