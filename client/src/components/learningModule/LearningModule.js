import React, { Fragment } from 'react';
import axios from 'axios';

import SelectionBox from '../selectionBox/SelectionBox';
import ProgressBar from '../progressBar/ProgressBar';
import SubmitButton from '../submitButton/SubmitButton';

import './Styles.scss';

const LearningModule = ({ setGameStatus }) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

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
          <ProgressBar totalQuestions={quizData.totalQuestions} id={currentQuestion.id} />
          <div className="learningModule__header">
            <div className="learningModule__title">
              {currentQuestion.title}
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
  )
}

export default LearningModule;
