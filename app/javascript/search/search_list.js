import React from 'react'
import PropTypes from 'prop-types'
import {urlPrefixHelper} from '../helpers/url_prefix_helper.js.erb'
import {checkForNA, addressStringValueOrNa, phoneNumberOrNa} from './common/commonUtils'

export default class SearchList extends React.Component {
  render () {
    const searchResult = this.props.searchResults
    const resultTable = searchResult.map((result, index) => {
      const fullAddress = addressStringValueOrNa(result.addresses)
      const phoneNo = phoneNumberOrNa(result.phones)

      return (
        <tr key={index}>
          <td><a href={urlPrefixHelper('/facilities/' + result.license_number)}>{result.name}</a></td>
          <td>{result.license_number}</td>
          <td>{checkForNA(result.type)}</td>
          <td>{checkForNA(result.status)}</td>
          <td>{result.name}</td>
          <td>{fullAddress}</td>
          <td>{result.county.value}</td>
          <td>{phoneNo}</td>
          <td>{checkForNA(result.email_address)}</td>
          <td>{'N/A'
          }<p>Phone: <span>{phoneNo}</span></p></td>
        </tr>
      )
    })
    return (
      <div className='main_table'>
        <table className='table'>
          <thead>
            <tr>
              <th>Facility Name </th>
              <th>Facility license/ Approval #</th>
              <th>Facility Type</th>
              <th>Status</th>
              <th>Licensee Name</th>
              <th>Facility Address</th>
              <th>County</th>
              <th>Phone Number</th>
              <th>Facility Email</th>
              <th>Assigned Worker</th>
            </tr>
          </thead>
          <tbody>
            {resultTable}
          </tbody>
        </table>
      </div>
    )
  }
}

SearchList.propTypes = {
  searchResults: PropTypes.array.isRequired
}

SearchList.defaultProps = {
  searchResults: []
}
