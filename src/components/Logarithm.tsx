

interface LogarithmProps {
    base: number;
}

export default function Logarithm({ base }:LogarithmProps) {
    return (
         <>
         Log<sup className="E_constant">e</sup>({base})
        </>
    );
}