# Part 4: Add Modal

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/codeTyke-doc/blob/main/README.md)

- #### Documentation: [React portals](https://reactjs.org/docs/portals.html#usage)

- Display subHeader less than 420px in a modal, toggle by a icon.

1. Initiation.

    - Get icon from fontawesome

    __`Location:./client/public/index.html`__

    ```html
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
    ```

    - Add a new element.

    __`Location:./client/public/index.html`__

    ```html
    <div id="modal-root"></div> 
    ```

    - Add higher order component.

    __`Location:./client/src/components/modal/Modal.js`__

    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom';

    const modalRoot = document.getElementById('modal-root');

    class Modal extends React.Component {
        constructor(props) {
            super(props);
            this.el = document.createElement('div');
        }

        componentDidMount() {
            modalRoot.appendChild(this.el);
        }

        componentWillUnmount() {
            modalRoot.removeChild(this.el);
        }

        render() {
            return ReactDOM.createPortal(
                this.props.children,
                this.el,
            );
        }
    }

    export default Modal;
    ```

2. Create a info modal component:

    - Create component.

    __`Location:./client/src/components/infoModal/InfoModal.js`__

    ```jsx
    import React from 'react';
    import './Styles.scss';

    class InfoModal extends React.Component {
        constructor(props) {
            super(props)
        }

        componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside, false);
        }

        componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside, false);
        }

        handleClickOutside = (event) => {
            const { handleSetModal } = this.props;
            if (this.node.contains(event.target)) return;
            return handleSetModal();
        }

        render() {
            const { currentQuestion, handleSetModal } = this.props;
            return (
                <div className='infoModal'>
                    <div ref={node => this.node = node} className='infoModal__container'>
                        <div className='infoModal__closeIcon' >
                            <div onClick={handleSetModal}>&times;</div>
                        </div>

                        <div className='infoModal__contentContainer'>
                            <div className='infoModal__title'>Rules</div>
                            <p className='infoModal__text'>
                                {currentQuestion.additionalInfo}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    export default InfoModal;
    ```

    - scss.

    __`Location:./client/src/components/infoModal/Styles.scss`__

    ```scss
    .infoModal{
        z-index: 1; 
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: rgb(0,0,0); 
        background-color: rgba(0,0,0,0.4); 

        display: flex;
        justify-content: center;

        &__container {
            width:90%;
            height:25%;
            background-color: white;
        
            display: flex;
            flex-direction: column;
            border-radius: 30px;

            max-width: 768px;
            margin: 10.8rem auto 80px auto;
        }

        &__closeIcon {
            display: flex;
            justify-content: flex-end;
            padding-right: 5%;
            font-size: 2rem;
            font-style: bold;
        }

        &__contentContainer{
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__title{
            color:purple;
            font-size: 1.2rem;
        }

        &__text {
            padding:0 5%;
            font-size: 1rem;
        }
    }
    ```

3. Apply modal in LearningModule component.

    __`Location:./client/src/components/learningModule/LearningModule.js`__

    ```js
    import React, { Fragment } from 'react';

    import Modal from '../modal/Modal';
    import Info from '../infoModal/InfoModal';

    const [modal, setModal] = React.useState(false);

    const handleSetModal = () => {
        setModal(!modal);
    }

    <div className="learningModule">
      {currentQuestion.title &&
        <Fragment>
          {
            modal &&
            <Modal>
              <Info handleSetModal={handleSetModal} currentQuestion={currentQuestion} />
            </Modal>
          }
          <ProgressBar totalQuestions={quizData.totalQuestions} id={currentQuestion.id} />
          <div className="learningModule__header">
            <div className="learningModule__titleContainer">
              <div className="learningModule__title">
                {currentQuestion.title}
              </div>
              <i className="fas fa-info-circle infoIcon" onClick={handleSetModal}></i>
            </div>
            <div className="learningModule__subHeader">
              {currentQuestion.additionalInfo}
            </div>
          </div>

          <div className="learningModule__answerArea">
            <div className="learningModule__selections">
              {possibleAnswers}
            </div>
            <div className="learningModule__submitButtonContainer">
              <SubmitButton label="Submit" handleSubmit={handleSubmit} loading={loading} />
            </div>
          </div>
        </Fragment>
      }
    </div>
    ```

    - scss

    __`Location:./client/src/components/learningModule/Styles.scss`__

    ```scss
    &__titleContainer {
        .infoIcon{
            display:none;
        }
        @media only screen and (max-width: $mobile) {
            .infoIcon{
                display:block;
            }
            padding: 0 6%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    ```

### 备注：

1. 本章比较复杂，要注意几个要点：
    - modal 的设计流程（重点）
    - subHeader 是要在 mobile 模式下才会出现， 平时是消失的。
    - 增加了一个新的 div，titleContainer，还有相应的 styling。
    - 侦听鼠标点击事件（难点）
    - 判定鼠标点击范围（难点）

2. 本章比较隐秘的一点是 modal 的位置是跟 mainWrapper 的 scss 设置有关，如下：

    ```scss
    #mainWrapper{
        max-width: $tablet;
        margin: 40px auto 80px auto;
    }
    ```

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/codeTyke-doc/blob/main/README.md)