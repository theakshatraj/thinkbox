import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/actions/user.actions";

export const dynamic = "force-dynamic";

const SignIn = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) redirect("/");

  return <AuthForm type="sign-in" />;
};

export default SignIn;
