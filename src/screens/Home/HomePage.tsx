import { useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { AppTheme } from "styles/theme";

interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  const styles = useStyles(props);
  const history = useHistory();
  const theme = useTheme();

  return (
    <Flex width="100%" height={"auto"} center p={2} py={4} column>
      <Flex column center mb={3}>
      </Flex>
    </Flex>
  );
};

const useStyles = makeStyles((theme: AppTheme) => createStyles({}));

export default observer(HomePage);
