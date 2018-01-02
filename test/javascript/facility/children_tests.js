import React from 'react'
import Children from '../../../app/javascript/facility/children.jsx'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('Verify Children Component', function () {
  const props = {
    facilityData: {
      count: 3,
      children: [{
        id: 2222,
        person: {
          age: 17,
          date_of_birth: '2000-05-28',
          first_name: 'Mei',
          gender: 'F',
          last_name: 'Takahashi'
        },
        date_of_placement: '01/02/2003',
        assigned_worker: 'asdfg',
        county_of_origin: 'sacramento'
      }]}
  }
  const renderChildComp = new ShallowRenderer()
  const childComp = renderChildComp.render(<Children {...props} />)
  const resultTag = childComp.props
  it('check Children table', function () {
    expect(resultTag.className).toBe('facility-children col-xs-12 col-sm-12 col-md-12 col-lg-12')
  })
})
