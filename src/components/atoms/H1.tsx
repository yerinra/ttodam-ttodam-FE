type H1Props = {
  children: React.ReactNode;
};

export default function H1({ children }: H1Props) {
  return <h1 className="font-bold text-2xl my-5 mt-10 text-center">{children}</h1>;
}
