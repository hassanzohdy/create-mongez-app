import { trans } from "@mongez/localization";
import Is from "@mongez/supportive-is";
export default function parseError(error) {
    var _a, _b;
    if (Is.empty(error)) {
        return Is.object(error) ? <span>{trans("somethingWentWrong")}</span> : null;
    }
    if (error.response) {
        error = error.response;
    }
    if ([405, 500, 401].includes(error.status)) {
        return <span>{trans("somethingWentWrong")}</span>;
    }
    if (error.status === 404) {
        return <span>{trans("notFound")}</span>;
    }
    if ((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.errors) {
        error = error.data.errors;
    }
    if ((_b = error === null || error === void 0 ? void 0 : error.data) === null || _b === void 0 ? void 0 : _b.error) {
        error = error.data.error;
    }
    let errorContent;
    if (Is.array(error)) {
        errorContent = error.map((error) => {
            if (error.value) {
                return <p key={error.key}>{error.value}</p>;
            }
            return error;
        });
    }
    else {
        errorContent = <p>{error}</p>;
    }
    return errorContent;
}
