import React, { Fragment } from 'react';
import axios from 'axios';

import SelectionBox from '../selectionBox/SelectionBox';
import ProgressBar from '../progressBar/ProgressBar';
import SubmitButton from '../submitButton/SubmitButton';
import Modal from '../modal/Modal';
import Info from '../infoModal/InfoModal';

import './Styles.scss';

const LearningModule = ({ setGameStatus }) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const [selectedAnsArr, setAnswerArr] = React.useState([false, false, false, false]);
  let hasSelected = selectedAnsArr.includes(true);

  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId] : {};
  React.useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    try {
      const res = await axios.get("/problems");
      setQuizData(res.data);
    }
    catch (err) {
      console.log(err);
    }
  }

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

  const handleSetModal = () => {
    setModal(!modal);
  }

  let possibleAnswers = [];
  if (currentQuestion.possibleAnswers) {
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} />
    })
  }


  return (
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
              <SubmitButton label="Submit" handleSubmit={handleSubmit} loading={loading} hasSelected={hasSelected} />
            </div>
          </div>
        </Fragment>
      }
    </div>
  )
}

export default LearningModule;
