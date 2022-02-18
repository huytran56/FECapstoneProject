import { NavigationBar } from "../containers";

export function MainLayout({ children }) {
  return (
    <>
      <NavigationBar />
      <main>{children}</main>
    </>
  );
}
