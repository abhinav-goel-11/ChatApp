import { ChangeEvent, FocusEvent, KeyboardEvent, useMemo } from "react";
import { RE_DIGT } from "../utlis/constants";

type OtpInputProps = {
  value: string;
  valueLength: number;
  onChange: (newValue: string) => void;
};

export default function OtpInput({
  valueLength,
  value,
  onChange,
}: OtpInputProps) {
  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: string[] = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];
      if (RE_DIGT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }
    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLInputElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;
    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const focusToPrevInput = (target: HTMLInputElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;
    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }
    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
      return;
    }
    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;
    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);
      if (!isTargetValueDigit) {
        return;
      }
      focusToNextInput(target);
      
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);
      target.blur();
    }

    
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== "Backspace" || targetValue !== "") {
      return;
    }

    focusToPrevInput(target);
  };

  const inputOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;
    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className="space-x-4">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          value={digit}
          type="text"
          inputMode="numeric"
          pattern="\d{1}"
          autoComplete="one-time-code"
          maxLength={valueLength}
          className="outline-none border-2 border-gray-500 text-gray-300 bg-transparent w-8 text-3xl text-center ring-gray-950 focus:ring-4 focus:border-none"
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
}
