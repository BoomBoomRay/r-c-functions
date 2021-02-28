import classNames from 'classnames';
import { ChangeEvent } from 'react';

interface InputGroupProps {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  error: string | undefined;
  setValue: (str: ChangeEvent) => void;
}

const Inputgroup: React.FC<InputGroupProps> = ({
  className,
  type,
  placeholder,
  name,
  value,
  error,
  setValue,
}) => {
  return (
    <div className={className}>
      <input
        onChange={setValue}
        type={type}
        name={name}
        value={value}
        className={classNames(
          'w-full p-3 text-sm transition duration-300 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white',
          { 'border-red-500': error }
        )}
        placeholder={placeholder}
      />
      <small className='font-medium text-red-500'>{error}</small>
    </div>
  );
};
export default Inputgroup;
