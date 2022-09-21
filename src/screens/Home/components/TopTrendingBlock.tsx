import { useMediaQuery, useTheme } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { createStyles, makeStyles } from "@material-ui/styles";
import { TopCoinIcon } from "assets/icons";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import TokenIcon from "components/TokenIcon";
import useDepsContainer from "hooks/useDepsContainer";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppTheme, Colors } from "styles/theme";
import { formatTokenNumber, getPriceFractionFormat } from "utils/helper";
import PriceChart from "./PriceChart";

interface TopTrendingBlockProps {}

const TopTrendingBlock = (props: TopTrendingBlockProps) => {
  const styles = useStyles(props);
  const history = useHistory();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  const { tokenStore } = useDepsContainer();
  const topTrending = tokenStore.topTrending;

  useEffect(() => {
    if (tokenStore.topTrending.length === 0) {
      tokenStore.getTopTrending();
    }
  }, []);

  let chainName = process.env.REACT_APP_CHAIN;
  let color = "#F3BA2F";
  switch (chainName) {
    case "BSC":
      chainName = "BSC";
      break;
    case "ETH":
      chainName = "ETHEREUM";
      color = "#687DE3";
      break;
    case "POLYGON":
      chainName = "POLYGON";
      color = "#7A4ADD";
      break;
  }

  return (
    <Flex
      bgcolor={"block"}
      p={2}
      borderRadius={3}
      column
      center
      width={550}
      maxWidth={"90vw"}
    >
      <Flex centerY mb={4}>
        <TopCoinIcon />
        <Text color={color} style={{ fontSize: 30, fontWeight: "bold" }}>
          {chainName}
        </Text>
        <Text ml={"2px"} style={{ fontSize: 30, fontWeight: "bold" }}>
          TRENDING
        </Text>
      </Flex>
      {/*  */}
      {topTrending.map((item, index) => {
        let fontSize = 25 * (1 - index * 0.06);
        fontSize = Math.max(fontSize, 14);

        let padding = 16 * (1 - index * 0.1);
        padding = Math.max(padding, 8);

        let bgColor;
        if (index === 0) {
          bgColor = "#2F3F69";
        } else if (index === 1 || index === 2) {
          bgColor = "#23323C";
        }

        return (
          <Flex
            key={item.key || `top-trending-${index}`}
            centerY
            py={`${padding}px`}
            px={1}
            width="100%"
            bgcolor={bgColor}
            mb={"8px"}
            borderRadius={3}
            cursorPointer
            justifyContent={"space-between"}
            onClick={() => {
              history.push(`/tokens/${item.address}`);
            }}
          >
            <Flex centerY>
              <Text
                variant="bold"
                px={"3px"}
                bgcolor={index === 0 ? "#17C671" : undefined}
                borderRadius={"8px"}
                style={{ fontSize: fontSize }}
              >
                {`#${index + 1}`}
              </Text>
              <Text mx={1} variant="bold" style={{ fontSize: fontSize }}>
                {item.symbol}
              </Text>
              <TokenIcon image={item.image} size={fontSize} />
            </Flex>
            {/* <Flex
              width={"100%"}
              minWidth={80}
              maxWidth={220}
              height={70}
              center
              overflow={"hidden"}
            >
              <PriceChart
                rowData={{
                  ...item,
                  priceChart: item.chart30D,
                }}
                shortTime={false}
              />
            </Flex> */}
            <Flex centerY ml={2}>
              <Flex column center>
                <Text
                  style={{ fontSize: Math.min(fontSize, 18) }}
                  variant="bold"
                  mr="3px"
                >
                  {item.lastPrice
                    ? `$${formatTokenNumber(
                        item.lastPrice,
                        getPriceFractionFormat(item.lastPrice)
                      )}`
                    : "$0"}
                </Text>
                <Text
                  fontSize={13}
                  color={
                    item.percentChange < 0
                      ? Colors.dangerColor
                      : item.percentChange == 0
                      ? Colors.gray400
                      : Colors.green
                  }
                  style={{
                    whiteSpace: "nowrap",
                    width: "100%",
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  {item.percentChange > 0 && item.percentChange < 1000000000000
                    ? "+"
                    : ""}{" "}
                  {/* 1000B */}
                  {formatTokenNumber(item.percentChange, 2)}&nbsp;%
                </Text>
              </Flex>
              <ArrowForwardIosIcon style={{ color: color }} />
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

const useStyles = makeStyles((theme: AppTheme) => createStyles({}));

export default observer(TopTrendingBlock);
