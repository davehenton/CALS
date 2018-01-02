import React from 'react'
import PropTypes from 'prop-types'
import {SmallInnerBlockDetails} from './smallInnerBlockDetails.js'
import {InnerBlockAddressTitles} from './innerBlockAddressTitles.js'
import {checkForNA, checkValueForNull, stringForCityStateZip, formatPhoneNumberForDashes} from '../search/common/commonUtils'
import {facilityDataDefaults} from 'constants/defaultFields'

export default class FacilityAddress extends React.Component {
  render () {
    let result = this.props.facilityData
    return (
      <div className='facility-address col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        <div className='facility-address-block col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <div className='facility-address-details col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <InnerBlockAddressTitles
                classNameTitle=''
                title='PHYSICAL ADDRESS'
                streetApt={result.addresses[0].address.street_address}
                cityCountry={stringForCityStateZip(result.addresses[0])} />
              <SmallInnerBlockDetails
                classNameTitle=''
                title='COUNTY NAME'
                value={result.county.value} />
              <div>
                <SmallInnerBlockDetails
                  classNameTitle={'phone_primary'}
                  title={'PRIMARY PHONE'}
                  value={formatPhoneNumberForDashes(result.phones[0])} />
                <SmallInnerBlockDetails
                  classNameTitle='phone_alt'
                  title='ALTERNATIVE PHONE'
                  value='N/A' />
              </div>
            </div>
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <InnerBlockAddressTitles
                classNameTitle={'postal_address'}
                title='POSTAL ADDRESS'
                streetApt={result.addresses[1].address.street_address}
                cityCountry={stringForCityStateZip(result.addresses[1])} />
            </div>
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <SmallInnerBlockDetails
                classNameTitle={'last_visit'}
                title='LAST VISIT DATE'
                value={checkValueForNull(result.last_visit_date)} />
              <SmallInnerBlockDetails
                classNameTitle={'visit_reason'}
                title='LAST VISIT REASON'
                value={checkForNA(result.last_visit_reason)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FacilityAddress.propTypes = {
  facilityData: PropTypes.object.isRequired
}

FacilityAddress.defaultProps = {
  facilityData: facilityDataDefaults
}
