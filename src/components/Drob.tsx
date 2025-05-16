

interface DrobProps {
    numerator: number;
    denominator: number;
}

export default function Drob({ numerator, denominator}: DrobProps) {
    return (
        <div className="fraction">
                <div className="numerator">{numerator}</div>
                <div className="denominator">{denominator}</div>
        </div>
    );
}