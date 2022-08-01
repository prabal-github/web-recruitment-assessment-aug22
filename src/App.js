import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";

function App() {

  const [questions, setquestions] = useState([])
  const [questionNumber, setquestionNumber] = useState(-1)
  const [started, setstarted] = useState(false)
  const [start, setstart] = useState(false)
  const [newoptions, setnewoptions] = useState([])
  const [showScore, setShowScore] = useState(false);
  const [score, setscore] = useState(0)
  const [selectedOption, setselectedOption] = useState("")
  const [difficulty, setdifficulty] = useState("medium")
  const [category, setcategory] = useState('any')
  const opentdb = require('opentdb-api');
  var optns = []

  useEffect(() => {
    var apiStart = true;
    opentdb.getToken().then(newToken => {

      var options = {
        amount: 5,
        category: category,
        difficulty: difficulty,
        type: 'multiple',
        token: newToken
      }
      if (apiStart) {
        opentdb.getTrivia(options).then(uniqueTrivia => {
          setquestions(uniqueTrivia)
        });
      }
    });

    return () => {
      apiStart = false;
    }

  }, [start, difficulty, category])


  const startquestioncount = () => {
    setstarted(true)
    var count = questionNumber;
    setquestionNumber(count + 1);

    console.log(questions);

    for (let i = 0; i < questions.length; i++) {
      optns[i] = questions[i].incorrect_answers;
      optns[i].push(questions[i].correct_answer);

      // Randomize
      let currentIndex = optns[i].length, randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [optns[i][currentIndex], optns[i][randomIndex]] = [
          optns[i][randomIndex], optns[i][currentIndex]];
      }
    }
    setnewoptions(optns)
    console.log(newoptions);
    console.log(started);
    console.log(showScore);
  }

  const nextquestion = () => {
    var count = questionNumber;
    (questionNumber < 4) ? setquestionNumber(count + 1) : setShowScore(true);
    console.log(selectedOption);
    console.log(questions[questionNumber].correct_answer);
    if (questions[questionNumber].correct_answer === selectedOption) {
      var currentScore = score;
      setscore(currentScore + 1);
    }
  }

  const reset = () => {
    setscore(0);
    setstarted(false)
    console.log('reset successfull');
    setShowScore(false)
    const resetUseeffect = start;
    setstart(resetUseeffect ? false : true);
    window.location.reload();
  }

  return (
    <div className="app w-full">
      <Header />
      <main>

        <div className="flex flex-col items-center justify-center gap-5 m-10">

          {!started ?
            <div className="flex flex-col">

              <div className="mb-3">
                <select required
                  onChange={(e) => { setdifficulty(e.target.value) }}
                  className="form-select appearance-none
                              block
                              w-full
                              px-3
                              py-1.5
                              text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                >
                  <option selected disabled>Select Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>


              <div className="mb-3">
                <select required
                  onChange={(e) => { setcategory(e.target.value) }}
                  className="form-select appearance-none
                              block
                              w-full
                              px-3
                              py-1.5
                              text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                >
                                          
                  <option selected disabled>Select Category</option>
                  <option value="any">any</option>
                  <option value="general">general</option>
                  <option value="books">books</option>
                  <option value="film">film</option>
                  <option value="music">music</option>
                  <option value="theatre">theatre</option>
                  <option value="television">television</option>
                  <option value="videogames">videogames</option>
                  <option value="boardgames">boardgames</option>
                  <option value="science">science</option>
                  <option value="computers">computers</option>
                  <option value="mathematics">mathematics</option>
                  <option value="mythology">mythology</option>
                  <option value="sports">sports</option>
                  <option value="geography">geography</option>
                  <option value="history">history</option>
                  <option value="politics">politics</option>
                  <option value="art">art</option>
                  <option value="celebrities">celebrities</option>
                  <option value="animals">animals</option>
                  <option value="vehicles">vehicles</option>
                  <option value="comics">comics</option>
                  <option value="gadgets">gadgets</option>
                  <option value="anime">anime</option>
                  <option value="cartoons">cartoons</option>
                </select>
              </div>

              {questions.length > 0 ?
                <button className="w-full text-white font-bold text-md uppercase bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2" onClick={startquestioncount}>
                  Start
                </button> :
                <button className="text-white font-bold text-md uppercase bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
                  <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Loading...
                </button>
              }


            </div>

            : <div></div>}

          {started && !showScore ?

            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold text-center">
                {'('+(questionNumber + 1)+'/5)'}
              </div>
              {/* ----- QUESTION ----- */}
              <div className="text-2xl font-bold text-center">
                {questionNumber + 1}). {questions[questionNumber].question}
              </div>

              {/* ----- OPTIONS ----- */}
              <div className="flex flex-col gap-3 mt-5">
                {newoptions[questionNumber].map(option => {
                  return (
                    <button type="button" onClick={() => setselectedOption(option)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-md font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-whiterounded-md group-hover:bg-opacity-0">
                        {JSON.stringify(option).slice(1, -1)}
                      </span>
                    </button>
                  )
                })}
              </div>

              <button className="w-full mt-5 content-center text-white font-bold text-md uppercase bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
                <div onClick={nextquestion}>Next</div>
              </button>
            </div>


            : <div></div>}

          {started && showScore ?
            <div>
              <div className="text-2xl font-bold text-center">You Score: {score}/5 </div>
              <button className="w-full mt-5 content-center text-white font-bold text-md uppercase bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
                <div onClick={() => reset()}>Reset</div>
              </button>
            </div>

            : <div></div>
          }


        </div>
      </main>
      <div className="grow" />
      <Footer />
    </div>
  );
}

export default App;
