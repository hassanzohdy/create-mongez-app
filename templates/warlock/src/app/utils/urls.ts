import concatRoute from "@mongez/concat-route";
import { env } from "@mongez/dotenv";

export function frontUrl(route: string) {
  return env("APP_FRONT_URL") + concatRoute(route);
}

export function questionsUrl(question: any) {
  return frontUrl("/questions/" + question.id);
}
