import {
  Button,
  Container,
  createStyles,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { trans } from "@mongez/localization";
import Helmet from "@mongez/react-helmet";
import { Link } from "@mongez/react-router";
import { mainTranslation } from "apps/front-office/utils/locales";
import URLS from "apps/front-office/utils/urls";
import Image from "assets/images/404.svg";

const useStyles = createStyles(theme => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  mobileImage: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  desktopImage: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function NotFoundPage() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <Helmet title={trans(mainTranslation.notFoundPage)} />
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}>
        <Image className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>
            {trans(mainTranslation.notFoundPageTitle)}
          </Title>
          <Text color="dimmed" size="lg">
            {trans(mainTranslation.notFoundPageDescription)}
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            component={Link}
            to={URLS.home}
            className={classes.control}>
            {trans(mainTranslation.goBackHome)}
          </Button>
        </div>
        <Image className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
