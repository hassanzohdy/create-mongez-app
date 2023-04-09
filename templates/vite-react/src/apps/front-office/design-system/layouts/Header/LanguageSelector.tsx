import {
  createStyles,
  Group,
  Image,
  Menu,
  UnstyledButton,
} from "@mantine/core";
import { current } from "@mongez/react";
import { changeLocaleCode } from "@mongez/react-router";
import { IconChevronDown } from "@tabler/icons-react";
import arabic from "assets/images/flags/sa.png";
import english from "assets/images/flags/uke.png";
import { useState } from "react";

const data = [
  { label: "English", image: english, localeCode: "en" },
  { label: "العربية", image: arabic, localeCode: "ar" },
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: 150,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: "background-color 150ms ease",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
  },
}));

export function LanguageSelector() {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [selected, setSelected] = useState(() => {
    const localeCode = current("localeCode");

    return data.find(item => item.localeCode === localeCode) || data[0];
  });
  const items = data.map(item => (
    <Menu.Item
      icon={<Image src={item.image} width={18} height={18} />}
      onClick={() => {
        changeLocaleCode(item.localeCode);
        setSelected(item);
      }}
      key={item.label}>
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target">
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs" p={0}>
            <Image src={selected.image} width={22} height={22} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
