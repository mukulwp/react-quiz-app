import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useAnswers from '../../Hooks/useAnswers'
import Analysis from '../Result/Analysis/Analysis'
import Summary from '../Result/Summary/Summary'
import _ from 'lodash'

const ResultPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { qna } = state;

  const { isLoading, error, answers } = useAnswers(id);
  //Calculate Result
  const calculateResult = () => {
    let score = 0;

    answers.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexes = [];
      
      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5;
      }
    });
    return score;
  }

  const userScore = calculateResult();

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <p className='error'>There was an error!</p>}

      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
     
    </>
  );
}

export default ResultPage