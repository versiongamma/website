type Props = {
  link: string;
  icon: string;
  name: string;
};

const Account = ({ link, icon, name }: Props) => {
  return (
    <a
      className="flex flex-row items-center hover-bg rounded-xl p-2"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <img src={icon} className="w-10 rounded-full" />
      <h2 className="m-2">{name}</h2>
    </a>
  );
};

export default Account;
