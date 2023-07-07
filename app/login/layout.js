export const metadata = {
  title: "Login",
};

export default function LoginLayout({
  children, // will be a page or nested layout
}) {
  return <section>{children}</section>;
}
