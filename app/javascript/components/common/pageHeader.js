import React from 'react'
import PropTypes from 'prop-types'

const PageHeader = ({headerLabel}) => (
  <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
    <h1 className='page-header'>{headerLabel}</h1>
  </div>
)

PageHeader.propTypes = {
  headerLabel: PropTypes.string
}

PageHeader.defaultProps = {
  headerLabel: 'To implement'
}

export default PageHeader
