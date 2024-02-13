import { Accordion, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { faqAtom } from "../../atom/faqAtom";
import { AccordionWrapper, FaqNumber, Question } from "./style";
const getNumber = number => {
    return number > 9 ? number : `0${number}`;
};
export default function FaqContent() {
    const records = faqAtom.useValue();
    return (<Accordion defaultValue={"0"} chevron={<IconPlus size={20}/>} styles={theme => ({
            control: {
                padding: theme.spacing.xl,
            },
            chevron: {
                "&[data-rotate]": {
                    transform: "rotate(45deg)",
                },
            },
        })}>
      <AccordionWrapper>
        {records.map((record, index) => {
            return (<Accordion.Item key={record.id} value={String(index)}>
              <Accordion.Control>
                <Question>
                  <span>
                    <FaqNumber>{getNumber(index + 1)}</FaqNumber>
                    {record.question}
                  </span>
                </Question>
              </Accordion.Control>
              <Accordion.Panel style={{ margin: 0 }}>
                <Text fz="md" weight="500" style={{
                    whiteSpace: "pre-line",
                }}>
                  {record.answer}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>);
        })}
      </AccordionWrapper>
    </Accordion>);
}
