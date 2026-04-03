import React from "react";

const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <aside
    className={`bg-(--ctp-surface0) border border-(--ctp-surface1) rounded-[15px] p-6 h-fit lg:sticky lg:top-25 mb-4 lg:mb-0 w-full ${className}`}
  >
    {children}
  </aside>
);

const Header: React.FC<{
  icon?: string;
  title: string;
  className?: string;
}> = ({ icon, title, className = "" }) => (
  <div className={`mb-6 border-b-2 border-(--ctp-surface1) pb-2 ${className}`}>
    <h3 className="text-(--miku-secondary) text-[clamp(1.1rem,2vw,1.3rem)] font-bold flex items-center gap-2 m-0">
      {icon && <i className={icon}></i>}
      {title}
    </h3>
  </div>
);

interface Mode {
  id: string;
  label: string;
  icon: string;
}
interface ModeSwitcherProps {
  modes: Mode[];
  active: string;
  onChange: (id: string) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({
  modes,
  active,
  onChange,
}) => (
  <div className="flex bg-(--ctp-mantle) rounded-[10px] p-1.5 mb-6 border border-(--ctp-surface2)">
    {modes.map((mode) => (
      <button
        key={mode.id}
        onClick={() => onChange(mode.id)}
        className={`flex-1 p-2.5 font-bold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 
        ${active === mode.id ? "bg-(--miku-primary) text-(--ctp-crust)" : "text-(--ctp-subtext0) hover:text-(--ctp-text)"}`}
      >
        <i className={mode.icon}></i> {mode.label}
      </button>
    ))}
  </div>
);

const FormGroup: React.FC<{
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className = "" }) => (
  <div className={`flex flex-col w-full ${className}`}>
    <label className="mb-2 text-[0.9rem] text-(--ctp-subtext0) font-semibold">
      {label}
    </label>
    {children}
  </div>
);

const inputClasses =
  "w-full p-3 bg-(--ctp-mantle) border border-(--ctp-surface2) rounded-lg text-(--ctp-text) outline-none focus:border-(--miku-primary) transition-colors font-sans";

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (
  props,
) => (
  <select className={`${inputClasses} ${props.className || ""}`} {...props}>
    {props.children}
  </select>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props,
) => (
  <input className={`${inputClasses} ${props.className || ""}`} {...props} />
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  icon,
  children,
  className = "",
  ...props
}) => {
  const base =
    "w-full p-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary:
      "bg-(--miku-primary) text-(--ctp-crust) hover:opacity-90 hover:-translate-y-[2px]",
    secondary:
      "bg-(--ctp-surface1) text-(--ctp-text) hover:bg-(--ctp-surface2)",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {icon && <i className={icon}></i>}
      {children}
    </button>
  );
};

export const ControlPanel = Object.assign(Panel, {
  Header,
  ModeSwitcher,
  FormGroup,
  Select,
  Input,
  Button,
});
