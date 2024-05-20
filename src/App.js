import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [nums, setNums] = useState([
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [score, setScore] = useState(0);

  const [record, setRecord] = useState(0);

  useEffect(() => {
    if (score > record) {
      setRecord(score);
    }
  }, [score, record]);

  useEffect(() => {
    let bestrec = localStorage.getItem("key");
    setRecord(bestrec);
  }, []);

  function newgame() {
    localStorage.setItem("key", record);
    window.location.reload();
  }

  function randomNum(nums) {
    const indexes = nums
      .flat()
      .map((x, index) => {
        if (x === 0) return index;
      })
      .filter((item) => item !== undefined);
    if (indexes.length === 0) {
      return nums;
    } else {
      const index = indexes[Math.floor(Math.random() * indexes.length)];
      const i = Math.floor(index / 4);
      const j = index % 4;
      const newNums = JSON.parse(JSON.stringify(nums));
      newNums[i][j] = Math.random() < 0.5 ? 2 : 4;
      return newNums;
    }
  }
  function canGoLeft() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (nums[i][j] == 0 && nums[i][j + 1] != 0) {
          return true;
        }
        if (nums[i][j] == nums[i][j + 1]) {
          return true;
        }
      }
    }
    return false;
  }
  function canGoRight() {
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j > 0; j--) {
        if (nums[i][j] == 0 && nums[i][j - 1] != 0) {
          return true;
        }
        if (nums[i][j] == nums[i][j - 1]) {
          return true;
        }
      }
    }
    return false;
  }
  function canGoUp() {
    for (let j = 3; j >= 0; j--) {
      for (let i = 0; i <= 2; i++) {
        if (nums[i][j] == 0 && nums[i + 1][j] != 0) {
          return true;
        }
        if (nums[i][j] == nums[i + 1][j]) {
          return true;
        }
      }
    }
    return false;
  }
  function canGoDown() {
    for (let j = 3; j >= 0; j--) {
      for (let i = 3; i >= 1; i--) {
        if (nums[i][j] == 0 && nums[i - 1][j] != 0) {
          return true;
        }
        if (nums[i][j] == nums[i - 1][j]) {
          return true;
        }
      }
    }
    return false;
  }

function gameEndClass(){
if(canGoDown() == false && canGoUp() == false && canGoLeft() == false && canGoRight() == false){
  return "game-end show"
}
else{
  return "game-end"
}
}

  function goLeft() {
    let newNums = JSON.parse(JSON.stringify(nums)); // сделать копию масива nums
    let newScore = score;
    for (let block = 0; block <= 2; block++) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          if (newNums[i][j] == 0) {
            newNums[i][j] = newNums[i][j + 1];
            newNums[i][j + 1] = 0;
          }
          if (newNums[i][j] == newNums[i][j + 1]) {
            newNums[i][j] = newNums[i][j + 1] + newNums[i][j];
            newScore += newNums[i][j];
            newNums[i][j + 1] = 0;
          }
        }
      }
    }
    setScore(newScore);

    newNums = randomNum(newNums);
    setNums(newNums);
  }

  function goRight() {
    let newNums = JSON.parse(JSON.stringify(nums)); // сделать копию масива nums
    let newScore = score;
    for (let block = 0; block <= 2; block++) {
      for (let i = 0; i < 4; i++) {
        for (let j = 3; j > 0; j--) {
          if (newNums[i][j] == 0) {
            newNums[i][j] = newNums[i][j - 1];
            newNums[i][j - 1] = 0;
          }
          if (newNums[i][j] == newNums[i][j - 1]) {
            newNums[i][j] = newNums[i][j - 1] + newNums[i][j];
            newScore += newNums[i][j];
            newNums[i][j - 1] = 0;
          }
        }
      }
    }
    setScore(newScore);

    newNums = randomNum(newNums);
    setNums(newNums);
  }

  function goUp() {
    let newNums = JSON.parse(JSON.stringify(nums)); // сделать копию масива nums

    let newScore = score;
    for (let block = 0; block <= 2; block++) {
      for (let j = 3; j >= 0; j--) {
        for (let i = 0; i <= 2; i++) {
          if (newNums[i][j] == 0) {
            newNums[i][j] = newNums[i + 1][j];
            newNums[i + 1][j] = 0;
          }
          if (newNums[i][j] == newNums[i + 1][j]) {
            newNums[i][j] = newNums[i + 1][j] + newNums[i][j];
            newScore += newNums[i][j];
            newNums[i + 1][j] = 0;
          }
        }
      }
    }
    setScore(newScore);

    newNums = randomNum(newNums);
    setNums(newNums);
  }

  function goDown() {
    let newNums = JSON.parse(JSON.stringify(nums)); // сделать копию масива nums

    let newScore = score;
    for (let block = 0; block <= 2; block++) {
      for (let j = 3; j >= 0; j--) {
        for (let i = 3; i >= 1; i--) {
          if (newNums[i][j] == 0) {
            newNums[i][j] = newNums[i - 1][j];
            newNums[i - 1][j] = 0;
          }
          if (newNums[i][j] == newNums[i - 1][j]) {
            newNums[i][j] = newNums[i - 1][j] + newNums[i][j];
            newScore += newNums[i][j];
            newNums[i - 1][j] = 0;
          }
        }
      }
    }
    setScore(newScore);

    newNums = randomNum(newNums);
    setNums(newNums);
  }

  function handleKeyDown(event) {
    if (event.key == "w") {
      goUp();
    }
    if (event.key == "s") {
      goDown();
    }
    if (event.key == "d") {
      goRight();
    }
    if (event.key == "a") {
      goLeft();
    }

    if (event.key == "ArrowUp") {
      goUp();
    }
    if (event.key == "ArrowDown") {
      goDown();
    }
    if (event.key == "ArrowRight") {
      goRight();
    }
    if (event.key == "ArrowLeft") {
      goLeft();
    }
  }

  return (
    <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="panel-title">
        <h1>2048</h1>
        <button className="new-game" onClick={newgame}>
          Новая игра
        </button>
      </div>
      <div className="panel-scores">
        <div>
          <h2>Очки</h2>
          <h1>{score}</h1>
        </div>
        <div>
          <h2>Рекорд</h2>
          <h1>{record}</h1>
        </div>
      </div>
      <div className="game">
        <div className={gameEndClass()}>
          <h2 className="game-over">
            Конец игры
            <br />
            Очки: {score}
          </h2>
          <button onClick={newgame} className="but-new-game">Начать заново</button>
        </div>
        <div className="game-bg">
          {Array.from({ length: 16 }).map((_, index) => (
            <div className="game-bg-tile" key={index}>
              &nbsp;
            </div>
          ))}
        </div>
        <div className="game-all">
          {nums.flat().map((num, index) => (
            <div className={"num-" + num} key={index}>
              {num === 0 ? <p>&nbsp;</p> : <p>{num}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
