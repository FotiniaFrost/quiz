import React from 'react'
import Categories from './components/Categories';
import Quiz from './components/Quiz';
import Result from './components/Result';


function App() {

  const [topic, setTopic] = React.useState([]);
  const [topicId, setTopicId] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [showCorrect, setShowCorrect] = React.useState(false);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((json) => setTopic(json.trivia_categories))
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных Категории');
      })
  }, []);

  const getTopicId = (id) => {
    setTopicId(id)
  }

  React.useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&category=${topicId}`)
      .then((res) => res.json())
      .then((json) => setQuestions(json.results))
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных Вопросы');
      })
  }, [topicId]);

  const quizLength = questions.length;

  const nextQuestion = () => {
    timerRef.current = setTimeout(() => {
      setStep(step + 1);
      setShowCorrect(false);
    }, 2000);
  }

  const toCountCorrectAnswers = (e, correctAns) => {
    if (e.target.innerHTML === correctAns) {
      setCorrect(correct + 1);
      e.target.classList.add("good");
    }
    else {
      e.target.classList.add("bad");
      setShowCorrect(true);
    }

    nextQuestion();
  };

  return (
    <div className="App">
      {(quizLength <= 0) ?
        <Categories items={topic} getTopicId={getTopicId} /> :
        (step >= quizLength) ?
          <Result correct={correct} /> :
          <Quiz
            question={questions[step]}
            step={step}
            length={quizLength}
            nextQuestion={nextQuestion}
            toCountCorrectAnswers={toCountCorrectAnswers}
            showCorrect={showCorrect}
          />
      }
    </div>
  );
}

export default App;
