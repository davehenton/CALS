import React from 'react'
import FosterCareHistoryCard from 'rfa_forms/rfa01a_edit_view/FosterCareHistoryCard.jsx'
import {FosterCareHistoryFields, blankFosterCareFields} from 'rfa_forms/rfa01a_edit_view/FosterCareHistoryFields.js'
import {shallow, mount} from 'enzyme'
import {yesNo, licenseTypes, selectedYes} from './../../helpers/constants'
var TestUtils = require('react-dom/test-utils')

describe('foster car card tests', function () {
  let fosterCareCardComponent
  let fosterCareFieldsComponent
  let props
  let setParentStateSpy
  let setFocusStateSpy
  let getFocusClassNameSpy
  let setFosterCareNestedStateSpy
  let setFosterCareHistoryStateSpy
  let addFacilityCardSpy
  let removeFacilityCardSpy
  let addAgencyCardSpy
  let removeAgencyCardSpy
  let onAgencyChangeSpy
  let onFacilityChangeSpy

  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    setFocusStateSpy = jasmine.createSpy('setFocusState')
    getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
    setFosterCareNestedStateSpy = jasmine.createSpy('setFosterCareNestedState')
    setFosterCareHistoryStateSpy = jasmine.createSpy('setFosterCareHistoryState')
    addFacilityCardSpy = jasmine.createSpy('addFacilityCard')
    removeFacilityCardSpy = jasmine.createSpy('removeFacilityCard')
    addAgencyCardSpy = jasmine.createSpy('addAgencyCard')
    removeAgencyCardSpy = jasmine.createSpy('removeAgencyCard')
    onAgencyChangeSpy = jasmine.createSpy('onAgencyChange')
    onFacilityChangeSpy = jasmine.createSpy('onFacilityChange')

    props = {
      yesNo: yesNo,
      license_types: licenseTypes,
      fosterCareHistory: blankFosterCareFields,
      setParentState: setParentStateSpy,
      setFocusState: setFocusStateSpy,
      getFocusClassName: getFocusClassNameSpy
    }
    fosterCareCardComponent = shallow(<FosterCareHistoryCard {...props} />)
    fosterCareFieldsComponent = shallow(<FosterCareHistoryFields {...props} />)
  })
  describe('Verify Foster Care Card Selection', () => {
    it('select foster care card', () => {
      let fosterCareCardComponentDiv = fosterCareCardComponent.find('#FosterCareHistorySection')
      fosterCareCardComponentDiv.simulate('click')
      expect(setFocusStateSpy).toHaveBeenCalledWith('FosterCareHistoryCard')
    })
  })
  describe('Verify all foster card Component fields', () => {
    it('verify defaults', () => {
      // main card has three div sections
      expect(fosterCareCardComponent.findWhere(n => n.type() === 'div').length).toEqual(3)
      // main div section
      expect(fosterCareCardComponent.find('#foster_care_history_cards').children.length).toEqual(1)
      // has 7 yes/no drop down questions
      expect(fosterCareFieldsComponent.find('div[className="row agency-list-item"]').length).toEqual(7)
      // has 6 total add buttons
      expect(fosterCareFieldsComponent.find('div[className="hidden"] div[className=""] div[className="text-center"]').length).toEqual(6)
    })
  })

  describe('when "radio button is changed', () => {
    it('expect set foster care nested state to be called', function () {
      const onChangeSpy = jasmine.createSpy('setFosterCareNestedState')
      const wrapper = mount(<FosterCareHistoryFields {...props} onChange={onChangeSpy('foster_care_licenses_q1', 'was_previously_licensed', true)} />)
      wrapper.find('#q1-select-dropdowntrue').hostNodes()
      wrapper.simulate('change')
      expect(onChangeSpy.calls.count()).toEqual(1)
    })

    describe('when "Add another agency" is clicked', () => {
      it('adds a agency', () => {
        let event
        const addAgencySpy = jasmine.createSpy('addAgencyCard')
        const wrapper = mount(<FosterCareHistoryFields {...props} addAgencyCard={addAgencySpy(event, 'foster_care_licenses_q1', 'agencies')} />)
        // find the button and type check
        const button = wrapper.find('#addAgency_q1')
        // simulate click and check to see if called
        button.simulate('click', { preventDefault () {} })

        spyOn(wrapper.instance(), 'addAgencyCard').and.callThrough()
        wrapper.instance().addAgencyCard({ preventDefault () {} }, [{name: '', type: {}}], 'foster_care_licenses_q1', 'agencies')

        expect(wrapper.instance().props.fosterCareHistory.foster_care_licenses_q1.agencies.length).toEqual(2)
      })
    })
    describe('when "Remove agency" is clicked', () => {
      it('calls remove agency', () => {
        const removeAgencySpy = jasmine.createSpy('removeAgencyCard')
        const event = jasmine.createSpy('e', ['preventDefault'])
        const wrapper = mount(<FosterCareHistoryFields {...props} removeAgencyCard={removeAgencySpy(event, [{name: 'test 1', type: {}}, {name: 'test 2', type: {}}], 0, 'foster_care_licenses_q1', 'agencies')} />)

        expect(wrapper.instance().props.fosterCareHistory.foster_care_licenses_q1.agencies.length).toEqual(2)

        spyOn(wrapper.instance(), 'removeAgencyCard').and.callThrough()
        wrapper.instance().removeAgencyCard({ preventDefault () {} }, [{name: 'test 1', type: {}}, {name: 'test 2', type: {}}], 0, 'foster_care_licenses_q1', 'agencies')

        expect(wrapper.instance().removeAgencyCard.calls.count()).toEqual(1)
      })
    })
    describe('when "add another facility" is clicked', () => {
      it('calls add facility', () => {
        let event
        const addFacilitySpy = jasmine.createSpy('addFacilityCard')
        const wrapper = mount(<FosterCareHistoryFields {...props} addFacilityCard={addFacilitySpy(event, [''], 'applications_for_adoption_q2', 'facilities')} />)
        // find the button and type check
        const button = wrapper.find('#addFacility_q2')
        // simulate click and check to see if called
        button.simulate('click', { preventDefault () {} })

        spyOn(wrapper.instance(), 'addFacilityCard').and.callThrough()
        wrapper.instance().addFacilityCard({ preventDefault () {} }, [], 'applications_for_adoption_q2', 'facilities')

        expect(wrapper.instance().props.fosterCareHistory.applications_for_adoption_q2.facilities.length).toEqual(2)
      })
    })
    describe('when "Add Another facility q4" is clicked', () => {
      it('adds a agency', () => {
        let event
        const addAgencySpy = jasmine.createSpy('addAgencyCard')
        const wrapper = mount(<FosterCareHistoryFields {...props} addAgencyCard={addAgencySpy(event, [{name: '', type: {}}], 'employment_in_facilities_q4', 'facilities')} />)
        // find the button and type check
        const button = wrapper.find('#addAgency_q4')
        // simulate click and check to see if called
        button.simulate('click', { preventDefault () {} })

        spyOn(wrapper.instance(), 'addAgencyCard').and.callThrough()
        wrapper.instance().addAgencyCard({ preventDefault () {} }, [{name: '', type: {}}], 'employment_in_facilities_q4', 'facilities')

        expect(wrapper.instance().props.fosterCareHistory.employment_in_facilities_q4.facilities.length).toEqual(2)
      })
    })
    describe('when "Add another agency q3" is clicked', () => {
      it('adds a agency', () => {
        let event
        const addAgencySpy = jasmine.createSpy('addAgencyCard')
        const wrapper = mount(<FosterCareHistoryFields {...props} addAgencyCard={addAgencySpy(event, [{name: '', type: {}}], 'facility_operation_licenses_q3', 'agencies')} />)
        // find the button and type check
        const button = wrapper.find('#addFacility_q3')
        // simulate click and check to see if called
        button.simulate('click', { preventDefault () {} })

        spyOn(wrapper.instance(), 'addAgencyCard').and.callThrough()
        wrapper.instance().addAgencyCard({ preventDefault () {} }, [{name: '', type: {}}], 'facility_operation_licenses_q3', 'agencies')

        expect(wrapper.instance().props.fosterCareHistory.facility_operation_licenses_q3.agencies.length).toEqual(2)
      })
    })
    describe('when "Add agency q5" is clicked', () => {
      it('adds a agency', () => {
        let event
        const addAgencySpy = jasmine.createSpy('addAgencyCard')
        const wrapper = mount(<FosterCareHistoryFields {...props} addAgencyCard={addAgencySpy(event, [{name: '', type: {}}], 'denial_history_q5', 'agencies')} />)
        // find the button and type check
        const button = wrapper.find('#denial_history_q5')
        // simulate click and check to see if called
        button.simulate('click', { preventDefault () {} })

        spyOn(wrapper.instance(), 'addAgencyCard').and.callThrough()
        wrapper.instance().addAgencyCard({ preventDefault () {} }, [{name: '', type: {}}], 'denial_history_q5', 'agencies')

        expect(wrapper.instance().props.fosterCareHistory.denial_history_q5.agencies.length).toEqual(2)
      })
    })
    describe('when "Add agency q6" is clicked', () => {
      it('adds a agency', () => {
        let event
        const addAgencySpy = jasmine.createSpy('addAgencyCard')
        const wrapper = mount(<FosterCareHistoryFields {...props} addAgencyCard={addAgencySpy(event, [{name: '', type: {}}], 'suspension_revocation_history_q6', 'agencies')} />)
        // find the button and type check
        const button = wrapper.find('#addAgency_suspension_q6')
        // simulate click and check to see if called
        button.simulate('click', { preventDefault () {} })

        spyOn(wrapper.instance(), 'addAgencyCard').and.callThrough()
        wrapper.instance().addAgencyCard({ preventDefault () {} }, [{name: '', type: {}}], 'suspension_revocation_history_q6', 'agencies')

        expect(wrapper.instance().props.fosterCareHistory.suspension_revocation_history_q6.agencies.length).toEqual(2)
      })
    })
    describe('when "Remove facility" is clicked', () => {
      it('calls remove facility', () => {
        const removeFacilitySpy = jasmine.createSpy('removeFacilityCard')
        const event = jasmine.createSpy('e', ['preventDefault'])
        const wrapper = mount(<FosterCareHistoryFields {...props} removeAgencyCard={removeFacilitySpy(event, ['test', 'test2'], 1, 'applications_for_adoption_q2', 'facilities')} />)

        spyOn(wrapper.instance(), 'removeFacilityCard').and.callThrough()
        wrapper.instance().removeFacilityCard({ preventDefault () {} }, ['test', 'test2'], 1, 'applications_for_adoption_q2', 'facilities')

        expect(wrapper.instance().removeFacilityCard.calls.count()).toEqual(1)
      })
    })
    describe('when "On agency change" is called', () => {
      it('registers a name change', () => {
        const onAgencyChangeSpy = jasmine.createSpy('onAgencyChange')
        const event = jasmine.createSpy('e', ['preventDefault'])
        const wrapper = mount(<FosterCareHistoryFields {...props} onAgencyChange={onAgencyChangeSpy(event, [{name: 'ted', type: {}}, {name: 'test 2', type: {}}], 0, 'name', 'foster_care_licenses_q1', 'agencies', 'theodore')} />)

        spyOn(wrapper.instance(), 'onAgencyChange').and.callThrough()
        expect(onAgencyChangeSpy.calls.count()).toEqual(1)
        const input = wrapper.find('#agency-q1-name-0').hostNodes()
        expect(input.type()).toEqual('input')
      })
    })
    describe('when "on facility change" is called', () => {
      it('registers a name change', () => {
        const onFacilityChangeSpy = jasmine.createSpy('onFacilityChange')
        const event = jasmine.createSpy('e', ['preventDefault'])
        const wrapper = mount(<FosterCareHistoryFields {...props} onFacilityChange={onFacilityChangeSpy(event, ['test', 'test 2'], 0, 'applications_for_adoption_q2', 'facilities', 'theodore')} />)

        spyOn(wrapper.instance(), 'onFacilityChange').and.callThrough()

        expect(onFacilityChangeSpy.calls.count()).toEqual(1)
        const input = wrapper.find('input#typeOfLicense0').first()
        expect(input.type()).toEqual('input')
      })
    })
    describe('#setFosterCareNestedState', () => {
      let onChangeSpy
      let wrapper
      beforeEach(() => {
        onChangeSpy = jasmine.createSpy('setFosterCareNestedState')
        wrapper = shallow(<FosterCareHistoryFields {...props} onChange={onChangeSpy()} />)
      })
      it('is called when Q2 Adoption Field is changed', () => {
        wrapper.find('#q2-select-dropdowntrue').hostNodes()
        wrapper.simulate('change')
        expect(onChangeSpy.calls.count()).toEqual(1)
      })
      it('is called when Q3 Adoption Field is changed', () => {
        wrapper.find('#q3-select-dropdowntrue').hostNodes()
        wrapper.simulate('change')
        expect(onChangeSpy.calls.count()).toEqual(1)
      })
      it('is called when Q4 Adoption Field is changed', () => {
        wrapper.find('#q4-select-dropdowntrue').hostNodes()
        wrapper.simulate('change')
        expect(onChangeSpy.calls.count()).toEqual(1)
      })
      it('is called when Q5 Adoption Field is changed', () => {
        wrapper.find('#q5-select-dropdowntrue').hostNodes()
        wrapper.simulate('change')
        expect(onChangeSpy.calls.count()).toEqual(1)
      })
      it('is called when Q6 Adoption Field is changed', () => {
        wrapper.find('#q6-select-dropdowntrue').hostNodes()
        wrapper.simulate('change')
        expect(onChangeSpy.calls.count()).toEqual(1)
      })
    })
  })
})
