import { Input } from '../ui/input';

type SearchFormProps = {
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
};

export default function SearchForm({ onFormSubmit, value, onValueChange, className, placeholder }: SearchFormProps) {
  return (
    <form onSubmit={onFormSubmit}>
      <Input
        value={value}
        onChange={onValueChange}
        className={className}
        placeholder={placeholder || '검색어를 입력하세요.'}
      />
    </form>
  );
}
