import React, { Component } from "react";
import Levels from "../Levels/Index";
import ProgressBar from "../ProgressBar/Index";
import { QuizMarvel } from "../QuizMarvel/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizOver from "../QuizOver/Index";
import { FaChevronRight } from "react-icons/fa";

const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestions: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomeMsg: false,
  quizEnd: false,
  percent: null,
};

const levelNames = ["debutant", "confirme", "expert"];

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }
  storedDataRef = React.createRef();

  loadQuestions = (level) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level];

    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;

      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );
      this.setState({
        storedQuestions: newArray,
      });
    }
  };

  showToastMsg = (pseudo) => {
    if (this.state.showWelcomeMsg === false) {
      this.setState({
        showWelcomeMsg: true,
      });
      toast.warn(`Bienvuenue ${pseudo} et bonne chance!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    const { maxQuestions, storedQuestions, idQuestions, score, quizEnd } =
      this.state;

    if (
      storedQuestions !== prevState.storedQuestions &&
      storedQuestions.length
    ) {
      this.setState({
        question: storedQuestions[idQuestions].question,
        options: storedQuestions[idQuestions].options,
      });
    }
    if (idQuestions !== prevState.idQuestions && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestions].question,
        options: storedQuestions[idQuestions].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercent(maxQuestions, score);
      this.gameOver(gradePercent);
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo);
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  getPercent = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = (percent) => {
    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: percent,
      });
    } else {
      this.setState({
        percent: percent,
      });
    }
  };

  nextQuestion = () => {
    if (this.state.idQuestions === this.state.maxQuestions - 1) {
      this.setState({ quizEnd: true });
    } else {
      this.setState((prevState) => ({
        idQuestions: prevState.idQuestions + 1,
      }));
    }

    const goodAnswer =
      this.storedDataRef.current[this.state.idQuestions].answer;

    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));

      toast.success("Bravo +1", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        bodyClassName: "toastify-color",
      });
    } else {
      toast.error("Raté 0", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        bodyClassName: "toastify-color",
      });
    }
  };

  loadLevelQuestions = (param) => {
    this.setState({ ...initialState, quizLevel: param });
    this.loadQuestions(levelNames[param]);
  };
  render() {
    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestions,
      btnDisabled,
      userAnswer,
      score,
      quizEnd,
      percent,
    } = this.state;

    const displayOptions = options.map((option, index) => {
      return (
        <p
          key={index}
          onClick={() => this.submitAnswer(option)}
          className={`answerOptions ${
            userAnswer === option ? "selected" : null
          }`}
        >
          <FaChevronRight />
          {option}
        </p>
      );
    });

    return quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <>
        <h2>{question}</h2>

        <Levels levelNames={levelNames} quizLevel={quizLevel} />

        <ProgressBar idQuestion={idQuestions} maxQuestions={maxQuestions} />

        {displayOptions}

        <button
          disabled={btnDisabled}
          onClick={this.nextQuestion}
          className="btnSubmit"
        >
          {idQuestions < maxQuestions - 1 ? "Suivant" : "Terminer"}
        </button>
        <ToastContainer />
      </>
    );
  }
}

export default Quiz;
