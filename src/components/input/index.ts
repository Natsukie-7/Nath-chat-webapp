import DefaultInput from "./default/DefaultInput";
import Email from "./email/EmailInput";
import Password from "./password/Password";

const Input = Object.assign(DefaultInput, { Email, Password });

export default Input;

export { PasswordContextProvider } from "./password/Password.context";
