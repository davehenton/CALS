import React from 'react'
import PropTypes from 'prop-types'
import {urlPrefixHelper} from 'helpers/url_prefix_helper.js.erb'
import CardLayout from 'components/common/CardLayout'

export default class Lic198BOverview extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <CardLayout
        idClassName='lic_198b_overview'
        id='Lic198BOverview'
        label='Lic198B Section Summary'
        handleOnClick={() => this.props.setFocusState('Lic198BOverview')}
        focusClassName={this.props.getFocusClassName('Lic198BOverview') + ' ' + 'card phone-section double-gap-top'}>
        <span>default Lic198B </span>
      </CardLayout>

    )
  }
}

Lic198BOverview.propTypes = {
  applicationId: PropTypes.string,
  setFocusState: PropTypes.func,
  getFocusClassName: PropTypes.func
}
