import React from 'react'

const InnerBlockAddressTitles = ({
  classNameTitle,
  title,
  streetApt,
  cityCountry
}) => {
  return (
    <div className={'small_inner_block' + ' ' + classNameTitle}>
      <p>{title}</p>
      <p>{streetApt}</p>
      <p>{cityCountry}</p>
    </div>

  )
}

export {InnerBlockAddressTitles}
