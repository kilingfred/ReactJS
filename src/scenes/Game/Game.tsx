import UpperCanvas from './components/upperCanvas/UpperCanvas';
import {NumberValueProvider} from "../../contexts/NumberContext";
import {ResultValueProvider} from "../../contexts/ResultContext";
import {TaskValueProvider} from "../../contexts/TaskContext";
import {useParams} from "react-router-dom";

export default function Game() {
    const params = useParams();

    const difficulty = params.difficulty || 'easy';
    
    
    return (
        <div className="game-container">
           <NumberValueProvider>
                <ResultValueProvider>
                    <TaskValueProvider>
                        <UpperCanvas difficulty={difficulty}  />
                    </TaskValueProvider>
                </ResultValueProvider>
            </NumberValueProvider>
        </div>
    );
}