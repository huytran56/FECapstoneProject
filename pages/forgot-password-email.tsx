import { SignUpInfo } from "@components/containers/sign-up-wait";
import { ForgotPassword } from "@components/ui";
import { SignUp } from "../components/containers";
import { AuthenticateLayout, EmptyLayout } from "../components/layout";

export default function ForgotPasswordEmail() {
  return (
    <>
      <ForgotPassword />
    </>
  );
}
ForgotPasswordEmail.Layout = EmptyLayout;
