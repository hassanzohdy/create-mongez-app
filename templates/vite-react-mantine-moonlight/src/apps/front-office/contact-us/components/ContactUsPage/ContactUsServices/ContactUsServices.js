import { Flex } from "@mantine/core";
import { trans } from "@mongez/localization";
import { Container } from "apps/front-office/design-system/main";
import delivery from "shared/assets/images/Icons/Group-1.svg";
import support from "shared/assets/images/Icons/Group-4.svg";
import Guarantee from "shared/assets/images/Icons/surface1.svg";
import credit from "shared/assets/images/Icons/Vector-11.svg";
import { SpanCard, TitleCard } from "../style";
export default function Services() {
    return (<Container>
      <Flex gap={3} wrap="wrap" pt={30} pb={30} justify="space-between" align="baseline">
        <Flex gap={30} justify="space-between" align="center">
          <img src={delivery} alt="delivery"/>
          <div>
            <TitleCard>{trans("fastShipping")}</TitleCard>
            <SpanCard>{trans("Shipping")}</SpanCard>
          </div>
        </Flex>
        <Flex gap={30} justify="space-between" align="center">
          <img src={Guarantee} alt="Guarantee"/>
          <div>
            <TitleCard>{trans("moneyGuarantee")}</TitleCard>
            <SpanCard>{trans("exchange")}</SpanCard>
          </div>
        </Flex>
        <Flex gap={30} justify="space-between" align="center">
          <img src={support} alt="support"/>
          <div>
            <TitleCard>{trans("onlineSupport")}</TitleCard>
            <SpanCard>{trans("support")}</SpanCard>
          </div>
        </Flex>
        <Flex gap={30} justify="space-between" align="center">
          <img src={credit} alt="credit"/>
          <div>
            <TitleCard>{trans("flexiblePayment")}</TitleCard>
            <SpanCard>{trans("credit")}</SpanCard>
          </div>
        </Flex>
      </Flex>
    </Container>);
}
