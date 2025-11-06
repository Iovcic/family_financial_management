import { IIconProps } from "../_types";

const MinusIcon = ({ stroke = 1.5, size = "size-6" }: IIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      stroke="currentColor"
      className={size}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
};

export default MinusIcon;
