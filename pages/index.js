import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
} from "@mui/material";
import { toast } from "react-toastify";
import Web3 from "web3";
import Web3EthContract from "web3-eth-contract";

export default function Index() {
  const [address, setAddress] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [web3, setWeb3] = React.useState("");
  const [mnftContract, setMnftContract] = React.useState();
  const [snftContract, setSnftContract] = React.useState();

  const connectMetaMask = async () => {
    const metaMaskConnected = await init();
    if (!metaMaskConnected) {
      toast.error("請先下載MetaMask");
      return false;
    }
    await checkNetwork();

    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if (accounts) {
      setAddress(accounts[0]);
    }
  };

  const checkNetwork = async () => {
    const { ethereum } = window;
    const networkId = await ethereum.request({ method: "net_version" });
    if (Number(networkId) !== 1) {
      const accounts = await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      });

      if (accounts) {
        setAddress(accounts[0]);
      }
    }
  };

  const init = async () => {
    try {
      if (window.ethereum) {
        const { ethereum } = window;
        const web3Instance = new Web3(ethereum);
        Web3EthContract.setProvider(ethereum);
        setWeb3(web3Instance);

        const result = await ethereum.request({ method: "eth_accounts" });
        if (result) {
          setAddress(result[0]);
        }

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Whisky NFT Prototype
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Connect Wallet</Typography>
            <Typography variant="p">{address}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={connectMetaMask} variant="contained" size="small">
              Connect Wallet
            </Button>
          </CardActions>
        </Card>
        <Typography variant="h3" align="center" gutterBottom>
          ↓
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Mint Main NFT</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => {}} variant="contained" size="small">
              Mint
            </Button>
          </CardActions>
        </Card>
        <Typography variant="h3" align="center" gutterBottom>
          ↓
        </Typography>
      </Box>
    </Container>
  );
}
