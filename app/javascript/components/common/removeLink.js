import React from 'react'
import PropTypes from 'prop-types'

const RemoveLink = (
  key,
  clickClose
) => (
  <div key={key} className='row'>
    <a onClick={clickClose} className='pull-right remove-btn'>Remove</a>
  </div>
)
RemoveLink.PropTypes = {
  key: PropTypes.string
}
RemoveLink.defaultProps = {
  key: 'default key'
}
export default RemoveLink
