import { SignIn } from "../components/containers";
import { AuthenticateLayout } from "../components/layout";

export default function SignInForm() {
  return (
    <>
      <SignIn />
    </>
  );
}
SignInForm.Layout = AuthenticateLayout;
