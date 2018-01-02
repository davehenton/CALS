import React from 'react'
import ChildDesiredCard from 'rfa_forms/rfa01a_edit_view/childDesiredCard.jsx'
import {siblingGroups, ageGroups, selec} from './../../helpers/constants'
import {shallow, mount} from 'enzyme'

describe('Verify relation between applicant', function () {
  const childDesired = {
    child_identified: '',
    child_in_home: '',
    preferred_ages: [],
    preferred_sibling_group_up_to: {
      id: '',
      value: ''
    }
  }

  let setParentStateSpy, childCardComp, onChangeSpy
  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    onChangeSpy = jasmine.createSpy('')
    childCardComp = shallow(<ChildDesiredCard
      desiredChildSection={childDesired}
      setParentState={setParentStateSpy}
      siblingGroups={siblingGroups.items}
      ageGroups={ageGroups.items}
    />)
  })
  it('test Sibling onChange event', () => {
    let siblingCheckBoxField = childCardComp.find('#sibling-0')
    siblingCheckBoxField.simulate('change', {target: {value: 'true'}})
    childDesired.preferred_sibling_group_up_to = { id: 1, value: '0' }
    expect(setParentStateSpy).toHaveBeenCalledWith('preferred_sibling_group_up_to', childDesired.preferred_sibling_group_up_to)
  })

  describe('#YesNoRadioComponent', () => {
    let setParentStateSpy
    beforeEach(() => {
      setParentStateSpy = jasmine.createSpy('setParentState')
      childCardComp = mount(<ChildDesiredCard
        desiredChildSection={childDesired}
        setParentState={setParentStateSpy}
        siblingGroups={siblingGroups.items}
        ageGroups={ageGroups.items}
      />)
    })
    it('verify child_identified', () => {
      let relationField = childCardComp.find('#child_identifiedtrue').hostNodes()
      relationField.simulate('change', {target: {value: 'false'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('child_identified', 'false')
    })
  })

  it('test child in Home Dropdown feature', () => {
    childDesired.child_identified = 'true'
    let newChildDesired = childDesired
    let newchildCardComp = mount(<ChildDesiredCard
      desiredChildSection={newChildDesired}
      setParentState={setParentStateSpy}
      siblingGroups={siblingGroups.items}
      ageGroups={ageGroups.items}
    />)
    newChildDesired.child_in_home = 'true'
    let childInHomeField = newchildCardComp.find('#child_in_hometrue').hostNodes()
    childInHomeField.simulate('change', {target: {value: 'false'}})
    expect(setParentStateSpy).toHaveBeenCalledWith('child_in_home', 'false')
  })
})
