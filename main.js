// 랜덤번호 지정
// 유저가 번호를 입력 -> go 버튼 클릭
// 유저가 번호를 맞추면 -> 맞췄습니다.
// 랜덤번호 < 유저번호 -> Down!
// 랜덤번호 > 유저번호 -> Up!
// Reset 버튼을 -> 게임 리셋
// 5번의 기회를 다 쓰면 게임 오버 -> 버튼 disable
// 1~100 범위 밖의 숫자 입력 -> 알려준다.  기회를 깎지 않는다.
// 이미 입력한 숫자 또 입력  -> 알려준다.  기회를 깎지 않는다.

let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area")

let computerNum = 0;
const chanceTimeSetting = 5;
let chances = chanceTimeSetting;
let history = [];

window.addEventListener("load", ()=>{chanceArea.textContent =`컴퓨터가 생성한 1~50 사이의 숫자를 ${chances}번 내에 맞혀야 합니다.`});
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", ()=>{userInput.value=""})

function pickRandomNumber () {
    computerNum = Math.floor(Math.random()*50)+1;
    console.log("정답 : ", computerNum);
};
pickRandomNumber();

function play () {
    let userValue = userInput.value;
    
    if (userValue < 1 || userValue > 50) {
        resultArea.textContent = "1~50 사이의 숫자를 입력해주세요"
        return
    }

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요"
        return
    }
    
    if (userValue < computerNum) {
        resultArea.textContent = "Up ~~ !!"
        chances--;
        chanceArea.textContent = `남은 기회는 ${chances}번입니다.`;                
    } else if (userValue > computerNum){        
        resultArea.textContent = "Down ~~ !!"        
        chances--
        chanceArea.textContent = `남은 기회는 ${chances}번입니다.`;                
    } else {
        resultArea.textContent = "정답입니다 ~~~~  ^^"
        chanceArea.textContent = "축하합니다";        
    };
    
    history.push(userValue);
    console.log(history);

    if (chances < 1) {
        resultArea.textContent = "You Lose ~~ ^^;"
        chanceArea.textContent = "'다시시작' 버튼을 눌러주세요";
        playButton.disabled = true;
    }    
};

function reset () {
    userInput.value = "";
    pickRandomNumber();
    chances = chanceTimeSetting;
    history = [];
    resultArea.textContent = "새로운 게임이 시작됩니다.";
    chanceArea.textContent = `컴퓨터가 생성한 1~50 사이의 숫자를 ${chances}번 내에 맞혀야 합니다.`;
    playButton.disabled = false;    
}

