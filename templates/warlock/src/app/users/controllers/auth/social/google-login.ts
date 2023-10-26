import { env } from "@mongez/dotenv";
import { GoogleProvider, Request, Response } from "@mongez/warlock";
import { User } from "app/users/models/user";
import login from "../login";

export async function googleLogin(request: Request, response: Response) {
  const googleProvider = new GoogleProvider({
    clientId: env("GOOGLE_CLIENT_ID"),
    scope: request.input("scope"),
  });

  const userData = await googleProvider.login(request.input("token"));

  // first check if user exists with that email
  const userWithEmail = await User.findBy("email", userData.email);

  if (userWithEmail) {
    let socialLogin = userWithEmail.get("socialLogin") || [];

    if (!Array.isArray(socialLogin)) {
      socialLogin = [];
    }

    const googleSocial = socialLogin.find(
      (social: any) => social.provider === userData.provider,
    );

    if (!googleSocial) {
      socialLogin.push({
        provider: userData.provider,
        id: userData.id,
      });

      await userWithEmail.save({
        socialLogin,
      });
    }

    request.user = userWithEmail;

    return login(request, response);
  }

  const user = await User.create({
    socialLogin: [
      {
        provider: userData.provider,
        id: userData.id,
      },
    ],
    name: userData.name,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    image: userData.avatarUrl,
  });

  request.user = user;

  return login(request, response);
}

googleLogin.validation = {
  rules: {
    token: ["required", "string"],
    scope: ["string"],
  },
};
