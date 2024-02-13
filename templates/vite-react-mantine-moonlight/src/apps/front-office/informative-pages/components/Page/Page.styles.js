import styled from "@emotion/styled";
import { Link as BaseLink } from "@mongez/react-router";
import { theme } from "apps/front-office/design-system";
export const MainTitle = styled.h1 `
  label: MainTitle;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 500;
  color: ${theme.colors.blue.dark};
  margin-top: 4rem;
  margin-bottom: 4rem;
`;
export const Text = styled.div `
  label: Text;
  padding-left: 2rem;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;
export const H2 = styled.h2 `
  label: H2;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${theme.colors.blue.dark};
`;
export const P = styled.p `
  label: P;
  font-size: 1rem;
  font-weight: 400;
  color: ${theme.colors.blue.dark};
  line-height: 2.1rem;
`;
export const Link = styled(BaseLink) `
  label: Link;
  font-size: 0.9rem;
  font-weight: 400;
  color: ${theme.colors.blue.dark};
  list-style: none;
  line-height: 3.1rem;
  display: block;
  width: 100%;
  text-decoration: none;
`;
export const TitleLink = styled.li `
  label: TitleLink;
  font-size: 1.2rem;
  font-weight: bold;
  padding-left: 1rem;
  color: ${theme.colors.blue.dark};
  list-style: none;
  margin-bottom: 1rem;
`;
