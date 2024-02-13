import { Box } from "@mantine/core";
import { trans } from "@mongez/localization";
import Helmet from "@mongez/react-helmet";
import ContactUsServices from "./ContactUsServices/ContactUsServices";
import ContactForm from "./Form/ContactForm";
export default function ContactUsPage() {
    return (<>
      <Helmet title={trans("contactUs")}/>
      <>
        <Box my="sm"></Box>
        <ContactForm />
      </>
      <ContactUsServices />
    </>);
}
