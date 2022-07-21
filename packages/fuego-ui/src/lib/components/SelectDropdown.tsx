import React, { useId } from 'react';
import Select from 'react-select';

const SelectDropdown = ({ label, labelClassNames, ...rest }: any) => {
  const selectIdSuffix = useId();
  return (
    <div>
      <label id={`select-label-${selectIdSuffix}`} className={labelClassNames}>
        {label}
      </label>
      <Select aria-labelledby={`select-label-${selectIdSuffix}`} {...rest} />
    </div>
  );
};

export default SelectDropdown;
