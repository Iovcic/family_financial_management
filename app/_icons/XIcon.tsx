import { IIconProps } from "../_types";

const XIcon = ({ stroke = 1.5, size = "size-6" }: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={stroke}
    stroke="currentColor"
    className={size}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export default XIcon;
