import { ActionIcon, Box, Flex, Text } from "@mantine/core";
import { useBooleanState } from "@mongez/react-hooks";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { IconBrandWhatsapp, IconMapPin, IconPhone } from "@tabler/icons";
import { Branch } from "../../utils/types";

export default function GoogleMapBranch({ branch }: { branch: Branch }) {
  const [opened, toggleOpen] = useBooleanState();
  return (
    <Marker onClick={toggleOpen} position={branch.location}>
      {opened && (
        <InfoWindow position={branch.location}>
          <Box
            style={{
              minWidth: "200px",
            }}>
            <Text weight={700} mb="sm">
              <Flex>
                <ActionIcon color="red">
                  <IconMapPin />
                </ActionIcon>
                <Flex align="center">
                  <Text color="blue">{branch.address}</Text>
                </Flex>
              </Flex>
            </Text>
            <Text weight={700} mb="sm">
              <Flex>
                <ActionIcon color="orange">
                  <IconPhone />
                </ActionIcon>
                <Flex align="center">
                  <Text color="blue">{branch.phoneNumber}</Text>
                </Flex>
              </Flex>
            </Text>
            {branch.whatsappNumber && (
              <Text weight={700} mb="sm">
                <Flex>
                  <ActionIcon color="green">
                    <IconBrandWhatsapp />
                  </ActionIcon>
                  <Flex align="center">
                    <Text color="blue">{branch.whatsappNumber}</Text>
                  </Flex>
                </Flex>
              </Text>
            )}
          </Box>
        </InfoWindow>
      )}
    </Marker>
  );
}
