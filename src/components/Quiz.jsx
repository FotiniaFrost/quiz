import React from 'react'
import StepBar from './StepBar';

function Quiz({ question, step, length, toCountCorrectAnswers, showCorrect }) {
  const entities = require("entities");
  const [allAnswers, setAllAnswers] = React.useState([]);

  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  React.useEffect(() => {
    let answers = [...question.incorrect_answers]
    answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer)
    setAllAnswers(answers);
  }, [question]);

  const progress = Math.round(step / length * 100);

  return (
    <div>
      <div>
        <StepBar progress={progress} />
        <h2 className="question">{step + 1}. {entities.decodeHTML(question.question)}</h2>
        <ol type="A" className="quiz">
          {allAnswers.map((ans) =>
            <li
              key={ans}
              className={showCorrect ? (ans === question.correct_answer ? 'good' : null) : null}
              onClick={(e) => { toCountCorrectAnswers(e, question.correct_answer) }}>
              {entities.decodeHTML(ans)}
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}

export default Quiz