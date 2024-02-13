import Password from "@mongez/password";
export default function castPassword(value, column, model) {
    return value
        ? Password.generate(String(value), 12)
        : model.getInitial(column);
}
