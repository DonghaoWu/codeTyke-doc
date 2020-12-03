# Part 5: Add Functionality to CodeTyke Multiple Choice Question.

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/codeTyke-doc/blob/main/README.md)

----------------------------------------------------------------------------------------------------

1. __`The button is disable when no answer is selected.`__

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

----------------------------------------------------------------------------------------------------

2. __`When checkbox is selected, the card background color turns blue, hasSelected equals true, submit button turns active:`__

    1. Pass selectedAnsArr, setSelectedAnsArr down to SelectBox component.

        __`Location:./client/src/components/learningModule/LearningModule.js`__

    ```jsx
    return <SelectionBox answerId={index} key={index} answer={answer} selectedAnsArr={selectedAnsArr} setSelectedAnsArr={setSelectedAnsArr} />
    ```

    2. Use `selectedAnsArr[answerId]` to control selected card background color.

        __`Location:./client/src/components/selectionBox/SelectionBox.js`__

    ```jsx
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
    ```

    - scss, when is selected, the back ground color is blue.

        __`Location:./client/src/components/selectionBox/Styles.scss`__

    ```scss
    &--active{
      background-color: #00B3FF;
    }
    ```

----------------------------------------------------------------------------------------------------

3. __`Check the answer, show result info, if the answer is correct, the label in Submit button turns to 'Next', when finish the last question, it will show 'Finish'`__

    1. Add result info state, pass state and submit button label state.

        __`Location:./client/src/components/learningModule/LearningModule.js`__

    ```js
    const [resultInfo, setResultInfo] = React.useState('');
    const [pass, setPass] = React.useState(false);
    const [submitLabel, setSubmitLabel] = React.useState('Submit');
    ```

    2. Check answer function and change the result info state.
        - new state: `pass` to control submit button label and functionality.

        __`Location:./client/src/components/learningModule/LearningModule.js`__

    ```js
    const handleSubmit = () => {
        if (pass === true) {
            setPass(false);
            setResultInfo('');
            setSubmitLabel('Submit');
            setSelectedAnsArr([false, false, false, false]);

            if (currentQuestionId === quizData.totalQuestions - 1) {
                setCurrentQuestionId(0);
                setGameStatus({ message: "Great Job! Play again.", loadIntro: true });
            }
            else {
                setCurrentQuestionId(currentQuestionId + 1);
            }
        }

        else if (pass === false) {
            setSubmitLoading(true);
            setTimeout(() => {
                let selectedCorrectAnswerNum = 0;
                let selectedWrongAnswer = false;

                for (let i = 0; i < currentQuestion.possibleAnswers.length; i++) {
                    if (currentQuestion.possibleAnswers[i].isCorrect === selectedAnsArr[i]) selectedCorrectAnswerNum++;
                    if (currentQuestion.possibleAnswers[i].isCorrect === false && selectedAnsArr[i] === true) {
                        selectedWrongAnswer = true;
                        break;
                    }
                }

                if (selectedWrongAnswer) {
                    setResultInfo('Try again.');
                    setPass(false);
                }
                else if (selectedCorrectAnswerNum !== currentQuestion.possibleAnswers.length) {
                    setResultInfo('Not all.');
                    setPass(false);
                }
                else if (selectedCorrectAnswerNum === currentQuestion.possibleAnswers.length) {
                    setPass(true);
                    setResultInfo('Correct!');
                    if (currentQuestionId === quizData.totalQuestions - 1) setSubmitLabel('Finish!');
                    else setSubmitLabel('Next');
                }
                setSubmitLoading(false);
            }, 500)
        }
    }
    ```

    3. Show the result info.

    - Create component.

        __`Location:./client/src/components/resultInfo/ResultInfo.js`__

    ```js
    import React from 'react';
    import './Styles.scss';

    const ResultInfo = (props) => {
        const { resultInfo } = props;
        let color = '';
        if (resultInfo === 'Try again.') color = 'red';
        if (resultInfo === 'Not all.') color = 'orange';
        if (resultInfo === 'Correct!') color = 'green';
        return (
            <div className={`resultInfo resultInfo--${color}`}>
                {resultInfo}
            </div>
        )
    }

    export default ResultInfo;
    ```

    - ResultInfo styling.

        __`Location:./client/src/components/resultInfo/Styles.js`__

    ```scss
    @import '../../styles/utils/breakpoints';

    .resultInfo {
        margin-right: 10%;
        font-size: 30px;
        font-weight: bold;

        &--green{
            color: #30CC71;
        }

        &--orange{
            color:#FCA51E;
        }

        &--red{
            color:#FE8A95;
        }

        @media only screen and (max-width: $mobile) {
            margin-right: 0;
        }
    }
    ```

    - Add ResultInfo into LearningModule component.

        __`Location:./client/src/components/learningModule/LearningModule.js`__

    ```js
    import ResultInfo from '../resultInfo/ResultInfo';

    <div className="learningModule__submitButtonContainer">
        <ResultInfo resultInfo={resultInfo} />
        <SubmitButton label={submitLabel} handleSubmit={handleSubmit} submitLoading={submitLoading} hasSelected={hasSelected} />
    </div>
    ```

    - Adjust the submitButtonContainer styling.

        __`Location:./client/src/components/learningModule/Styles.scss`__

    ```scss
    &__submitButtonContainer {
        display:flex;
        justify-content: flex-end;
        align-items: center;

        width:95%;
        height: 50px;

        .submitButton {
            float: right;
        }

        @media only screen and (max-width: $tablet) {
            width:85%;
        }

        @media only screen and (max-width: $mobile) {
            width:88%;
            display: block;
            text-align: center;
            .submitButton {
                float: none;
            }
        }
    }
    ```

