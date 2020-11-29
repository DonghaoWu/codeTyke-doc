import React from 'react';

import './Styles.scss';

const SelectionBox = (props) => {
  return (
    <div
      className="selectionBox"
      id={"selectionBox" + props.id}
    >
      <img className="selectionBox__image" alt={props.answer.imageAlt} src={props.answer.image} />
      <div className='selectionBox__checkboxTextContainer'>
        <input className="selectionBox__checkbox" type="checkbox" />
        <span className="selectionBox__text">{props.answer.text}</span>
      </div>
    </div>
  )
}

export default SelectionBox;
