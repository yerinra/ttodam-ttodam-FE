type FormErrorMessageProps = {
  children: React.ReactNode;
};

export default function FormErrorMessage({ children }: FormErrorMessageProps) {
  return <span className="text-red-500 text-sm">{children}</span>;
}
