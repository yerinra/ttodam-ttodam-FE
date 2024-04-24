type ListItemContainerProps = {
  children: React.ReactNode;
};

export default function ListItemContainer({ children }: ListItemContainerProps) {
  return (
    <li className="flex flex-col border-light-gray first-of-type:border-t-[1px] border-b-[1px] p-4 hover:bg-secondary gap-y-2 transition-all">
      {children}
    </li>
  );
}
