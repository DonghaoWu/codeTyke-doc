import React, { useEffect } from 'react';

import './Styles.scss';

const SelectionBox = (props) => {
  const { selectedAnsArr, setSelectedAnsArr, answerId } = props;
  const isChecked = selectedAnsArr[answerId];
  const active = isChecked ? "selectionBox--active" : '';

  const handleSelect = () => {
    let newSelectedAnsArr = selectedAnsArr.slice();
    newSelectedAnsArr[answerId] = !isChecked;
    setSelectedAnsArr(newSelectedAnsArr);
  }

  return (
    <div className={`selectionBox ${active}`}>
      <img className="selectionBox__image" alt={props.answer.imageAlt} src={props.answer.image} />
      <div className='selectionBox__checkboxTextContainer'>
        <input className={`selectionBox__checkbox`} type="checkbox" checked={isChecked} onChange={handleSelect} />
        <span className="selectionBox__text">{props.answer.text}</span>
      </div>
    </div>
  )
}

export default SelectionBox;