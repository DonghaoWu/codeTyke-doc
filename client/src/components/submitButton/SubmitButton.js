import React from 'react';

import './Styles.scss';

const SubmitButton = (props) => {
  const { loading, hasSelected } = props;
  return (
    <div className={hasSelected ? `submitButton` : `submitButton submitButton--disabled`} onClick={hasSelected ? props.handleSubmit : null} >
      <div className='submitButton__container'>
        <div className='submitButton__label'>{props.label}</div>
        {
          loading && <img className='submitButton__loader' src='assets/loadingLogo.png' alt='loading-loader' />
        }
      </div>
    </div>
  )
}

export default SubmitButton;