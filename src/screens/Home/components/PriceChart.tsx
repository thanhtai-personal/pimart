import { AreaChart } from "charting_library/reChart"
import moment from "moment"
import { useMemo } from "react"

const PriceChart = (props) => {
  const { rowData = {}, shortTime, animation = true, color, margin } = props
  const { priceChart = [], ...nestedData } = rowData

  const dataSource = useMemo(() => {
    return priceChart.map((item) => {
      return {
        ...item,
        name: moment(item.t, "YYYY-MM-DDTHH:mm:ss.sssZ").format('YYYY-MM-DD HH:mm:ss'),
        value: item.price
      }
    })
  }, [])

  return (
    <AreaChart
      unit={"$"}
      margin={margin}
      animation={animation}
      color={color}
      dataSource={dataSource}
      shortTime={shortTime}
      colorType={rowData.percentChange > 0 ? "UP" : "DOWN"}
    />
  );
}

export default PriceChart
