var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "./user";
const UserBlueprint = User.blueprint();
export function userMigrations() {
    return __awaiter(this, void 0, void 0, function* () {
        yield UserBlueprint.unique("id");
        yield UserBlueprint.unique("email");
        yield UserBlueprint.index("name");
        yield UserBlueprint.index("isActive");
        yield UserBlueprint.index("isAdmin");
        yield UserBlueprint.index("isCustomer");
        yield UserBlueprint.index("isVendor");
        yield UserBlueprint.unique("phoneNumber");
    });
}
userMigrations.blueprint = UserBlueprint;
userMigrations.down = () => __awaiter(void 0, void 0, void 0, function* () {
    yield UserBlueprint.dropUniqueIndex("id");
    yield UserBlueprint.dropUniqueIndex("email");
    yield UserBlueprint.dropUniqueIndex("phoneNumber");
    yield UserBlueprint.dropIndex("name");
    yield UserBlueprint.dropIndex("isActive");
    yield UserBlueprint.dropIndex("isAdmin");
    yield UserBlueprint.dropIndex("isCustomer");
    yield UserBlueprint.dropIndex("isVendor");
});
