## Part 2: Add progress bar 

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/codeTyke-doc/blob/main/README.md)

1. Html part:

    - Add component.
    __`Location:./client/src/components/learningModule/LearningModule.js`__

    ```jsx
    import ProgressBar from '../progressBar/ProgressBar';

    //...

    <ProgressBar totalQuestions={quizData.totalQuestions} id={currentQuestion.id} />
    ```

    - Create component.
    __`Location:./client/src/components/progressBar/ProgressBar.js`__

    ```jsx
    import React from 'react';

    import './Styles.scss';

    const ProgressBar = ({ id, totalQuestions }) => {

        return (
            <div className="progressBar">
                <div className="progressBar--fill" style={{ width: (id + 1) / (totalQuestions) * 100 + "%" }} />
                <div className="progressBar__background"></div>
            </div>
        )
    }

    export default ProgressBar;
    ```

2. Css part:

    ```css
    @import '../../styles/utils/colors';

    .progressBar {
        width: 90%;
        height: 20px;
        position: relative;
        margin: 0 auto;
        align-items: center;
        display: flex;

        &__background {
            height: 2px;
            width: 99.5%;
            background: $elephant-paw;
            align-items: center;
            display: flex;

            &::after {
                content: '';
                width: 12px;
                height: 12px;
                border-radius: 6px;
                background: $elephant-paw;
                right: 0.5%;
                position: absolute;
            }
        }
        
        &--fill {
            transition: width ease .5s;
            height: 100%;
            background: $barney;
            border-radius: 20px;
            position: absolute;
            left: 0;
        }
    }
    ```
