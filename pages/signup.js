import { SignUp } from "../components/containers";
import { AuthenticateLayout, EmptyLayout } from "../components/layout";

export default function SignUpForm() {
  return (
    <>
      <SignUp />
    </>
  );
}
SignUpForm.Layout = EmptyLayout;