----------------------------------------------------------------------------------------------------

4. __`Handle card background color response and reselection.`__

    1. Add mode state.

        __`Location:./client/src/components/learningModule/LearningModule.js`__

    ```js
    const [mode, setMode] = React.useState('normal');
    ```

    2. Pass mode and setMode to SelectionBox component.

    ```jsx
    <SelectionBox
        answerId={index}
        key={index}
        answer={answer}
        selectedAnsArr={selectedAnsArr}
        setSelectedAnsArr={setSelectedAnsArr}
        mode={mode}
        setMode={setMode} 
    />
    ```

    3. Set differnet mode after check the answer.

        __`Location:./client/src/components/learningModule/LearningModule.js`__

    ```jsx
    const handleSubmit = () => {
        if (pass === true) {
            setPass(false);
            setResultInfo('');
            setSubmitLabel('Submit');
            setMode('normal');
            setSelectedAnsArr([false, false, false, false]);

            if (currentQuestionId === quizData.totalQuestions - 1) {
                setCurrentQuestionId(0);
                setGameStatus({ message: "Great Job! Play again.", loadIntro: true });
            }
            else {
                setCurrentQuestionId(currentQuestionId + 1);
            }
        }

        else if (pass === false) {
            setSubmitLoading(true);
            setTimeout(() => {
                let selectedCorrectAnswerNum = 0;
                let selectedWrongAnswer = false;

                for (let i = 0; i < currentQuestion.possibleAnswers.length; i++) {
                    if (currentQuestion.possibleAnswers[i].isCorrect === selectedAnsArr[i]) selectedCorrectAnswerNum++;
                    if (currentQuestion.possibleAnswers[i].isCorrect === false && selectedAnsArr[i] === true) {
                        selectedWrongAnswer = true;
                        break;
                    }
                }

                if (selectedWrongAnswer) {
                    setMode('tryAgain');
                    setPass(false);
                    setResultInfo('Try again.');
                }
                else if (selectedCorrectAnswerNum !== currentQuestion.possibleAnswers.length) {
                    setMode('notAll');
                    setResultInfo('Not all.');
                    setPass(false);
                }
                else if (selectedCorrectAnswerNum === currentQuestion.possibleAnswers.length) {
                    setMode('correct');
                    setPass(true);
                    setResultInfo('Correct!');
                    if (currentQuestionId === quizData.totalQuestions - 1) setSubmitLabel('Finish');
                    else setSubmitLabel('Next');
                }
                
                setSubmitLoading(false);
            }, 500)
        }
    }
    ```

    4. Process the mode props in SelectionBox.

        __`Location:./client/src/components/selectionBox/SelectionBox.js`__

    ```jsx
    import React from 'react';

    import './Styles.scss';

    const SelectionBox = (props) => {
    const { selectedAnsArr, setSelectedAnsArr, answerId, mode, setMode } = props;
    const isChecked = selectedAnsArr[answerId];
    const activeMode = isChecked ? `selectionBox--${mode}` : '';

    const handleSelect = () => {
        let newSelectedAnsArr = [];
        if (mode !== 'normal') {
            setMode('normal');
            newSelectedAnsArr = [false, false, false, false];
            newSelectedAnsArr[answerId] = true;
        }
        else {
            newSelectedAnsArr = selectedAnsArr.slice();
            newSelectedAnsArr[answerId] = !isChecked;
        }
        setSelectedAnsArr(newSelectedAnsArr);
    }

        return (
            <div className={`selectionBox ${activeMode}`}>
                <img className="selectionBox__image" alt={props.answer.imageAlt} src={props.answer.image} />
                <div className='selectionBox__checkboxTextContainer'>
                    <input className={`selectionBox__checkbox`} type="checkbox" checked={isChecked} onChange={handleSelect} />
                    <span className="selectionBox__text">{props.answer.text}</span>
                </div>
            </div>
        )
    }

    export default SelectionBox;
    ```

    5. Add related styling.

        __`Location:./client/src/components/selectionBox/Styles.scss`__

    ```scss
    &--normal{
      background-color: #00B3FF;
    }

    &--tryAgain{
      background-color: #FE8A95;
    }

    &--notAll{
      background-color: #FCA51E;
    }

    &--correct{
      background-color: #30CC71;
    }
    ```

### 备注：

1. 改名：

    ```diff
    + const [submitLoading, setSubmitLoading] = React.useState(false);

    + const [selectedAnsArr, setSelectedAnsArr] = React.useState([false, false, false, false]);
    ```

2. 在本章中，有两个文件在整个过程中会有多处修改，这两个是：__`LearningModule.js`__ 和 __`SelectionBox.js`__,实际操作时要多看有没有遗漏的地方，本章也是整个部分最复杂的一节，可以多参考和改善。

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/codeTyke-doc/blob/main/README.md)