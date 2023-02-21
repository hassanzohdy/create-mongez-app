import styled from "@emotion/styled";
import { theme } from "apps/front-office/design-system";

export const MainTitle = styled.h3`
  label: MainTitle;
  text-align: center;
  font-size: 1.75rem;
  color: ${theme.colors.blue.dark};
  font-style: normal;
  margin-top: 2rem;
`;

export const FaqWrapper = styled.div`
  label: FaqWrapper;
  margin: 5rem 0;
`;

export const FaqNumber = styled.span`
  label: FaqNumber;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
  margin-inline-end: 0.5rem;
`;

export const AccordionWrapper = styled("h3")`
  label: AccordionWrapper;
  margin: 0 1.5rem;
  & p {
    font-weight: 400;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const Question = styled.div`
  label: Question;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: 600;
  color: ${theme.colors.blue.dark};
  & h3 {
    font-size: 1.75rem;
  }
  & span {
    font-size: 1.25;
  }
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;
