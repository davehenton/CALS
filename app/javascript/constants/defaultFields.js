export const disclosureDefaults = Object.freeze({
  'offense': '',
  'offense_city': '',
  'offense_date': '',
  'when_offense_happen': '',
  'offense_details': ''
})
export const addressDefaults = Object.freeze({
  street_address: '',
  zip: '',
  city: '',
  state: null,
  type: null
})

export const phoneDefaults = Object.freeze({
  relation: '',
  type: '',
  number: ''
})

export const facilityDataDefaults = Object.freeze({
  addresses: [addressDefaults],
  phones: [phoneDefaults]
})

export const blankIdentifiedChild = Object.freeze({
  first_name: '',
  middle_name: '',
  last_name: '',
  name_suffix: null,
  child_in_home: '',
  date_of_birth: '',
  gender: null,
  county_of_jurisdiction: null,
  date_of_placement: '',
  relationship_to_applicants: null,
  // relationship_to_applicants: [
  //   {
  //     applicant_id: '',
  //     relationship_to_applicant: null
  //   }
  // ],
  school_grade: null,
  school_name: '',
  school_address: {
    street_address: '',
    zip: '',
    city: '',
    state: null,
    type: {
      value: 'Mailing',
      id: 3
    }
  }
})
