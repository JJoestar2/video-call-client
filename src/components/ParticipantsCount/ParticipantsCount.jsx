const ParticipantsCount = ({ count, onClick }) => {
    return (
      <div className="rounded-xl inline-block relative">
        <button
          onClick={onClick}
          className="inline-block h-10 w-10 rounded-xl overflow-hidden bg-gray-100"
        >
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        </button>
        <span className="place-content-center absolute top-0 right-0 block h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-300 text-xs text-center text-black">
          {count}
        </span>
      </div>
    );
};

export default ParticipantsCount;
