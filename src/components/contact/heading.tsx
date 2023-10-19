import { IconType } from 'react-icons';

type Props = {
  name: string;
  Icon: IconType;
};

const Heading = ({ name, Icon }: Props) => (
  <span className="flex items-center space-x-1">
    <h2 className="font-heading text-xl pt-1 font-semibold">{name}</h2>
    <Icon className="w-8 h-8" />
  </span>
);

export default Heading;
