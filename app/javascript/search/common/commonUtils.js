import React from 'react'

export const addressStringValueOrNa = (addresses) => {
  if (addresses.length > 0 && addresses[0].address) {
    return fullAddressString(addresses[0].address)
  } else {
    return 'N/A'
  }
}

export const fullAddressString = (address) => {
  return address.street_address + ',' + address.city + ',' + address.state + ' ' + address.zip_code
}

export const stringForCityStateZip = (address) => {
  return address.address.city + ',' + ' ' + address.address.state + ' ' + address.address.zip_code
}

export const phoneNumberOrNa = (phone) => {
  if (phone.length > 0) {
    return formatPhoneNumberForDashes(phone[0])
  } else {
    return 'N/A'
  }
}

export const formatPhoneNumberForDashes = (phone) => {
  return phone.number.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')
}

export const checkForNA = (object) => {
  return (object && object.value) ? object.value : 'N/A'
}

export const checkValueForNull = (value) => {
  return value == null ? 'N/A' : value
}
