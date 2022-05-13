import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinPrice } from "../api";

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 10px;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: ${(props) => props.theme.priceTabBg};
  border: solid 1px rgba(0, 0, 0, 0.5);
`;

const Tab = styled.span`
  display: flex;
  padding: 20px;
  font-size: 16px;
  text-transform: capitalize;
`;
const TabValue = styled(Tab)<{ isCheck?: Boolean }>`
  font-weight: 700;
  font-size: 25px;
  color: ${(props) => (props.isCheck ? "#c53b3b" : "#51abcb")};
`;

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function checkNumber(number: number | undefined) {
  if (number) {
    return number > 0;
  }
}

function Price() {
  const { coinId } = useOutletContext() as PriceProps;
  const { isLoading, data } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinPrice(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <>
          <Tabs>
            <Tab>price:</Tab>
            <TabValue isCheck={true}>
              {data?.quotes.USD.price.toFixed(0)} $
            </TabValue>
          </Tabs>
          <Tabs>
            <Tab>market cap:</Tab>
            <TabValue isCheck={checkNumber(data?.quotes.USD.market_cap)}>
              {data?.quotes.USD.market_cap}
            </TabValue>
          </Tabs>
          <Tabs>
            <Tab>market cap(change 24h):</Tab>
            <TabValue
              isCheck={checkNumber(data?.quotes.USD.market_cap_change_24h)}
            >
              {data?.quotes.USD.market_cap_change_24h} %
            </TabValue>
          </Tabs>
          <Tabs>
            <Tab>change rate(last 30m):</Tab>
            <TabValue
              isCheck={checkNumber(data?.quotes.USD.percent_change_30m)}
            >
              {data?.quotes.USD.percent_change_30m} %
            </TabValue>
          </Tabs>
          <Tabs>
            <Tab>change rate(last 1h):</Tab>
            <TabValue isCheck={checkNumber(data?.quotes.USD.percent_change_1h)}>
              {data?.quotes.USD.percent_change_1h} %
            </TabValue>
          </Tabs>
          <Tabs>
            <Tab>change rate(last 12h):</Tab>
            <TabValue
              isCheck={checkNumber(data?.quotes.USD.percent_change_12h)}
            >
              {data?.quotes.USD.percent_change_12h} %
            </TabValue>
          </Tabs>
          <Tabs>
            <Tab>change rate(last 24h):</Tab>
            <TabValue
              isCheck={checkNumber(data?.quotes.USD.percent_change_24h)}
            >
              {data?.quotes.USD.percent_change_24h} %
            </TabValue>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default Price;
