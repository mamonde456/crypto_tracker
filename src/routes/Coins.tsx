import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atom";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  max-width: 480px;
  margin: 0px auto;
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  border-radius: 15px;
  margin-bottom: 10px;
  text-align: center;
  border: solid 1px ${(props) => props.theme.btnBorderColor};
  color: ${(props) => props.theme.textColor};
  a {
    display: flex;
    padding: 20px;
    align-items: center;
    -webkit-transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loading = styled.div`
  text-align: center;
  color: ${(props) => props.theme.textColor};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const ToggleBtn = styled.button`
  max-width: 150px;
  padding: 10px;
  text-align: center;
  border-radius: 0px 0px 15px 15px;
  border: solid 1px ${(props) => props.theme.btnBorderColor};
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.textColor};
  position: absolute;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  top: 0px;
  a {
    display: block;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkFn = useSetRecoilState(isDarkAtom);
  const toggleBtn = () => setDarkFn((prev) => !prev);
  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
      </Header>
      <ToggleBtn onClick={toggleBtn}>
        {isDark ? "Light mode" : "Dark mode"}
      </ToggleBtn>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
