import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";

const layout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (session && !session.error) {
    return redirect("/");
  }

  return (
    <main>
      {children}
    </main>
    );
};

export default layout;
