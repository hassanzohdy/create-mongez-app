import { Request, Response } from "@mongez/warlock";
import { User } from "app/users/models/user";
import login from "../login";

type SocialType = {
  id: string | number;
  provider: string;
};

export default async function facebookLogin(
  request: Request,
  response: Response,
) {
  const userData = request.all();

  const user = await User.findBy("email", userData.email);

  if (user) {
    let socialLogin: SocialType[] = user.get("socialLogin") || [];
    if (!Array.isArray(socialLogin)) {
      socialLogin = [];
    }

    const facebookSocial = socialLogin.find(
      (social: SocialType) => social.provider === "facebook",
    );

    if (!facebookSocial) {
      socialLogin.push({
        provider: "facebook",
        id: userData.userID,
      });

      await user.save({
        socialLogin,
      });
    }
    request.user = user;

    return login(request, response);
  }

  const newUser = await User.create({
    socialLogin: [
      {
        provider: userData.provider,
        id: userData.id,
      },
    ],
    firstName: userData.name.split(" ")[0],
    lastName: userData.name.split(" ")[1],
    email: userData.email,
    image: userData.picture.data.url,
  });

  request.user = newUser;

  return login(request, response);
}
