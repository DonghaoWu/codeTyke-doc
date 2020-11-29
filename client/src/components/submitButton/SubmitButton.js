import React from 'react';

import './Styles.scss';

const SubmitButton = (props) => {
  return (
    <div>
      <div className='submitButton' onClick={props.handleSubmit} >
        <div className='submitButton__container'>
          <div className='submitButton__label'>{props.label}</div>
          {
            props.loading && <img className='submitButton__loader' src='assets/loadingLogo.png' alt='loading-loader' />
          }
        </div>
      </div>
    </div>
  )
}

export default SubmitButton;