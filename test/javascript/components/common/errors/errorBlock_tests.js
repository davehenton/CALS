import React from 'react'
import ErrorBlock from 'components/common/errors/errorBlock'
import {shallow, mount} from 'enzyme'

describe('Error Block', () => {
  let errorBlockComp, childObj
  beforeEach(() => {
    errorBlockComp = shallow(<ErrorBlock

    />)
  })
  it('verify error block returned html', () => {
    errorBlockComp.setState({
      error: true,
      errorInfo: 'There was an error'
    })
    expect(errorBlockComp.find('h2').length).toEqual(1)
  })
})
