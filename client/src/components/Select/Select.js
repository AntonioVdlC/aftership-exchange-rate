import React from 'react';

import './Select.css';

const Select = ({ label, elements, selected, onSelect }) => (
  <label className="select-wrapper">
    <span className="select-label">{label}</span>
    {elements && elements.length ? (
      <select
        className="select"
        onChange={e => onSelect(e.target.value)}
        value={selected}
      >
        <option className="select-option" value="" />
        {elements.map(el => (
          <option className="select-option" key={el.symbol} value={el.symbol}>
            {el.name}
          </option>
        ))}
      </select>
    ) : (
      <span className="select-empty">No elements to select.</span>
    )}
  </label>
);

export default Select;
