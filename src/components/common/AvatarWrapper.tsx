interface Props {
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const AvatarWrapper: React.FC<Props> = ({ isActive, children, onClick }) => (
  <div
    className="relative grid aspect-square cursor-pointer place-items-center overflow-hidden rounded-full "
    role="presentation"
    onClick={onClick}
  >
    {children}
    <div
      className={`border-custom-8 bg-custom-8 absolute ${
        isActive ? "grid rounded-full" : "hidden"
      } h-full w-full place-items-center border-2 bg-opacity-75`}
    >
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.4287 3.9978C13.258 3.9978 13.08 4.0538 12.95 4.1818L7.14534 9.91113C6.97401 10.0798 6.80201 10.0485 6.66734 9.84981L4.67 6.90314C4.466 6.60247 4.03934 6.51847 3.73334 6.71914C3.428 6.9198 3.34267 7.33914 3.54667 7.63981L5.54334 10.5865C6.14467 11.4725 7.31601 11.5851 8.08201 10.8318L13.9073 5.12313C14.1667 4.86713 14.1667 4.4378 13.9073 4.1818C13.7773 4.0538 13.5987 3.9978 13.4287 3.9978Z"
          fill="#EFF6FF"
        />
      </svg>
    </div>
  </div>
);

export default AvatarWrapper;
