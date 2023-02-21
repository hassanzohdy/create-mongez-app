import { Box } from "@mantine/core";
import { trans } from "@mongez/localization";
import Helmet from "@mongez/react-helmet";
import ContactUsServices from "./ContactUsServices/ContactUsServices";
import ContactForm from "./Form/ContactForm";
import GoogleMap from "./GoogleMap";

export default function ContactUsPage() {
  return (
    <>
      <Helmet title={trans("contactUs")} />
      <>
        <Box my="sm">
          <GoogleMap />
        </Box>
        <ContactForm />
      </>
      <ContactUsServices />
    </>
  );
}
