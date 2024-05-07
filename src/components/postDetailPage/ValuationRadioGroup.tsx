import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type ValuationRadioGroupProps = {
  onClick: () => void;
  option: {
    label: string;
    count: number;
  };
  checked: boolean;
};

export default function ValuationRadioGroup({ onClick, option, checked }: ValuationRadioGroupProps) {
  return (
    <RadioGroup defaultValue="comfortable" onClick={onClick}>
      <div className="flex items-center space-x-1">
        <RadioGroupItem value={option.label} checked={checked} />
        <div className="cursor-pointer">{option.label}</div>
      </div>
    </RadioGroup>
  );
}
