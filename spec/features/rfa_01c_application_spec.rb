require 'rails_helper'
require 'vcr'
require 'faker'

RSpec.feature 'RFA01C', js: true do

  scenario 'validate rfa01c', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    fill_in('first_name', with: first_name, :match => :prefer_exact)
    fill_in('middle_name', with: 'k', :match => :prefer_exact)
    fill_in('last_name', with: last_name, :match => :prefer_exact)
    find('#child_identifiedYes').click
    find('#child_in_homeYes').click
    click_button('Save Progress')

    packet_url = current_url.gsub('/edit', '') + '/packet'
    visit current_url
    visit packet_url

    page.find('#Rfa01COverview').find('a.btn.btn-default').click
    fill_in('first_name', with: first_name, :match => :prefer_exact)
    fill_in('middle_name', with: 'k', :match => :prefer_exact)
    fill_in('last_name', with: last_name, :match => :prefer_exact)
    fill_in('street_address', with: 'address here', :match => :prefer_exact)
    fill_in('desiredChildCarddate_of_birth', with: '01/01/2000', :match => :prefer_exact)
    find(:select, 'name_suffix').first(:option, 'Sr').select_option
    find(:select, 'grade').first(:option, 'TK').select_option
    find(:select, 'state_type').first(:option, 'Alaska').select_option
    fill_in('Zip', with: '12345', :match => :prefer_exact)
    find(:select, 'gender').first(:option, 'Male').select_option
    fill_in('name_of_school', with: 'School name', :match => :prefer_exact)
    click_button('Save Progress')
    visit page.driver.current_url
    expect(find_field('gender').value).to eq '1'
    expect(find_field('name_of_school').value).to eq 'School name'
    expect(find_field('Zip').value).to eq '12345'
    expect(find_field('grade').value).to eq '1'
    expect(find_field('name_suffix').value).to eq '6'
    expect(find_field('street_address').value).to eq 'address here'
    expect(find_field('desiredChildCarddate_of_birth').value).to eq '01/01/2000'
  end
end
