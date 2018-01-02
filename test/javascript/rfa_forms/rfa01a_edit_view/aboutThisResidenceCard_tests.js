import React from 'react'
import AboutThisResidenceCard from 'rfa_forms/rfa01a_edit_view/aboutThisResidenceCard.jsx'
import {languageTypes, residenceTypes, selectedYes} from './../../helpers/constants'
import {shallow, mount} from 'enzyme'

describe('Verify Physical Address', function () {
  const blankAboutThisResidenceFields = Object.freeze({
    residence_ownership_type: {
      id: '',
      value: ''
    },
    home_languages: [{
      id: '',
      value: ''
    }],
    directions_to_home: '',
    weapon_in_home: '',
    body_of_water_exist: 'true',
    body_of_water_description: '',
    others_using_residence_as_mailing: 'true',
    other_people_using_residence_as_mailing: [{
      first_name: '',
      middle_name: '',
      last_name: ''
    }]
  })

  let setParentStateSpy, residenceCardComp
  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    residenceCardComp = shallow(<AboutThisResidenceCard

      languageTypes={languageTypes.items}
      residenceTypes={residenceTypes.items}
      aboutResidence={blankAboutThisResidenceFields}
      setParentState={setParentStateSpy}
    />)
  })

  it('verify directions to home change', () => {
    let relationShipField = residenceCardComp.find('#directions')
    relationShipField.simulate('change', {target: {value: 'gate way oaks'}})
    expect(setParentStateSpy).toHaveBeenCalledWith('directions_to_home', 'gate way oaks')
  })
  describe('#YesNoRadioComponent', () => {
    let setParentStateSpy
    beforeEach(() => {
      setParentStateSpy = jasmine.createSpy('setParentState')
      residenceCardComp = mount(<AboutThisResidenceCard

        languageTypes={languageTypes.items}
        residenceTypes={residenceTypes.items}
        aboutResidence={blankAboutThisResidenceFields}
        setParentState={setParentStateSpy}
      />)
    })
    it('verify body of water exists change', () => {
      let relationShipField = residenceCardComp.find('#body_of_water_existtrue').hostNodes()
      relationShipField.simulate('change', {target: {value: 'false'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('body_of_water_exist', 'false')
    })
    it('verify weapons address change', () => {
      let relationShipField = residenceCardComp.find('#weaponstrue').hostNodes()
      relationShipField.simulate('change', {target: {value: 'false'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('weapon_in_home', 'false')
    })
    it('verify other using residence as mailing change', () => {
      let relationShipField = residenceCardComp.find('#others_using_residence_as_mailingtrue').hostNodes()
      relationShipField.simulate('change', {target: {value: 'false'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('others_using_residence_as_mailing', 'false')
    })
  })
  it('verify body of water description', () => {
    let relationShipField = residenceCardComp.find('#body_of_water_description')
    relationShipField.simulate('change', {target: {value: 'Text'}})
    expect(setParentStateSpy).toHaveBeenCalledWith('body_of_water_description', 'Text')
  })

  it('verify residence types address change', () => {
    let relationShipField = residenceCardComp.find('#residenceTypes')
    relationShipField.simulate('change', {target: {options: {'1': {value: '1', text: 'Own'}, selectedIndex: 1}}})
    expect(setParentStateSpy).toHaveBeenCalledWith('residence_ownership', {id: '1', value: 'Own'})
  })

  it('verify first name', () => {
    let relationShipField = residenceCardComp.find('#firstName')
    spyOn(residenceCardComp.instance(), 'onChange').and.callThrough()
    relationShipField.simulate('change', {target: {value: 'Text'}})
    // expect(onChangeSpy).toHaveBeenCalledWith('firstName', 'Text')
    expect(residenceCardComp.instance().onChange).toHaveBeenCalledWith('first_name', 'Text')
  })
  it('verify middle name', () => {
    let relationShipField = residenceCardComp.find('#middleName')
    spyOn(residenceCardComp.instance(), 'onChange').and.callThrough()
    relationShipField.simulate('change', {target: {value: 'Text'}})
    // expect(onChangeSpy).toHaveBeenCalledWith('firstName', 'Text')
    expect(residenceCardComp.instance().onChange).toHaveBeenCalledWith('middle_name', 'Text')
  })
  it('verify last name', () => {
    let relationShipField = residenceCardComp.find('#lastName')
    spyOn(residenceCardComp.instance(), 'onChange').and.callThrough()
    relationShipField.simulate('change', {target: {value: 'Text'}})
    // expect(onChangeSpy).toHaveBeenCalledWith('firstName', 'Text')
    expect(residenceCardComp.instance().onChange).toHaveBeenCalledWith('last_name', 'Text')
  })

  it('verify languages select change', () => {
    let relationShipField = residenceCardComp.find('.languages')
    relationShipField.simulate('change', [{id: '1', value: 'English'}])
    expect(setParentStateSpy).toHaveBeenCalledWith('home_languages', [{id: '1', value: 'English'}])
  })
})

describe('Verify Physical Address first name, middle name and last name', function () {
  const blankAboutThisResidenceFields = Object.freeze({
    home_languages: [{
      id: '',
      value: ''
    }],
    others_using_residence_as_mailing: 'true'
  })

  let setParentStateSpy, residenceCardComp
  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    residenceCardComp = shallow(<AboutThisResidenceCard

      languageTypes={languageTypes.items}
      residenceTypes={residenceTypes.items}
      aboutResidence={blankAboutThisResidenceFields}
      setParentState={setParentStateSpy}
    />)
  })

  it('verify first name', () => {
    let relationShipField = residenceCardComp.find('#firstName')
    spyOn(residenceCardComp.instance(), 'onChange').and.callThrough()
    residenceCardComp.update()
    relationShipField.simulate('change', {target: {value: 'text'}})
    // expect(onChangeSpy).toHaveBeenCalledWith('firstName', 'Text')
    expect(residenceCardComp.instance().onChange).toHaveBeenCalledWith('first_name', 'text')
  })
  it('verify middle name', () => {
    let relationShipField = residenceCardComp.find('#middleName')
    spyOn(residenceCardComp.instance(), 'onChange').and.callThrough()
    residenceCardComp.update()
    relationShipField.simulate('change', {target: {value: 'text'}})
    // expect(onChangeSpy).toHaveBeenCalledWith('firstName', 'Text')
    expect(residenceCardComp.instance().onChange).toHaveBeenCalledWith('middle_name', 'text')
  })
  it('verify last name', () => {
    let relationShipField = residenceCardComp.find('#lastName')
    spyOn(residenceCardComp.instance(), 'onChange').and.callThrough()
    residenceCardComp.update()
    relationShipField.simulate('change', {target: {value: 'text'}})
    // expect(onChangeSpy).toHaveBeenCalledWith('firstName', 'Text')
    expect(residenceCardComp.instance().onChange).toHaveBeenCalledWith('last_name', 'text')
  })
})
