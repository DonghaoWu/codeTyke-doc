# Part 5: Add Functionality to CodeTyke Multiple Choice Question.

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/codeTyke-doc/blob/main/README.md)

1. The button is disable when no answer is selected.

    1. Get a new props from LearningModule component to control div class and onClick function.

    __`Location:./client/src/components/submitButton/SubmitButton.js`__

    ```js
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
    ```

    2. Edit submitButton styling.

    __`Location:./client/src/components/submitButton/Styles.scss`__

    ```css
    &--disabled{
        background-color: rgb(187, 184, 184);
    }
    ```

    3. Set hasSelected in LearningModule component and pass it down to SubmitButton component.

    __`Location:./client/src/components/learningModule/LearningModule.js`__

    ```js
    const [selectedAnsArr, setAnswerArr] = React.useState([false, false, false, false]);
    let hasSelected = selectedAnsArr.includes(true);

    //...

    <SubmitButton label="Submit" handleSubmit={handleSubmit} loading={loading} hasSelected={hasSelected} />
    ```

2. When checkbox is selected, the card background color turns blue, hasSelected equals true, submit button turns active:

    - Create component.

    __`Location:./client/src/components/infoModal/InfoModal.js`__

    ```jsx

    ```

    - scss.

    __`Location:./client/src/components/infoModal/Styles.scss`__

    ```scss

    ```

3. Check the answer, show result info and card background color response.

    __`Location:./client/src/components/learningModule/LearningModule.js`__

    ```js

    ```

    - scss

    __`Location:./client/src/components/learningModule/Styles.scss`__

    ```scss

    ```

4. If the answer is correct, the label in Submit button turns to 'Next', when finish the last question, it will show 'Finish'

### 备注：

1. 

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/codeTyke-doc/blob/main/README.md)