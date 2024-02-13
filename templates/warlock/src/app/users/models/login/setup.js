var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Login } from "./login";
export const loginBlueprint = Login.blueprint();
export function loginMigration() {
    return __awaiter(this, void 0, void 0, function* () {
        yield loginBlueprint.unique("id");
        yield loginBlueprint.index("createdBy.id");
        yield loginBlueprint.index("type");
        yield loginBlueprint.index("typeId");
    });
}
loginMigration.blueprint = loginBlueprint;
loginMigration.down = () => __awaiter(void 0, void 0, void 0, function* () {
    yield loginBlueprint.dropUniqueIndex("id");
    yield loginBlueprint.dropIndex("createdBy.id");
    yield loginBlueprint.dropIndex("type");
    yield loginBlueprint.dropIndex("typeId");
});
