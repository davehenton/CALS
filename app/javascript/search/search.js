import React from 'react'
import SearchGrid from './search_grid'
import SearchInput from './search_input'
import SearchList from './search_list'
import SearchNotFound from './search_notfount'
import SearchDetails from './search_Data'
import {fetchRequest} from '../helpers/http'
import {urlPrefixHelper} from '../helpers/url_prefix_helper.js.erb'

export default class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      landingPageUrl: props.landingUrl,
      isToggled: true,
      inputData: ' ',
      searchData: undefined
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.getCsrfToken = this.getCsrfToken.bind(this)
    this.addressQuery = this.addressQuery.bind(this)
  }

  addressQuery (query) {
    var addQuery = []
    for (var i = 4; i >= 4 && i < query.length; i++) {
      addQuery.push(query[i])
    }
    return addQuery
  }

  getCsrfToken (value) {
    var metas = document.getElementsByTagName('meta')
    return metas[value] ? metas[value].content : ''
  }

  handleToggle () {
    this.setState({isToggled: !this.state.isToggled})
  }

  addSearchInput (DataSearch) {
    var query = DataSearch.split(',')
    var addressData = this.addressQuery(query)

    var params = {
      'county.value': [query[0]],
      'type.value': [query[1]],
      id: [query[2]],
      name: [query[3]],
      'addresses.address.street_address': addressData
    }

    this.state.inputData = DataSearch

    // call http request function with arguments
    let url = '/facilities/search'
    fetchRequest(url, 'POST', params).then(
      response => response.json())
      .then((response) => {
        return this.setState({
          searchData: response
        })
      })
      .catch(error => {
        console.log(error)
        return this.setState({
          searchData: []
        })
      })
  }

  render () {
    const initialLoad = this.state.searchData === undefined
    const searchResponseHasValues = this.state.searchData && this.state.searchData.length > 0

    return (
      <div className='search_page'>
        <div className='search-section col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <SearchInput
            sendSearchInput={this.addSearchInput.bind(this)}
            countyList={this.props.countyTypes}
            facilityTypes={this.props.facilityTypes}
          />
        </div>
        {searchResponseHasValues && <SearchDetails sendSearchInput={this.addSearchInput.bind(this)} {...this} />}
        <div className='result-section col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          {this.state.isToggled && <SearchGrid searchResults={this.state.searchData} />}
          {!this.state.isToggled && <SearchList searchResults={this.state.searchData} />}
          {(!searchResponseHasValues && !initialLoad) && <SearchNotFound />}
        </div>
      </div>
    )
  }
}
