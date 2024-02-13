import styled from "@emotion/styled";
import { Link } from "@mongez/react-router";
import { theme } from "apps/front-office/design-system";
import SubmitButton from "apps/front-office/design-system/components/Form/SubmitButton";
export const FormWrapper = styled.div `
  label: FormWrapper;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  flex-wrap: wrap;
`;
export const PartLeft = styled.div `
  label: PartLeft;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
export const PartRight = styled.div `
  label: PartRight;
  width: 67%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
export const H1 = styled.h1 `
  label: H1;
  font-weight: 500;
  color: ${theme.colors.blue.dark} !important;
`;
export const P = styled.p `
  label: P;
  font-weight: 400;
  font-size: 1rem;
  color: ${theme.colors.blue.dark} !important;
`;
export const H3 = styled.h3 `
  label: H3;
  font-weight: 500;
  font-size: 1.1rem;
  color: ${theme.colors.blue.dark} !important;
  margin-bottom: 0.4rem;
`;
export const FollowUs = styled(H3) `
  label: FollowUs;
  @media screen and (max-width: 1000px) {
    font-size: 1.5rem;
    text-align: center;
    display: block;
    width: 100%;
  }
`;
export const Span = styled.span `
  label: PartRight;
  font-weight: 400;
  font-size: 0.9rem;
  color: ${theme.colors.blue.dark} !important;
`;
export const FormOne = styled.div `
  label: FormOne;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }
`;
export const SideLeft = styled.div `
  label: SideLeft;
  width: 100%;
`;
export const SideRight = styled.div `
  label: sideRight;
  width: 100%;
`;
export const Button = styled.button `
  label: Button;
  width: 42%;
  background-color: ${theme.colors.blue.dark};
  color: ${theme.colors.white};
  border: none;
  padding: 1rem 2.1rem 1rem 2.1rem;
  border-radius: 0.3rem;
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  cursor: pointer;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
export const TitleCard = styled.h3 `
  label: TitleCard;
  font-size: 1rem;
  font-weight: 500;
  color: ${theme.colors.blue.dark} !important;
`;
export const SpanCard = styled.span `
  label: SpanCard;
  font-size: 0.9rem;
  font-weight: 400;
  color: ${theme.colors.offWhite} !important;
`;
export const Links = styled.div `
  label: Links;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: 1000px) {
    margin-bottom: 2rem;
    text-align: center;
    width: 100%;
    display: block;

    a {
      margin: 0 0.5rem;
    }
  }
`;
export const LinkItem = styled(Link) `
  label: LinkItem;
  cursor: pointer;
`;
export const InfoWrapper = styled.div `
  label: InfoWrapper;
  @media (max-width: 1000px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  @media (max-width: 1000px) {
  }
`;
export const Submit = styled(SubmitButton) `
  label: Submit;
  width: 30%;
  background-color: ${theme.colors.blue.dark};
`;
