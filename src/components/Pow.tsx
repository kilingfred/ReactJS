


interface PowProps {
    base: number;
    exponent: number;
}
export default function Pow({ base, exponent }: PowProps) {
    return (
    <>
        <p>{base}^{exponent}</p>
    </>
    );
}