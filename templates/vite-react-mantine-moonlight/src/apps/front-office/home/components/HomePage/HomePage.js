import styled from "@emotion/styled";
import { ActionIcon, Container, Flex, SimpleGrid, Text, Title, } from "@mantine/core";
import { trans } from "@mongez/localization";
import Helmet from "@mongez/react-helmet";
import { Link } from "@mongez/react-router";
import { IconNotes } from "@tabler/icons-react";
import { mainTranslation } from "apps/front-office/utils/locales";
import { Logo } from "shared/flags";
export const DocLink = styled(Link) `
  label: DocLink;
  color: ${({ theme }) => theme.colorScheme === "light"
    ? theme.colors.dark[3]
    : theme.colors.gray[6]};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  font-weight: bold;
`;
export default function HomePage() {
    return (<>
      <Helmet title={trans(mainTranslation.home)} appendAppName={false}/>
      <Title mt={"sm"} align="center">
        Welcome To React Mongez App
      </Title>
      <Text align="center" my="sm">
        <Logo height="250px"/>
      </Text>

      <Title size="h2" mt="md" mb="xl" align="center">
        Documentation
      </Title>
      <Container>
        <SimpleGrid breakpoints={[
            {
                maxWidth: "sm",
                cols: 2,
            },
            {
                minWidth: "sm",
                cols: 3,
            },
        ]}>
          <DocLink to="https://tablericons.com/" newTab>
            <Flex>
              <ActionIcon gradient={{
            from: "red",
            to: "orange",
        }} mx="sm" variant="gradient">
                <IconNotes />
              </ActionIcon>
              Icons
            </Flex>
          </DocLink>
          <DocLink to="https://github.com/hassanzohdy/mongez-react-form" newTab>
            <Flex>
              <ActionIcon mx="sm" gradient={{
            from: "green",
            to: "lime",
        }} variant="gradient">
                <IconNotes />
              </ActionIcon>
              Forms
            </Flex>
          </DocLink>
          <DocLink to="https://mantine.dev" newTab>
            <Flex>
              <ActionIcon mx="sm" gradient={{
            from: "blue",
            to: "cyan",
        }} variant="gradient">
                <IconNotes />
              </ActionIcon>
              Mantine
            </Flex>
          </DocLink>
          <DocLink to="https://github.com/hassanzohdy/moonlight" newTab>
            <Flex>
              <ActionIcon mx="sm" gradient={{
            from: "gray",
            to: "dark",
        }} variant="gradient">
                <IconNotes />
              </ActionIcon>
              Moonlight
            </Flex>
          </DocLink>
          <DocLink to="https://github.com/hassanzohdy/reinforcements" newTab>
            <Flex>
              <ActionIcon mx="sm" gradient={{
            from: "pink",
            to: "purple",
        }} variant="gradient">
                <IconNotes />
              </ActionIcon>
              Reinforcements
            </Flex>
          </DocLink>
          <DocLink to="https://github.com/hassanzohdy/react-router" newTab>
            <Flex>
              <ActionIcon mx="sm" gradient={{
            from: "yellow",
            to: "orange",
        }} variant="gradient">
                <IconNotes />
              </ActionIcon>
              Routing System
            </Flex>
          </DocLink>
          <DocLink to="https://github.com/hassanzohdy/react-hooks" newTab>
            <Flex>
              <ActionIcon mx="sm" gradient={{
            from: "violet",
            to: "indigo",
        }} variant="gradient">
                <IconNotes />
              </ActionIcon>
              Hooks (Misc)
            </Flex>
          </DocLink>
          <DocLink to="https://github.com/hassanzohdy/mongez-localization" newTab>
            <Flex>
              <ActionIcon mx="sm" gradient={{
            from: "teal.3",
            to: "indigo",
        }} variant="gradient">
                <IconNotes />
              </ActionIcon>
              Localization (i18n)
            </Flex>
          </DocLink>
          <DocLink to="https://github.com/hassanzohdy/mongez-cache" newTab>
            <Flex>
              <ActionIcon mx="sm" gradient={{
            from: "grape.6",
            to: "pink.5",
        }} variant="gradient">
                <IconNotes />
              </ActionIcon>
              Cache And Storage
            </Flex>
          </DocLink>
          <DocLink to="https://github.com/hassanzohdy/supportive-is" newTab>
            <Flex>
              <ActionIcon mx="sm" gradient={{
            from: "lime.6",
            to: "teal.5",
        }} variant="gradient">
                <IconNotes />
              </ActionIcon>
              Supportive Is
            </Flex>
          </DocLink>
          <DocLink to="https://github.com/hassanzohdy/mongez-http" newTab>
            <Flex>
              <ActionIcon mx="sm" gradient={{
            from: "yellow.6",
            to: "yellow.4",
        }} variant="gradient">
                <IconNotes />
              </ActionIcon>
              Api (Ajax)
            </Flex>
          </DocLink>
          <DocLink to="https://github.com/hassanzohdy/mongez-react-atom" newTab>
            <Flex>
              <ActionIcon mx="sm" gradient={{
            from: "green",
            to: "teal",
        }} variant="gradient">
                <IconNotes />
              </ActionIcon>
              State Management
            </Flex>
          </DocLink>
        </SimpleGrid>
      </Container>
    </>);
}
