import React from 'react'
import Immutable from 'immutable'
import CompleteNameFields from './completeNameField'
import CommonAddressFields from 'components/rfa_forms/commonAddressField'
import ReferencesCard from './referencesCard'
import {checkArrayObjectPresence} from 'helpers/commonHelper.jsx'

const blankReferenceFields = Object.freeze({
  name_suffix: null,
  name_prefix: null,
  first_name: '',
  middle_name: '',
  last_name: '',
  mailing_address: {
    street_address: '',
    zip: '',
    city: '',
    state: null
  },
  phone_number: '',
  email: ''
})
export default class ReferenceMain extends React.Component {
  constructor (props) {
    super(props)
    this.setReferencesState = this.setReferencesState.bind(this)
    this.getFocusClassName = this.getFocusClassName.bind(this)
  }
  getFocusClassName (componentName) {
    return this.props.focusComponentName === componentName ? 'edit' : 'show'
  }
  setReferencesState (key, value, referencesIndex) {
    let newData = Immutable.fromJS(checkArrayObjectPresence(this.props.references.references || this.props.references) ||
      [blankReferenceFields, blankReferenceFields, blankReferenceFields])
    newData = newData.update(referencesIndex, x => x.set(key, value))
    this.props.setParentState('references', newData.toJS())
  }
  render () {
    const references = checkArrayObjectPresence(this.props.references.references || this.props.references) || [blankReferenceFields, blankReferenceFields, blankReferenceFields]
    return (
      <div className="reference_main">
        <div>Please list the name, telephone number(s), and address of three individuals who have knowledge of your home environment, lifestyle, and
          ability to be a Resource Family. <b>*Must include 3 references</b></div>
        {
          references.map((referencesId, index) => {
            return (
              <div key={index} id={'referenceMain_'+ index} onClick={() => this.props.setFocusState('referenceMain_' + index)}
                   className={this.getFocusClassName('referenceMain_'+ index) + ' ' + 'card reference-section double-gap-top'}>
                <div className="card-header">
                  <span>Reference -{index+1}</span>
                </div>
                <div className="card-body">
                  <div className="row">
                    <ReferencesCard
                      index={index}
                      references={referencesId}
                      stateTypes={this.props.stateTypes}
                      suffixTypes={this.props.suffixTypes}
                      prefixTypes={this.props.prefixTypes}
                      nameTypes={this.props.nameTypes}
                      setParentState={this.setReferencesState} />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
