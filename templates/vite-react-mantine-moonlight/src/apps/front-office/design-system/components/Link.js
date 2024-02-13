import { Anchor } from "@mantine/core";
import { Link } from "@mongez/react-router";
export function UnStyledLink(props) {
    return <Anchor {...props} unstyled component={Link}/>;
}
