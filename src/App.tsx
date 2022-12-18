import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import getSign from "./scripts/sign";
import Deploy from "./scripts/deploy";
import checkSign from "./scripts/checkSign";

declare let window: any;

const contractAddress = "0xA843167f9f28936eB2b0422AE16268f2c6937995";

function App() {
  const [web3, setWeb3] = useState(new Web3(window.ethereum));

  const [state, setState] = useState({
    bid: {},
    v: 0,
    r: "",
    s: "",
  });

  useEffect(() => {
    if (window.ethereum) {
      ff();
    }
  }, []);

  const ff = async () => {
    try {
      if (window.ethereum) {
        // web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(new Web3(window.ethereum));
        const myWeb3 = new Web3(window.ethereum);
        const [acc] = await myWeb3.eth.getAccounts();
        web3.eth.defaultAccount = acc;
      } else {
        console.log("no");
      }
    } catch {
      console.log("error");
    }
  };

  const useStyles = makeStyles((theme) => ({
    app: {
      position: "absolute",
      top: "0px",
      bottom: "0px",
      right: "0px",
      left: "0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    butt: {
      backgroundColor: "rgb(72, 157, 254)",
      width: "200px",
      height: "50px",
      borderRadius: "20px",
      color: "#fff",
      marginTop: "25px",
      fontWeight: "bold",
      fontSize: "15px",
      margin: "20px",
      "&.MuiButton-root:hover": {
        backgroundColor: "rgb(72, 157, 254)",
        boxShadow: "none",
      },
    },
  }));
  const classes = useStyles();

  const setSignature = (bid: any, v: number, r: string, s: string) => {
    setState({
      bid,
      v,
      r,
      s,
    });
  };

  useEffect(() => {
    console.log("state: ", state);
  }, [state]);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div className={classes.app}>
      <Button
        className={classes.butt}
        onClick={() => {
          Deploy(web3);
        }}
      >
        Deploy
      </Button>

      <Button
        className={classes.butt}
        onClick={() => {
          getSign(web3, setSignature, {
            amount: getRandomInt(50000),
            id: getRandomInt(150),
            wallet: "0x62e9b502518ff774DB30713A51699Bc5f36D8d59",
          });
        }}
      >
        Sign
      </Button>

      <Button
        className={classes.butt}
        onClick={() => {
          checkSign(
            web3,
            contractAddress,
            state.bid,
            state.v,
            state.r,
            state.s
          );
        }}
      >
        Check sign
      </Button>
    </div>
  );
}

export default App;
