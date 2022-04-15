import { SignUpInfo } from "@components/containers/sign-up-wait";
import { SignUp } from "../components/containers";
import { AuthenticateLayout, EmptyLayout } from "../components/layout";

export default function SignUpFormInfo() {
  return (
    <>
      <SignUpInfo />
    </>
  );
}
SignUpFormInfo.Layout = EmptyLayout;
