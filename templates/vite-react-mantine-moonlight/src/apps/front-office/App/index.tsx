import { CacheProvider } from "@emotion/react";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import cache from "@mongez/cache";
import { userPrefersDarkMode } from "@mongez/dom";
import { InjectThemeAtom, ToastContainer, catchError } from "@mongez/moonlight";
import { useEvent, useOnce } from "@mongez/react-hooks";
import { routerEvents } from "@mongez/react-router";
import { getGuestToken, getMe } from "apps/front-office/account/service/auth";
import user from "apps/front-office/account/user";
import { currentDirection, isRTL } from "apps/front-office/utils/helpers";
import React, { useState } from "react";
import { getPrimaryFont } from "../design-system";
import ProgressBar from "../design-system/Indicators/ProgressBar";
import { cacheLTR, cacheRTL, cacheValue } from "./LayoutSettings";

const themeCacheKey = "theme-mode";

const defaultThemeValue = cache.get(
  themeCacheKey,
  userPrefersDarkMode() ? "dark" : "light",
);

export type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  const [cacheProvider, setCacheProvider] = useState(cacheValue);
  const [colorScheme, setColorScheme] = useState<"dark" | "light">(
    defaultThemeValue,
  );

  // if you're using hard reload, remove the following hook
  useEvent(() =>
    routerEvents.onLocaleChanging(localeCode => {
      setCacheProvider(localeCode === "ar" ? cacheRTL : cacheLTR);
    }),
  );

  const direction = currentDirection();

  const primaryFontFamily = getPrimaryFont();

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={theme => {
          if (!theme) return;

          cache.set(themeCacheKey, theme);
          setColorScheme(theme);
        }}>
        <CacheProvider value={cacheProvider}>
          <MantineProvider
            theme={{
              fontFamily: primaryFontFamily,
              colorScheme: colorScheme,
              dir: direction,
            }}
            emotionCache={isRTL() ? cacheRTL : cacheLTR}
            withGlobalStyles
            withNormalizeCSS>
            <InjectThemeAtom />
            <ModalsProvider>
              <ToastContainer />
              {children}
            </ModalsProvider>
          </MantineProvider>
        </CacheProvider>
      </ColorSchemeProvider>
    </>
  );
}

/**
 * If the project requires guest token to be loaded if the user is not logged in,
 * OR, if the project requires user data to be loaded if the user is logged in,
 * then Use this component instead of TopRoot
 * Make this the default export instead of App
 */
export function AppWithUser({ children }: any) {
  const [canPass, setCanPass] = useState(false);

  useOnce(() => {
    if (user.isLoggedIn()) {
      if (!user.isGuest()) {
        getMe()
          .then(() => {
            setCanPass(true);
          })
          .catch(catchError);
      } else {
        setCanPass(true);
      }
    } else {
      getGuestToken()
        .then(response => {
          user.login(response.data.authorization);
          setCanPass(true);
        })
        .catch(catchError);
    }
  });

  if (!canPass) return <ProgressBar />;

  return <App>{children}</App>;
}
