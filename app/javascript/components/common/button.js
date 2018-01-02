import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  buttonId,
  onClick,
  label,
  textAlignment
}) => (
  <div className={'text-' + textAlignment}>
    <button className='btn'
      id={buttonId}
      onClick={onClick}>
      {label}
    </button>
  </div>
)

Button.propTypes = {
  buttonId: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
  textAlignment: PropTypes.string
}

Button.defaultProps = {
  textAlignment: 'center'
}
export default Button
