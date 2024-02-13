import { createReactForm, emailInput, passwordInput, resetButton, submitButton, textInput, } from "@mongez/moonlight";
const inputs = [
    textInput("firstName").required().col({
        xs: 12,
        sm: 10,
        md: 8,
        lg: 6,
        xl: 4,
    }),
    textInput("lastName").required().col("auto"),
    emailInput("email").required(),
    passwordInput("password").confirmed().required(),
];
const S = createReactForm(reactiveForm => {
    reactiveForm
        .heading("Login")
        .setInputs([
        emailInput("email").required(),
        passwordInput("password").required(),
    ])
        .buttons([submitButton("login"), resetButton("Reset Form")]);
});
export default S;
