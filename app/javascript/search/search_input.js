import React from 'react'
import InputDataBlock from './common/inputDataBlock.js'
import {dictionaryNilSelectValue} from 'helpers/commonHelper.jsx'

export default class SearchInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchId: {
        countyValue: '',
        facilityTypeValue: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value, event) {
    let selectedValue = dictionaryNilSelectValue(event.target.options)
    let newSearchId = this.state.searchId
    newSearchId[value] = selectedValue
    this.setState({
      searchId: newSearchId
    })
  }

  sendSearchInput (event) {
    event.preventDefault()
    const finalQuery = (this.state.searchId.countyValue + ',' + this.state.searchId.facilityTypeValue + ',' + this.refs.facilityId.value + ',' + this.refs.facilityName.value + ',' + this.refs.facilityAddress.value)
    this.props.sendSearchInput(finalQuery)
  }
  render () {
    const facilityTypes = this.props.facilityTypes
    const countyList = this.props.countyList
    const countyId = this.state.countyId
    const facilityIterate = facilityTypes.map((facilityType) =>
      <option key={facilityType.id} id={facilityType.id} value={facilityType.value}>{facilityType.value}</option>
    )
    const countyIterate = countyList.map((county) =>
      <option key={county.id} id={county.id} value={county.value}>{county.value}</option>
    )
    return (
      <div className='search_input col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        <form onSubmit={this.sendSearchInput.bind(this)}>
          <div className='field_input col-xs-12 col-sm-11 col-md-11 col-lg-11'>
            <div className='input_data col-xs-12 col-sm-2 col-md-2 col-lg-2'>
              <div>
                <span>County</span>
              </div>
              <div>
                <select className='searchSelect' id='county_select' ref={this.state.county} value={this.state.county} onChange={(event) => this.handleChange('countyValue', event)}>
                  <option value=' ' />
                  {countyIterate}
                </select>
                {/* <span className='glyphicon glyphicon-triangle-bottom' /> */}
              </div>
            </div>
            <div className='input_data col-xs-12 col-sm-2 col-md-2 col-lg-2'>
              <div>
                <span>Facility Type</span>
              </div>
              <div>
                <select className='searchSelect' id='facility_select' ref={this.state.facility} value={this.state.facility} onChange={(event) => this.handleChange('facilityTypeValue', event)}>
                  <option value='' />
                  {facilityIterate}
                </select>
                {/* <span className='glyphicon glyphicon-triangle-bottom' /> */}
              </div>
            </div>
            <InputDataBlock
              title={'Facility ID #'}
              columnWidth={2}>
              <input ref='facilityId' type='number' className='form-control type_number' placeholder='Enter Facility ID #'/>
            </InputDataBlock>
            <InputDataBlock
              title={'Facility Name'}
              columnWidth={3}>
              <input ref='facilityName' type='text' className='form-control' placeholder='Enter Facility Name'/>
            </InputDataBlock>
            <InputDataBlock
              title={'Facility Address'}
              columnWidth={3}>
              <input ref='facilityAddress' type='text' className='form-control' placeholder='Enter Facility Address'/>
            </InputDataBlock>
          </div>
          <div className='field_search col-xs-12 col-sm-1 col-md-1 col-lg-1'>
            <div className='search_block'>
              <button id='search' type='submit' className= 'btn btn-primary'>Search</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
