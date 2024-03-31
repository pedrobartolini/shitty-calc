import { useState } from "react";

export default function Calc() {
  const [firstNumber, setFirstNumber] = useState(0);
  const [firstNumberDecimal, setFirstNumberDecimal] = useState(null);

  const [operator, setOperator] = useState(null);

  const [secondNumber, setSecondNumber] = useState(0);
  const [secondNumberDecimal, setSecondNumberDecimal] = useState(null);

  const [decimalActivated, setDecimalActivated] = useState(false);

  function handle_number(new_number) {
    if (operator === null) {
      if (decimalActivated) {
        setFirstNumberDecimal(firstNumberDecimal * 10 + new_number);
      } else {
        setFirstNumber(firstNumber * 10 + new_number);
      }
    } else {
      if (decimalActivated) {
        setSecondNumberDecimal(secondNumberDecimal * 10 + new_number);
      } else {
        setSecondNumber((secondNumber || 0) * 10 + new_number);
      }
    }
  }

  function handle_operator(operator) {
    setDecimalActivated(false);

    if (operator === "=") {
      const result = calculate();
      setFirstNumber(result);
      setFirstNumberDecimal(null);
      setOperator(null);
      setSecondNumber(null);
      setSecondNumberDecimal(null);
      return;
    }

    if (operator === ".") {
      setDecimalActivated(true);
      return;
    }

    setOperator(operator);
  }

  function calculate() {
    let first_number = firstNumber;
    let second_number = secondNumber;

    if (firstNumberDecimal) {
      first_number = Number(`${firstNumber}.${firstNumberDecimal}`);
    }

    if (secondNumberDecimal) {
      second_number = Number(`${secondNumber}.${secondNumberDecimal}`);
    }

    switch (operator) {
      case "+":
        return first_number + second_number;
      case "-":
        return first_number - second_number;
      case "*":
        return first_number * second_number;
      case "/":
        return first_number / second_number;
      default:
        return first_number;
    }
  }

  function Button({ input }) {
    const is_number = !isNaN(input);

    let handler;
    if (is_number) {
      handler = () => handle_number(input);
    } else {
      handler = () => handle_operator(input);
    }

    return <button onClick={handler} input={input}>{input}</button>
  }

  return (
    <main className="p-4 shadow rounded grid gap-2">
      <p className="border rounded w-full h-12 outline-none flex items-center p-2">{(function () {
        if (decimalActivated) {
          if (!operator) {
            if (firstNumberDecimal) {
              return <>{firstNumber}.{firstNumberDecimal}</>
            } else {
              return <>{firstNumber}.</>
            }
          }

          let first_number = firstNumber;
          if (firstNumberDecimal) {
            first_number = Number(`${firstNumber}.${firstNumberDecimal}`);
          }

          console.log(first_number)

          if (secondNumberDecimal) {
            return <>{first_number} {operator} {secondNumber}.{secondNumberDecimal}</>
          } else {
            return <>{first_number} {operator} {secondNumber}.</>
          }
        } else {
          let first_number = firstNumber;
          let second_number = secondNumber;

          if (firstNumberDecimal) {
            first_number = Number(`${firstNumber}.${firstNumberDecimal}`);
          }

          if (secondNumberDecimal) {
            second_number = Number(`${secondNumber}.${secondNumberDecimal}`);
          }

          if (operator) {
            return <>{first_number} {operator} {second_number}</>
          } else {
            return <>{first_number}</>
          }
        }
      })()}</p>
      <div className="*:text-gray-700 grid grid-cols-4 gap-2 *:border *:h-12 *:aspect-square  *:rounded  *:flex *:justify-center *:items-center *:transition-all *:cursor-pointer hover:*:bg-blue-500 hover:*:text-white">
        <Button input={0} />
        <Button input={8} />
        <Button input={9} />
        <Button input="/" />

        <Button input={4} />
        <Button input={5} />
        <Button input={6} />
        <Button input="*" />

        <Button input={1} />
        <Button input={2} />
        <Button input={3} />
        <Button input="-" />

        <Button input={0} />
        <Button input="." />
        <Button input="=" />
        <Button input="+" />
      </div>
    </main >
  )
}
