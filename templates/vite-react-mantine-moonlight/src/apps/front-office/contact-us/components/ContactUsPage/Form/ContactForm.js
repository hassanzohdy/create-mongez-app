import { trans } from "@mongez/localization";
import { EmailInput, SubmitButton, TextAreaInput, TextInput, } from "@mongez/moonlight";
import { Form } from "@mongez/react-form";
import { useContactForm } from "apps/front-office/contact-us/hooks";
import user from "user";
export default function ContactForm() {
    const submitContactForm = useContactForm();
    return (<>
      <Form onSubmit={submitContactForm}>
        <TextInput placeholder={trans("name")} name="name" defaultValue={user.get("name")} required label={trans("name")}/>
        <EmailInput placeholder={trans("email")} defaultValue={user.get("email")} name="email" required label={trans("email")}/>
        <TextInput placeholder={trans("phoneNumber")} name="phoneNumber" required label={trans("phoneNumber")}/>
        <TextInput placeholder={trans("subject")} name="subject" required label={trans("subject")}/>
        <TextAreaInput placeholder={trans("message")} label={trans("message")} minRows={6} name="message" required/>
        <SubmitButton>{trans("send")}</SubmitButton>
      </Form>
    </>);
}
