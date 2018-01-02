import React from 'react'
import SearchList from '../../../app/javascript/search/search_list'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('Render search list', function () {
  const indexValue = '0'
  const props = {
    searchResults: [
      {
        assigned_worker: 'Kari Gutierrez',
        county: 'Marin',
        district_office: 'NO. CAL SC/RES',
        fac_capacity: 7,
        fac_email_address: null,
        fac_last_visit_date: '1991-12-10',
        fac_lic_eff_date: '1992-02-22',
        fac_licensee_name: 'TERRIER PROGRAMS, INC.',
        fac_licensee_type: 'C',
        fac_mail_city: 'MODESTO',
        fac_mail_state: 'CA',
        fac_mail_street_addr: '767 GLEN EAGLES DRIVE',
        fac_mail_zip_code: '95350',
        name: "DEPUTY DOG'S GROUP HOME",
        license_number: 193600008,
        fac_orig_appl_rec_date: '1983-02-02',
        addresses: [
          {
            'id': null,
            'type': 'Residential',
            'address': {
              'id': null,
              'longitude': null,
              'lattitude': null,
              'deliverable': null,
              'street_address': '7 GREENROSE DRIVE',
              'city': 'NAPA',
              'state': 'CA',
              'zip_code': '94558',
              'zip_suffix_code': null
            }
          },
          {
            'id': null,
            'type': 'Mailing',
            'address': {
              'id': null,
              'longitude': null,
              'lattitude': null,
              'deliverable': null,
              'street_address': '7 GREENROSE DRIVE',
              'city': 'NAPA',
              'state': 'CA',
              'zip_code': '94558',
              'zip_suffix_code': null
            }
          }
        ],
        phones: [
          {
            'id': null,
            'relation': 'primary',
            'type': 'Cell',
            'number': '8317632735'
          }
        ],
        last_visit_reason: "Renewal (Fac.'s w/Expir.)",
        status: 'Licensed',
        type: 'Foster Family Home (Confidential - Do not release)'
      }
    ]
  }
  let searchListComp = new ShallowRenderer()
  let searchListRender = searchListComp.render(<SearchList {...props} />)
  let tableElement = searchListRender.props.children
  it('Create table view', function () {
    expect(searchListRender.props.className).toBe('main_table')
  })
  it('Render Table', function () {
    expect(tableElement.type).toBe('table')
  })
  it('Render Table Body for Facility List', function () {
    let tableChild = tableElement.props.children
    expect(tableChild[1].type).toBe('tbody')
  })
  it('Verify index value from table', function () {
    let tableIndex = tableElement.props.children[1].props.children[0]
    expect(tableIndex.key).toEqual(indexValue)
  })
})
