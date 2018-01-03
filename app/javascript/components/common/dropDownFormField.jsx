import React from 'react'
import PropTypes from 'prop-types'
import FormField from 'components/common/formField'

const DropDownFormField = ({
  gridClassName,
  id,
  value,
  disable,
  disableNullVal,
  selectClassName,
  optionList,
  onChange,
  label,
  labelClassName,
  onBlur,
  required,
  errors
}) => (
  <FormField id={id} label={label} labelClassName={labelClassName} gridClassName={gridClassName}
    errors={errors} required={required}
  >
    <select value={value} id={id} disabled={disable} onChange={onChange} onBlur={onBlur} className={selectClassName}>
      {!disable}
      { !disableNullVal && <option key='' value='' />}
      {
        optionList.map((item, index) => {
          return (
            <option key={index} value={item.id}>{item.value}</option>
          )
        })
      }
    </select>
  </FormField>
)
DropDownFormField.propTypes = {
  value: PropTypes.string
}
export {DropDownFormField}
