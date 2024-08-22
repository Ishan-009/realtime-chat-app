import Image from 'next/image';

type Props = {
  size?: number;
};

export const LoadingLogo = ({ size = 100 }: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={size}
        height={size}
        className="animate-pulse duration-800"
      ></Image>
    </div>
  );
};
