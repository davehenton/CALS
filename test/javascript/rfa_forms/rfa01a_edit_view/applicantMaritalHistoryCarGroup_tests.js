import React from 'react'
import ApplicantMaritalHistoryCardGroup, {formerSpousesDefaults, adultChildrenDefaults, applicantsHistoryDefaults} from 'rfa_forms/rfa01a_edit_view/applicantMaritalHistoryCardGroup'
import applicantMaritalHistoryCard from 'rfa_forms/rfa01a_edit_view/applicantMaritalHistoryCard'
import AdultChildrenFields from 'rfa_forms/rfa01a_edit_view/adultChildrenFields'
import {shallow, mount} from 'enzyme'
import {relationshipTypes, suffixTypes, prefixTypes, nameTypes, stateTypes, marriageTerminationReasons, relationshipToApplicantTypes} from '../../helpers/constants'
var TestUtils = require('react-dom/test-utils')

describe('foster car card tests', function () {
  let applicantMaritalHistoryCardGroupComponent

  let setParentStateSpy
  let setFocusStateSpy
  let getFocusClassNameSpy

  let addMaritalHistoryCardSpy
  let onMaritalHistoryClickCloseSpy

  let addAdultChildCardSpy
  let onAdultChildClickCloseSpy

  let changeAdultChildSpy
  let changeMaritalHistorySpy
  let changeAdultHistoryAddressSpy

  let handleRelationshipTypeToApplicantFormerSpouseSpy
  let handleRelationshipTypeToApplicantAdultChildSpy

  let maritalUpdateFields, formerSpousesDefaults

  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    setFocusStateSpy = jasmine.createSpy('setFocusState')
    getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')

    addMaritalHistoryCardSpy = jasmine.createSpy('addMaritalHistoryCard')
    onMaritalHistoryClickCloseSpy = jasmine.createSpy('onMaritalHistoryClickClose')

    addAdultChildCardSpy = jasmine.createSpy('addAdultChildCard')
    onAdultChildClickCloseSpy = jasmine.createSpy('onAdultChildClickClose')

    changeAdultChildSpy = jasmine.createSpy('changeAdultChild')
    changeMaritalHistorySpy = jasmine.createSpy('changeMaritalHistory')
    changeAdultHistoryAddressSpy = jasmine.createSpy('changeAdultHistoryAddress')

    handleRelationshipTypeToApplicantFormerSpouseSpy = jasmine.createSpy('handleRelationshipTypeToApplicantFormerSpouse')
    handleRelationshipTypeToApplicantAdultChildSpy = jasmine.createSpy('handleRelationshipTypeToApplicantAdultChild')

    maritalUpdateFields = {
      first_name: 'keith',
      middle_name: '',
      last_name: '',
      name_suffix: {
        id: 0,
        value: ''
      }
    }
    formerSpousesDefaults = Object.freeze({
      relationship_type: null,
      applicant_id: '',
      name_prefix: null,
      first_name: '',
      middle_name: '',
      last_name: '',
      name_suffix: null,
      date_of_marriage: '',
      place_of_marriage_city: '',
      place_of_marriage_state: null,
      marriage_termination_reason: null,
      date_of_marriage_end: '',
      place_of_marriage_end_city: '',
      place_of_marriage_end_state: null
    })
    applicantMaritalHistoryCardGroupComponent = shallow(
      <ApplicantMaritalHistoryCardGroup
        getFocusClassName={getFocusClassNameSpy}
        applicantsHistory={applicantsHistoryDefaults}
        setFocusState={setFocusStateSpy}
        setParentState={setParentStateSpy}
        relationshipToApplicantTypes={relationshipToApplicantTypes}
        relationshipTypes={relationshipTypes}
        suffixTypes={suffixTypes}
        prefixTypes={prefixTypes}
        nameTypes={nameTypes}
        stateTypes={stateTypes}
        marriageTerminationReasons={marriageTerminationReasons}
      />)
  })

  describe('Verify all Component fields', () => {
    it('verify default layout', () => {
      expect(applicantMaritalHistoryCardGroupComponent.findWhere(n => n.type() === 'div').length).toEqual(11)
      expect(applicantMaritalHistoryCardGroupComponent.find('#applicant_marital_history_cards').children.length).toEqual(1)
      expect(applicantMaritalHistoryCardGroupComponent.find('button').length).toEqual(2)
    })
    it('verify add another Card', () => {
      let addCardButton = applicantMaritalHistoryCardGroupComponent.find('button.btn').at(0)
      spyOn(applicantMaritalHistoryCardGroupComponent.instance(), 'addMaritalHistoryCard').and.callThrough()
      addCardButton.simulate('click', { preventDefault () {} })
      expect(applicantMaritalHistoryCardGroupComponent.instance().addMaritalHistoryCard).toHaveBeenCalledWith([formerSpousesDefaults])
    })
  })
})
