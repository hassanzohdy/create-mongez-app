import { capitalize } from "@mongez/reinforcements";

export function getAppsConstants(apps: any[]) {
  let constants = "";

  apps.forEach((app) => {
    constants += `    /**
        * ${capitalize(app.app)} Application
        *
        * @const string
        */
        const ${app.app.toLocaleUpperCase()}_APP = '${app.apiKey}}';

`;
  });

  return constants;
}

export function getAuthApps(apps: any[]) {
  let authApps = "";

  apps.forEach((app) => {
    authApps += `Application::${app.app.toLocaleUpperCase()}_APP => [
      'os' => Application::${app.app.toLocaleUpperCase()}_APP,
      'repository' => UsersRepository::NAME,
      'accountType' => User::ACCOUNT_TYPE,
      'resource' => UserResource::class,
      'apiKey' => env('${app.app.toUpperCase()}_API_KEY'),
        ],
`;
  });

  return authApps;
}
