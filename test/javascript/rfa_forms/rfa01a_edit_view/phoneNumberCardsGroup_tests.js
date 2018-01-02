import React from 'react'
import PhoneComponent, {blankPhoneNumberFields} from 'rfa_forms/rfa01a_edit_view/phoneNumberCardsGroup'
import {PhoneNumberField} from 'components/common/phoneNumberFields'
import {shallow, mount} from 'enzyme'
import {phoneTypes} from './../../helpers/constants'
import Validator from 'helpers/validator.js'
var TestUtils = require('react-dom/test-utils')

describe('Verify Phone Card Component View', function () {
  let component
  let props
  const phoneNumber = {number: '3333-222-5545',
    phone_type: {id: '1', value: 'Cell'},
    preferred: false}

  let setParentStateSpy // = jasmine.createSpy()

  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    props = {
      phoneTypes: phoneTypes,
      phones: [phoneNumber],
      setParentState: setParentStateSpy,
      validator: new Validator({})
    }

    component = shallow(
      <PhoneComponent {...props} />
    )
  })

  describe('Verify Phone Card Component View', () => {
    it('has class name', function () {
      expect(component.find('.card-body').length).toEqual(1)
    })
    it('expcet children to be array', function () {
      expect(component.children.length).toEqual(1)
    })
  })

  describe('when "Add new phone number" is clicked', () => {
    it('expect phone card to be button', function () {
      const x = component.find('button[className="btn btn-default"]')
      expect(component.find('button[className="btn btn-default"]').type()).toEqual('button')
    })

    it('calls addCard and resulting phones contains 2 phone numbers', () => {
      spyOn(component.instance(), 'addCard').and.callThrough()
      component.instance().addCard()
      // component.find('.btn.btn-default').simulate('click')
      expect(component.instance().addCard).toHaveBeenCalled()

      // build data that parent should be called with
      let newData = []
      newData[0] = phoneNumber
      newData[1] = blankPhoneNumberFields

      // parent should be called with 2 phone numbers, 1st with data and 2nd with blank
      expect(setParentStateSpy).toHaveBeenCalledWith('phones', newData)

      // parent should be called with 2 numbers
      // expect(props.phones.length).toEqual(2)
    })
  })

  describe('when close phone card is clicked', () => {
    it('Clears data when 1 phone number is present', () => {
      spyOn(component.instance(), 'onPhoneClickClose').and.callThrough()
      component.find('.remove-btn').simulate('click')
      expect(component.instance().onPhoneClickClose).toHaveBeenCalledWith(0)

      // check if setParent is called
      expect(setParentStateSpy).toHaveBeenCalledWith('phones', [blankPhoneNumberFields])
      // expect(props.phones.length).toEqual(1)
    })

    it('Deletes a phone when 2 phone numbers are present', () => {
      let newData = []
      newData[0] = phoneNumber
      newData[1] = blankPhoneNumberFields
      component.setProps({phones: newData})

      spyOn(component.instance(), 'onPhoneClickClose').and.callThrough()
      component.find('.remove-btn').at(1).simulate('click')
      expect(component.instance().onPhoneClickClose).toHaveBeenCalledWith(1)

      // check if setParent is called
      expect(setParentStateSpy).toHaveBeenCalledWith('phones', [phoneNumber])
      expect(props.phones.length).toEqual(1)
    })
  })

  // describe('validate phone change', () => {
  //   it('allows to change type', () => {
  //     const newType = {id: '2', value: 'Mobile'}
  //     console.log(component.html())
  //     // why do I have to update this?
  //     component.update()
  //     console.log(component.html())
  //     component.find('#phone_type').simulate('change', {target: {value: '2'}})

  //     expect(component.instance().onPhoneFieldChange).toHaveBeenCalledWith(0, newType, 'phone_type')

  //     let tmpData = [phoneNumber]
  //     tmpData[0].phone_type = newType
  //     expect(setParentStateSpy).toHaveBeenCalledWith('phones', tmpData)
  //   })
  // })
})

describe('Preferred logic', () => {
  let component
  let props
  const phoneNumber = {number: '3333-222-5545',
    phone_type: {id: '1', value: 'Cell'},
    preferred: false}
  let setParentStateSpy

  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    props = {
      phoneTypes: phoneTypes,
      phones: [phoneNumber],
      validator: new Validator({}),
      setParentState: setParentStateSpy
    }

    component = mount(
      <PhoneComponent {...props} />
    )

    spyOn(component.instance(), 'onPhoneFieldChange').and.callThrough()
  })

  it('only 1 phone number is preferred', () => {
    let tmpData = []
    tmpData[0] = phoneNumber
    tmpData[1] = {number: '999-444-2323',
      phone_type: {id: '1', value: 'Cell'},
      preferred: true}

    component.setProps({phones: tmpData})
    component.find('input[type="checkbox"]').at(0).simulate('change', {target: {checked: true}})
    expect(component.instance().onPhoneFieldChange).toHaveBeenCalledWith(0, true, 'preferred')

    tmpData[0].preferred = true
    tmpData[1].preferred = false

    expect(setParentStateSpy).toHaveBeenCalledWith('phones', tmpData)
  })
  it('allows to change number', () => {
    const newNumber = '8884442323'
    // why do I have to update this?
    component.setProps({
      number: ''
    })
    component.find('input[type="text"]').simulate('change', {target: {value: newNumber}})
    expect(component.instance().onPhoneFieldChange).toHaveBeenCalledWith(0, newNumber, 'number')

    let tmpData = [phoneNumber]
    tmpData[0].number = newNumber
    expect(setParentStateSpy).toHaveBeenCalledWith('phones', tmpData)
  })

  // it('allows to change type', () => {
  //   const newType = {id: '2', value: 'Mobile'}
  //   console.log(component.html())
  //   // why do I have to update this?
  //   component.update()
  //   console.log(component.html())
  //   component.find('#phone_type').simulate('change', {target: {text: 'Mobile'}})

  //   expect(component.instance().onPhoneFieldChange).toHaveBeenCalledWith(0, newType, 'phone_type')

  //   let tmpData = [phoneNumber]
  //   tmpData[0].phone_type = newType
  //   expect(setParentStateSpy).toHaveBeenCalledWith('phones', tmpData)
  // })
})
