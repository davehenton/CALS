import React from 'react'
import CompleteNameFields from './completeNameField'
import CommonAddressFields from 'components/rfa_forms/commonAddressField'
import ReferencesCard from './referencesCard'

const blankReferenceFields = Object.freeze({
  name_suffix: null,
  name_prefix: null,
  first_name: '',
  middle_name: '',
  last_name: '',
  name_type: null,
  mailing_address: {
    street_address: '',
    zip: '',
    city: '',
    state: null
  },
  phone_number: '',
  email: ''
})
const blankAddressFields = Object.freeze({
  mailing_address: {
    street_address: '',
    zip: '',
    city: '',
    state: null
  }
})
export default class ReferenceMain extends React.Component{
  constructor(props) {
    super(props)
  }
  getFocusClassName (componentName) {
    return this.props.focusComponentName === componentName ? 'edit' : 'show'
  }

  render() {
    const referenceValues = blankReferenceFields
    return (
      <div className="reference_main">
        <div>Please list the name, telephone number(s), and address of three individuals who have knowledge of your home environment, lifestyle, and
          ability to be a Resource Family. <b>*Must include 3 references</b></div>
        <div id='referenceMain' onClick={() => this.props.setFocusState('referenceMain')}
                                 className={this.getFocusClassName('referenceMain') + ' ' + 'card reference-section double-gap-top'}>
          <div className="card-header">
            <span>Reference -1</span>
          </div>
          <div className="card-body">
            <div className="row">
              <ReferencesCard
                referenceValues={referenceValues}
                stateTypes={this.props.stateTypes}
                suffixTypes={this.props.suffixTypes}
                prefixTypes={this.props.prefixTypes}
                nameTypes={this.props.nameTypes}
                setParentState={this.props.setParentState} />
            </div>
          </div>
        </div>
        <div id='referenceMain' onClick={() => this.props.setFocusState('referenceMain')}
             className={this.getFocusClassName('referenceMain') + ' ' + 'card reference-section double-gap-top'}>
          <div className="card-header">
            <span>Reference -2</span>
          </div>
          <div className="card-body">
            <div className="row">
              <ReferencesCard
                referenceValues={referenceValues}
                stateTypes={this.props.stateTypes}
                suffixTypes={this.props.suffixTypes}
                prefixTypes={this.props.prefixTypes}
                nameTypes={this.props.nameTypes}
                setParentState={this.props.setParentState} />
            </div>
          </div>
        </div>
        <div id='referenceMain' onClick={() => this.props.setFocusState('referenceMain')}
             className={this.getFocusClassName('referenceMain') + ' ' + 'card reference-section double-gap-top'}>
          <div className="card-header">
            <span>Reference -3</span>
          </div>
          <div className="card-body">
            <div className="row">
              <ReferencesCard
                referenceValues={referenceValues}
                stateTypes={this.props.stateTypes}
                suffixTypes={this.props.suffixTypes}
                prefixTypes={this.props.prefixTypes}
                nameTypes={this.props.nameTypes}
                setParentState={this.props.setParentState} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}