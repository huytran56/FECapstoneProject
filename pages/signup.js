import { SignUp } from "../components/containers";
import { AuthenticateLayout } from "../components/layout";

export default function SignUpForm() {
  return (
    <>
      <SignUp />
    </>
  );
}
SignUpForm.Layout = AuthenticateLayout;
