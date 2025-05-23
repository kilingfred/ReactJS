import UpperCanvas from './components/upperCanvas/UpperCanvas';
import {NumberValueProvider} from "../../contexts/NumberContext";
import {ResultValueProvider} from "../../contexts/ResultContext";
import {TaskValueProvider} from "../../contexts/TaskContext";
import {useParams} from "react-router-dom";
import { OptionValueProvider } from '../../contexts/OptionContext';

export default function Game() {
    const params = useParams();

    const difficulty = params.difficulty || 'easy';
    
    
    return (
        <div className="game-container">
           <NumberValueProvider>
                <ResultValueProvider>
                    <TaskValueProvider>
                        <OptionValueProvider>
                            <UpperCanvas difficulty={difficulty}  />
                        </OptionValueProvider>
                    </TaskValueProvider>
                </ResultValueProvider>
            </NumberValueProvider>
        </div>
    );
}