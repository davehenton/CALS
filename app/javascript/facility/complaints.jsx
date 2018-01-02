import React from 'react'
import PropTypes from 'prop-types'

const title = 'Complaint History'

export default class Complaints extends React.Component {
  render () {
    let FacilityComplaints = this.props.facilityData
    let complaints = FacilityComplaints.complaints
    let facilityComplaintsTable = []
    facilityComplaintsTable = complaints.map((complaint) => {
      return (
        <tr key={complaint.id} >
          <td data-label='id'> {complaint.id} </td>
          <td data-label='complaint date'> {complaint.complaint_date} </td>
          <td data-label='assigned worker'> {complaint.assigned_worker} </td>
          <td data-label='control number' > {complaint.control_number} </td>
          <td data-label='priority level'> {complaint.priority_level} </td>
          <td data-label='status'> {complaint.status} </td>
          <td data-label='approval date'> {complaint.approval_date} </td>
        </tr>
      )
    })
    return (
      <div className='facility-children col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        <div className='facility-children-block'>
          <div className='children-title'> <h3> {title} </h3> </div>
          <table className='table'>
            <thead>
              <tr>
                <th> ID </th>
                <th> COMPLAINT DATE</th>
                <th> ASSIGNED WORKER </th>
                <th> CONTROL NUMBER </th>
                <th> PRIORITY </th>
                <th> STATUS </th>
                <th> APPROVAL DATE </th>
              </tr>
            </thead>
            <tbody >
              {facilityComplaintsTable}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Complaints.propTypes = {
  facilityData: PropTypes.object.isRequired
}

Complaints.defaultProps = {
  facilityData: {}
}
