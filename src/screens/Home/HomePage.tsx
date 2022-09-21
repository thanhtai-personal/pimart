import { useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import { observer, useLocalObservable } from "mobx-react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppTheme } from "styles/theme";
import GalaxyBackground from "./GalaxyBackground";

interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  const state = useLocalObservable(() => ({
    firstLoadingTime: true,
  }))
  const styles = useStyles(props);
  const history = useHistory();
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => {
      state.firstLoadingTime = false;
    }, 3000)
  }, [])

  return (
    <Flex bgcolor={"black"} width="100%" height={"auto"} minHeight={"100vh"}>
      {!state.firstLoadingTime && <GalaxyBackground id="canvas-2"  />}
      <Flex column center mb={3}>
      </Flex>
    </Flex>
  );
};

const useStyles = makeStyles((theme: AppTheme) => createStyles({
}));

export default observer(HomePage);
