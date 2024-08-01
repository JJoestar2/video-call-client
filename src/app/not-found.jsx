import Image from "next/image";
import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-[20px]">
      <h1 className="text-[42px]">Page not found</h1>
      <Image
        src="/images/no_matches.png"
        alt="not found"
        height={211}
        width={327}
      />
      <Link href="/">
        <div className="h-auto rounded-full bg-purple-400 px-4 py-3 font-semibold text-white lg:hover:bg-purple-200">
          Go to Home Page
        </div>
      </Link>
    </div>
  );
}

export default NotFoundPage;
