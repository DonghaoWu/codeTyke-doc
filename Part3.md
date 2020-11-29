# Part 3: Add loader

- 注意，在这一章节首先要做的是把 Button 分成两个部分处理，一个是 StartButton component， 另外一个是 SubmitButton component。

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/codeTyke-doc/blob/main/README.md)

1. Start button:

    - Create component.

    __`Location:./client/src/components/startButton/StartButton.js`__

    ```jsx
    import React from 'react';
    import './Styles.scss';

    const StartButton = (props) => {
        return (
            <div className={"startButton"} onClick={props.handleSubmit} >
            {props.label}
            </div>
        )
    }

    export default StartButton;
    ```

    - scss.

    __`Location:./client/src/components/startButton/Styles.scss`__

    ```scss
    @import '../../styles/utils/colors';

    .startButton{
        text-align: center;
        color: white;
        line-height: 50px;
        font-size: 20px;
        border-radius: 25px;
        font-weight: 600;
        background-color: $grass-blade;
        padding: 0 2em;
        cursor: pointer;
    }
    ```

    - Add component.

    __`Location:./client/src/components/intro/Intro.js`__

    ```jsx
    import React from 'react';
    import StartButton from '../startButton/StartButton';

    import './Styles.scss';

    const Intro = ({ gameStatus, setGameStatus }) => {

        return (
            <div className="introContainer">
                <div className="introContainer__logo">
                    <img alt="logo" src="assets/logo.png" />
                </div>
                <div className="introContainer__message">
                    {gameStatus.message}
                </div>
                <div className="introContainer__startButton">
                    <StartButton label="start" handleSubmit={() => setGameStatus({ loadIntro: false })} />
                </div>
            </div>
        )
    }

    export default Intro;
    ```

2. Submit button:

    - Create component.

    __`Location:./client/src/components/submitButton/SubmitButton.js`__

    ```jsx
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
    ```

    - scss.

    __`Location:./client/src/components/submitButton/Styles.scss`__

    ```scss
    @import '../../styles/utils/colors';
    @import '../../styles/utils/breakpoints';

    .submitButton{
        color: white;
        line-height: 50px;
        font-size: 20px;
        border-radius: 25px;
        font-weight: 600;
        background-color: $grass-blade;
        padding: 0 2em;
        cursor: pointer;

        &__container{
            width:6rem;
            display: flex;
            align-items: center;
            padding-left: 14%;

            @media only screen and (max-width: $mobile) {
                padding-left: 40%;
            }
        }
        
        &__loader{
            height:25px;
            margin-left:2px;
        
            animation: rotation 1s infinite linear;
        }

        @keyframes rotation {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(359deg);
            }
        }
    }
    ```

    - Add component.

    __`Location:./client/src/components/learningModule/LearningModule.js`__

    ```jsx
    // import component.

    import SubmitButton from '../submitButton/SubmitButton';

    // add state.

    const [loading, setLoading] = React.useState(false);

    // add function.

    const handleSubmit = () => {
        if (currentQuestionId < quizData.totalQuestions - 1) {
            setLoading(true);
            setTimeout(() => {
                setCurrentQuestionId(currentQuestionId + 1);
                setLoading(false);
            }, 1000)
        } else {
            setCurrentQuestionId(0);
            setGameStatus({ message: "Great Job! Play again.", loadIntro: true });
        }
    }

    // apply component.

    <SubmitButton label="Submit" handleSubmit={handleSubmit} loading={loading} />
    ```

### 备注：

1. 为 logo 和 button label 设立一个固定长度的 container 是其中一个要点，另外一个是根据 break point 为 container 设定百分比 padding。

2. 也可以使用 justify-content 设定 container 位置，但这样做之后 label 的位置有点偏左，仍需要 padding 或者 margin 稍微修改一下。

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/codeTyke-doc/blob/main/README.md)