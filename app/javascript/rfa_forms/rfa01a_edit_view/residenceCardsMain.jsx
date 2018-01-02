import React from 'react'
import Immutable from 'immutable'
import AddressCard from './addressCard'
import AboutThisResidenceCard from './aboutThisResidenceCard.jsx'
import PropTypes from 'prop-types'

const blankResidenceFields = Object.freeze({
  residence_ownership: '',
  physical_mailing_similar: '',
  weapon_in_home: '',
  body_of_water_exist: '',
  body_of_water_description: '',
  others_using_residence_as_mailing: '',
  directions_to_home: '',
  home_languages: []
})

export default class ResidenceCards extends React.Component {
  constructor (props) {
    super(props)
    this.setResidenceState = this.setResidenceState.bind(this)
    this.getFocusClassName = this.getFocusClassName.bind(this)
  }

  getFocusClassName (componentName) {
    return this.props.focusComponentName === componentName ? 'edit' : 'show'
  }

  setResidenceState (key, value) {
    let newData = Immutable.fromJS(this.props.residence || blankResidenceFields)
    newData = newData.set(key, value)
    this.props.setParentState('residence', newData.toJS())
  }

  render () {
    let residenceData = this.props.residence
    return (
      <div className='residence_cards'>
        <div id='residentAddress' onClick={() => this.props.setFocusState('residentAddress')}
          className={this.getFocusClassName('residentAddress') + ' ' + 'card resident-section double-gap-top'}>
          <div className='card-header'>
            <span> Address</span>
          </div>
          <AddressCard
            stateTypes={this.props.stateTypes}
            addresses={residenceData.addresses}
            physicalMailingSimilar={residenceData.physical_mailing_similar}
            setParentState={this.setResidenceState}
          />

        </div>
        <div id='aboutResidence' onClick={() => this.props.setFocusState('aboutResidence')}
          className={this.getFocusClassName('aboutResidence') + ' ' + 'card about-resident-section double-gap-top'}>
          <div className='card-header'>
            <span>About This Residence</span>
          </div>
          <AboutThisResidenceCard
            residenceTypes={this.props.residenceTypes}
            languageTypes={this.props.languageTypes}
            aboutResidence={residenceData}
            setParentState={this.setResidenceState}
          />
        </div>
      </div>
    )
  }
}

ResidenceCards.propTypes = {
  residence: PropTypes.object.isRequired
}

ResidenceCards.defaultProps = {
  residence: blankResidenceFields
}
