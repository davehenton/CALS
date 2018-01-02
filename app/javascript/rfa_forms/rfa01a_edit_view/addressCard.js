import React from 'react'
import Immutable from 'immutable'
import {InputComponent} from 'components/common/inputFields'
import {DropDownField} from 'components/common/dropDownField'
import YesNoRadioComponent from 'components/common/yesNoFields'
import {yesNo} from 'constants/constants'
import {getDictionaryId, dictionaryNilSelect, dictionaryNilSelectValue, findArrayValueByMethod} from 'helpers/commonHelper.jsx'
import AddressComponent from 'components/rfa_forms/addressComponent.js'

import {fetchRequest} from 'helpers/http'

const blankPhysicalAddress = Object.freeze({
  street_address: '',
  zip: '',
  city: '',
  state: null,
  type: {
    id: '1',
    value: 'Residential'
  }
})
const blankMailingAddress = Object.freeze({
  street_address: '',
  zip: '',
  city: '',
  state: null,
  type: {
    id: '3',
    value: 'Mailing'
  }
})

const physicalAddressType = 'Residential'
const mailingAddressType = 'Mailing'

export default class AddressCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      suggestions: []
    }
    this.checkAddressType = this.checkAddressType.bind(this)
  }
  checkAddressType (addressType) {
    const blankAddressFields = (addressType === physicalAddressType) ? blankPhysicalAddress : blankMailingAddress
    let data = Immutable.fromJS(this.props.addresses || [blankAddressFields])
    let indexValue = data.findIndex(x => x.get('type').get('value') === addressType)
    if (indexValue === -1) {
      data = data.push(Immutable.fromJS(blankAddressFields))
      indexValue = data.size - 1
    }
    return {
      data: data,
      index: indexValue,
      blankAddressFields: blankAddressFields}
  }
  onAddressChange (typeString, key, value) {
    let addressData = this.checkAddressType(typeString)
    let data = addressData.data
    data = data.update(addressData.index, x => x.set(key, value))
    this.props.setParentState('addresses', data.toJS())
  }
  onSelection (autoFillData, typeString) {
    let addressData = this.checkAddressType(typeString)
    autoFillData.type = addressData.blankAddressFields.type
    let data = addressData.data
    data = data.update(addressData.index, x => autoFillData)
    this.props.setParentState('addresses', data.toJS())
  }

  render () {
    const hasPhysicalAddressFields = this.props.addresses !== undefined && this.props.addresses.find(o => o.type.value === physicalAddressType)
    const physicalAddressFields = hasPhysicalAddressFields ? this.props.addresses.find(o => o.type.value === physicalAddressType) : blankPhysicalAddress
    const hasMailingAddressFields = this.props.addresses !== undefined && this.props.addresses.find(o => o.type.value === mailingAddressType)
    const mailingAddressFields = hasMailingAddressFields ? this.props.addresses.find(o => o.type.value === mailingAddressType) : blankMailingAddress
    const mailingAddress = this.props.physicalMailingSimilar !== undefined ? this.props.physicalMailingSimilar : ''
    const hiddenMailingSameAsPhysical = mailingAddress.toString() === 'false' ? 'show' : 'hidden'
    return (
      <div className='card-body'>
        <div className='row'>
          <form>
            <AddressComponent
              stateTypes={this.props.stateTypes}
              addressTitle='Physical Address'
              id='street_address'
              addressType={physicalAddressType}
              addressFields={physicalAddressFields}
              onSelection={(autoFillData) => this.onSelection(autoFillData, physicalAddressType)}
              onChange={(fieldId, event) => this.onAddressChange(physicalAddressType, fieldId, event)}
            />
            <div>
              <YesNoRadioComponent
                label='Mailing address the same as Physical Address?'
                idPrefix='mailing_similar'
                value={mailingAddress}
                onFieldChange={(event) => this.props.setParentState('physical_mailing_similar', event.target.value)} />
            </div>
            <div className={hiddenMailingSameAsPhysical}>
              <AddressComponent
                stateTypes={this.props.stateTypes}
                addressTitle='Mailing Address'
                id='street_address'
                addressType={mailingAddressType}
                addressFields={mailingAddressFields}
                onSelection={(autoFillData) => this.onSelection(autoFillData, mailingAddressType)}
                onChange={(fieldId, event) => this.onAddressChange(mailingAddressType, fieldId, event)}
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
