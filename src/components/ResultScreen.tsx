export default function ResultScreen ({correct, difficulty, time}: {correct: number, difficulty: string, time: number}) {

    const timex = time;
    let score = 0;
    if(difficulty == "easy") {
        score = correct * 100 * (timex * 0.1);
    }
    else if(difficulty == "medium") {
        score = correct * 200 * (timex * 0.2);
    }
    else if(difficulty == "hard") {
        score = correct * 300 * (timex * 0.3);
    }

    return (
        <div className="result-screen">
            <h1>Result</h1>
            <p>Correct Answers: {correct}</p>
            <p>Time remaining: {timex}</p>
            <p>Score: {score.toFixed(0)}</p>
        </div>
    );
}
