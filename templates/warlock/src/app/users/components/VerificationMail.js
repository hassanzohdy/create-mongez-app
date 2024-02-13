import styled from "@emotion/styled";
export const VerificationCode = styled.a `
  font-size: 1rem;
  font-weight: bold;
  margin: 1rem 0;
  padding: 0.6rem 1rem;
  // ant design blue color
  background-color: #1890ff;
  color: #fff !important;
  display: inline-block;
  text-align: center;
  border-radius: 0.5rem;
  text-decoration: none;
  cursor: pointer;
`;
export const Note = styled.p `
  font-size: 0.8rem;
  color: #888;
  padding-left: 1rem;
  margin: 1rem 0;
  border-left: 3px solid #ddd;
`;
export const Wrapper = styled.div `
  // make the wrapper background gray
  background-color: #ebeef7;
  padding: 3rem;
`;
export const Content = styled.div `
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
export const ProjectName = styled.div `
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`;
export const Logo = styled.img `
  width: 100px;
  margin: 0 auto;
  display: block;
`;
export const Footer = styled.div `
  margin-top: 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: #888;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
`;
export const CopyRights = styled.div `
  margin-top: 1rem;
  text-align: center;
  font-size: 0.8rem;
  color: #888;
`;
export default function VerificationMail({ user, logo, appName, }) {
    return (<Wrapper>
      <Content>
        <h1>Verify your email</h1>
        <p>
          Thank you for registering with us. Please click the button below to
          verify your account.
        </p>

        <Note>
          Kindly note that the verification link expires after{" "}
          <strong>30</strong> minutes.
        </Note>

        <VerificationCode>{user.get("activationCode")}</VerificationCode>

        <Footer>
          {logo && <Logo src={logo} alt={appName} title={appName}/>}
          <CopyRights>
            &copy; {new Date().getFullYear()} {appName}, All rights reserved.
          </CopyRights>
        </Footer>
      </Content>
    </Wrapper>);
}
