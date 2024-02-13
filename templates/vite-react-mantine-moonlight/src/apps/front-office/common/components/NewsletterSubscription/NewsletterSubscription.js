import { trans } from "@mongez/localization";
import { EmailInput, SubmitButton } from "@mongez/moonlight";
import { Form } from "@mongez/react-form";
import { useNewsletterSubscription } from "../../hooks";
export default function NewsletterSubscription() {
    const subscribe = useNewsletterSubscription();
    return (<>
      <Form onSubmit={subscribe}>
        <EmailInput required placeholder={trans("emailAddress")} name="email"/>
        <SubmitButton>{trans("subscribe")}</SubmitButton>
      </Form>
    </>);
}
