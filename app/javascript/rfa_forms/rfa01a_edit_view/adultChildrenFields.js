import React from 'react'
import {InputComponent} from 'components/common/inputFields'
import {DropDownField} from 'components/common/dropDownField'
import {DateField} from 'components/common/dateFields'
import CompleteNameFields from './completeNameField.jsx'
import YesNoRadioComponent from 'components/common/yesNoFields'
import {yesNo} from 'constants/constants'
import {getDictionaryId, dictionaryNilSelect, FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'
import {handleRelationshipTypeToApplicant, setToWhomOptionList, handleToWhomValue} from 'helpers/cardsHelper.jsx'
import AddressComponent from 'components/rfa_forms/addressComponent.js'

export default class AdultChildrenFields extends React.Component {
  render () {
    const adultChild = this.props.adultChild
    const livesInHome = adultChild.lives_in_home === 'true'

    return (
      <form>
        <DropDownField
          gridClassName='col-md-4'
          id={this.props.idPrefix + 'relationship_type'}
          selectClassName='reusable-select'
          optionList={this.props.relationshipToApplicantTypes}
          label='Relationship Type'
          value={getDictionaryId(adultChild.relationship_to_applicants[0].relationship_to_applicant)}
          onChange={(event) => this.props.handleRelationshipTypeToApplicant(this.props.index,
            dictionaryNilSelect(event.target.options), 'relationship_to_applicant')} />
        <DropDownField
          gridClassName='col-md-4'
          selectClassName='reusable-select'
          label='To Whom'
          id={this.props.idPrefix + 'available_applicants'}
          optionList={setToWhomOptionList(this.props.applicants)}
          value={handleToWhomValue(adultChild.relationship_to_applicants[0].applicant_id, this.props.applicants).id}
          onChange={(event) => this.props.handleRelationshipTypeToApplicant(this.props.index,
            event.target.value, 'applicant_id')} />
        <div className='row '>
          <div className='col-md-12'>
            <CompleteNameFields
              index={this.props.index}
              namePrefixId='name_prefix'
              nameSuffixId='name_suffix'
              firstNameId='first_name'
              middleNameId='middle_name'
              lastNameId='last_name'
              firstName={adultChild.first_name}
              middleName={adultChild.middle_name}
              lastName={adultChild.last_name}
              nameSuffix={adultChild.name_suffix}
              namePrefix={adultChild.name_prefix}
              onChange={this.props.changeAdultChild}
              suffixTypes={this.props.suffixTypes}
              prefixTypes={this.props.prefixTypes} />
          </div>
        </div>
        <YesNoRadioComponent
          label='Lives in home?'
          idPrefix={this.props.idPrefix + 'lives_in_home'}
          value={adultChild.lives_in_home}
          onFieldChange={(event) => this.props.changeAdultChild('lives_in_home', event.target.value, this.props.index)} />

        { livesInHome ? (<div />)
          : (<div>
            <AddressComponent
              index={this.props.index}
              stateTypes={this.props.stateTypes}
              addressTitle='Physical Address'
              id="street_address"
              addressFields={adultChild.address}
              onSelection={(autofillData) => this.props.changeAdultChild('address', autofillData, this.props.index)}
              onChange={(fieldId, event) => this.props.changeAdultHistoryAddress(fieldId, event, this.props.index)}
            />
          </div>)
        }
      </form>
    )
  }
}
