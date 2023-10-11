// https://github.com/themesberg/flowbite/blob/main/content/components/skeleton.md

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const Skeleton = ({ className, children }: Props) => {
  return (
    <div
      role="status"
      className={`flex items-center justify-center bg-gray-300 rounded-lg 
      animate-pulse dark:bg-gray-700 ${className ?? ""}`}
    >
      {children ?? null}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
