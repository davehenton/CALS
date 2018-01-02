import React from 'react'
import {FacilityComponent} from 'components/rfa_forms/fosterFacilityComponent.js'
import {shallow, mount} from 'enzyme'

describe('foster Facility Component', () => {
  let component, onFacilityChangeSpy,
    removeFacilityCardSpy, q2History

  beforeEach(() => {
    q2History = {
      'facilities': ['new']
    }
    removeFacilityCardSpy = jasmine.createSpy('removeFacilityCard')
    onFacilityChangeSpy = jasmine.createSpy('onFacilityChange')
    component = shallow(<FacilityComponent
      index={0}
      value={''}
      facility={q2History.facilities}
      defKey='applications_for_adoption_q2'
      subKey='facilities'
      removeFacilityCard={removeFacilityCardSpy}
      onChange={onFacilityChangeSpy}
    />)
  })
  it('verify remove added Facility Name', () => {
    let removeButton = component.find('a')
    removeButton.simulate('click', 'event')
    expect(removeFacilityCardSpy).toHaveBeenCalledWith('event', [ 'new' ], 0, 'applications_for_adoption_q2', 'facilities')
  })
  it('verify onChange function for Facility name Field', () => {
    let changeFacilityName = component.find('#typeOfLicense0')
    changeFacilityName.simulate('change', {target: {value: 'Faciity New'}})
    expect(onFacilityChangeSpy).toHaveBeenCalledWith({ target: { value: 'Faciity New' } }, [ 'new' ], 0, 'applications_for_adoption_q2', 'facilities', 'Faciity New')
  })
})
